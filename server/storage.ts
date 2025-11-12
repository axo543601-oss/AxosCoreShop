import type { User, InsertUser, Product, InsertProduct, Order, InsertOrder, OrderItem, InsertOrderItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  toggleProductActive(id: string, isActive: boolean): Promise<Product | undefined>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const productData = [
      {
        name: "Purple Axolotl T-Shirt",
        description: "Comfortable cotton t-shirt featuring our iconic purple axolotl mascot with that legendary Minecraft-inspired pixelated texture.",
        price: "24.99",
        imageUrl: "/attached_assets/product-tshirt-purple-axolotl_1762939234255.png",
        stock: 50,
        isActive: true,
      },
      {
        name: "Purple Axolotl Hoodie",
        description: "Cozy hoodie with a bold purple axolotl design. Perfect for staying warm while showing off your axolotl love!",
        price: "44.99",
        imageUrl: "/attached_assets/product-hoodie-purple-axolotl_1762939234254.png",
        stock: 30,
        isActive: true,
      },
      {
        name: "Purple Axolotl Mug",
        description: "Start your day right with this adorable purple axolotl ceramic mug. Dishwasher and microwave safe.",
        price: "14.99",
        imageUrl: "/attached_assets/product-mug-purple-axolotl_1762939234252.png",
        stock: 100,
        isActive: true,
      },
      {
        name: "Purple Axolotl Plushie",
        description: "Soft and cuddly purple axolotl plushie. The perfect companion for any axolotl enthusiast!",
        price: "29.99",
        imageUrl: "/attached_assets/product-plushie-purple-axolotl_1762939234260.png",
        stock: 25,
        isActive: true,
      },
      {
        name: "Purple Axolotl Tote Bag",
        description: "Eco-friendly canvas tote bag featuring the purple axolotl design. Great for shopping or everyday use.",
        price: "19.99",
        imageUrl: "/attached_assets/product-totebag-purple-axolotl_1762939234250.png",
        stock: 40,
        isActive: true,
      },
      {
        name: "Purple Axolotl Stickers",
        description: "Pack of 5 waterproof vinyl stickers with various purple axolotl designs. Perfect for laptops, water bottles, and more!",
        price: "9.99",
        imageUrl: "/attached_assets/product-stickers-purple-axolotl_1762939234253.png",
        stock: 200,
        isActive: true,
      },
      {
        name: "Purple Axolotl Phone Case",
        description: "Durable phone case with purple axolotl artwork. Available for most popular phone models.",
        price: "19.99",
        imageUrl: "/attached_assets/product-phonecase-purple-axolotl_1762939234259.png",
        stock: 60,
        isActive: true,
      },
    ];

    productData.forEach((data) => {
      const id = randomUUID();
      const product: Product = { ...data, id };
      this.products.set(id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date().toISOString(),
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, insertProduct: InsertProduct): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async toggleProductActive(id: string, isActive: boolean): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated = { ...product, isActive };
    this.products.set(id, updated);
    return updated;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, order);
    return order;
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
}

export const storage = new MemStorage();
