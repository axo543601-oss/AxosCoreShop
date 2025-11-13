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
import { Github, Instagram, Twitter, Mail, Youtube } from "lucide-react";

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

      <div id="about" className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
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
        <div id="shop" className="mb-8">
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

      <footer id="contact" className="bg-background border-t border-border mt-16 py-12">
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
              <div className="flex flex-wrap gap-4">
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
                  href="https://www.tiktok.com/@axoshard?_t=ZN-8ziqIb0T0wI&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@axo_shard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/U3cgX7HDFd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-purple-600 transition"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.3671a19.8063 19.8063 0 0 0-4.885-1.515.0741.0741 0 0 0-.0785.0371c-.211.3671-.4437.8484-.6079 1.2278a18.268 18.268 0 0 0-5.487 0c-.1645-.3799-.4022-.8607-.6079-1.2278a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.885 1.515.0699.0699 0 0 0-.0321.0277C1.75 8.068 1.1968 11.692 2.705 15.0832a.0764.0764 0 0 0 .0945.0052c1.1164.8784 2.1909 1.2171 3.2383 1.6779a.0777.0777 0 0 0 .1692-.0277c.2424-.3933.4775-.8108.6655-1.2475a.0711.0711 0 0 0-.0383-.0922c-.784-.2956-1.528-.6679-2.2225-1.0742a.077.077 0 0 1-.0076-.1277c.1494.111.2983.2324.4406.3645a.0755.0755 0 0 0 .1174-.0274c4.568 2.285 9.534 2.285 14.051 0a.0755.0755 0 0 0 .1196.0274c.1423-.1319.2912-.2526.4406-.3645a.077.077 0 0 1-.0066.1288c-.6954.4057-1.4382.7742-2.2225 1.0742a.077.077 0 0 0-.0383.0922c.1884.4367.4226.8542.6655 1.2475a.076.076 0 0 0 .1692.0277c1.0464-.4608 2.1215-.7998 3.2383-1.6779a.0755.0755 0 0 0 .0945-.0052c1.5127-3.4407.992-6.9956-1.617-9.8159a.0528.0528 0 0 0-.0321-.0277zM8.02 12.6979c-1.1164 0-2.0425-.9852-2.0425-2.1961s.9181-2.1961 2.0425-2.1961c1.1244 0 2.062.9852 2.0425 2.1961 0 1.2108-.9181 2.1961-2.0425 2.1961zm7.9596 0c-1.1164 0-2.0425-.9852-2.0425-2.1961s.9181-2.1961 2.0425-2.1961c1.1244 0 2.062.9852 2.0425 2.1961 0 1.2108-.9181 2.1961-2.0425 2.1961z" />
                  </svg>
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
