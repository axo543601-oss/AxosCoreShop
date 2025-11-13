import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cartContext";
import type { Product } from "@shared/schema";
import heroImage from "@assets/hero-purple-axolotl-mascot_1762939234262.png";
import { Github, Instagram, Twitter, Mail } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { cart, addToCart, updateQuantity, removeItem, cartItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const activeProducts = products?.filter((p) => p.isActive) || [];
  
  const filteredProducts = activeProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      toast({
        title: "Cannot add more",
        description: "Maximum stock reached for this item",
        variant: "destructive",
      });
      return;
    }

    addToCart({ product, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleAddFromModal = (product: Product, size: string) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      toast({
        title: "Cannot add more",
        description: "Maximum stock reached for this item",
        variant: "destructive",
      });
      return;
    }

    addToCart({ product, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${product.name} (Size: ${size}) has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddFromModal}
      />

      <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Official Axo Shard Merch
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Get your exclusive purple axolotl merchandise with that legendary Minecraft-inspired pixelated texture!
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                <img
                  src={heroImage}
                  alt="Axo Shard Mascot"
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Shop All Products</h2>
          <p className="text-muted-foreground mt-2">
            Find the perfect axolotl merch for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md"
          />
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? "No products match your search. Try different keywords."
                : "No products available at the moment. Check back soon!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="bg-background border-t border-border mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AxoShard</h3>
              <p className="text-muted-foreground text-sm">
                Official axolotl merch with Minecraft-inspired pixelated texture. Made for all axolotl lovers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Shop</a></li>
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/axoshard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/axoshard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/axolotlshard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@axoshard.com"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © All rights reserved 2025 AxoShard
            </p>
            <p className="text-muted-foreground mt-1">
              Made for all axolotl lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
