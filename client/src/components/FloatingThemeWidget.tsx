import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette, X, ChevronUp, ChevronDown } from "lucide-react";
import { ThemeManager, type ThemeType } from "@/components/ThemeManager";

export function FloatingThemeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <>
      {/* Floating button */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
          title="Open theme customizer"
        >
          <Palette className="h-6 w-6" />
        </button>
      )}

      {/* Theme panel */}
      {!isMinimized && (
        <div className="fixed bottom-6 right-6 z-40 w-96 max-h-[90vh] bg-background border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Themes</h2>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Minimize"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-4">
            <ThemeManager />
          </div>
        </div>
      )}
    </>
  );
}
