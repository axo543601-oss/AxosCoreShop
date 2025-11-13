import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size?: string) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all" 
      data-testid={`card-product-${product.id}`}
      onClick={() => onProductClick(product)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            data-testid={`img-product-${product.id}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span>No image available</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <div>
          <h3 className="font-semibold text-lg text-foreground" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
            ${parseFloat(product.price).toFixed(2)}
          </p>
          {isOutOfStock ? (
            <Badge variant="destructive" data-testid={`badge-out-of-stock-${product.id}`}>
              Out of Stock
            </Badge>
          ) : (
            <p className="text-sm text-muted-foreground">
              {product.stock} in stock
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
                <Button
          onClick={onAddToCart}
          disabled={product.stock === 0}
          variant="default"
          className="w-full text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
