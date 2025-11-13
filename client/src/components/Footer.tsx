import { Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Axo Shard</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium Axolotl merchandise for enthusiasts worldwide.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@axoshard.com" className="hover:text-foreground transition-colors">
                support@axoshard.com
              </a>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} Axo Shard. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4">
            Website fanart made by my goat Umi (doumasfiancee__) on discord
          </p>
        </div>
      </div>
    </footer>
  );
}
