import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertProductSchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import "dotenv/config";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup route - create default admin account
  app.post("/api/setup", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      if (users.length > 0) {
        return res.status(400).json({ message: "Admin user already exists" });
      }

      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      let user = await storage.createUser({
        email: "admin@axoshard.com",
        password: hashedPassword,
        name: "AxoShard Admin",
      });

      user = await storage.makeAdmin(user.id) || user;
      const { password, ...userWithoutPassword } = user;
      res.json({ message: "Admin user created", user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      const existing = await storage.getUserByEmail(data.email);
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      let user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      // Make first user an admin
      const allUsers = await storage.getAllUsers();
      if (allUsers.length === 1) {
        user = await storage.makeAdmin(user.id) || user;
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(data.password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin setup route - make first user admin or by email
  app.post("/api/auth/make-admin", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updated = await storage.makeAdmin(user.id);
      const { password, ...userWithoutPassword } = updated || user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, data);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/products/:id/toggle", async (req, res) => {
    try {
      const { isActive } = req.body;
      const product = await storage.toggleProductActive(req.params.id, isActive);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { items } = req.body;

      let totalAmount = 0;
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product ${item.productId} not found` });
        }
        if (item.quantity > product.stock) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }
        totalAmount += parseFloat(product.price) * item.quantity;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: totalAmount,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const { order, items } = req.body;
      
      const orderData = insertOrderSchema.parse(order);
      const createdOrder = await storage.createOrder(orderData);

      for (const item of items) {
        const itemData = insertOrderItemSchema.parse({
          ...item,
          orderId: createdOrder.id,
        });
        await storage.createOrderItem(itemData);

        const product = await storage.getProduct(item.productId);
        if (product) {
          await storage.updateProduct(item.productId, {
            ...product,
            stock: product.stock - item.quantity,
          });
        }
      }

      res.json(createdOrder);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
