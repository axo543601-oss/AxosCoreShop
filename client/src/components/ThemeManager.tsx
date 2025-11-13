import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Sparkles } from "lucide-react";

export type ThemeType = "default" | "easter" | "christmas" | "halloween" | "valentine" | "summer";

interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  decorations: boolean;
}

const THEMES: Theme[] = [
  {
    id: "default",
    name: "Default",
    description: "Original purple theme",
    colors: {
      primary: "280 85% 55%",
      secondary: "0 0% 90%",
      accent: "280 12% 90%",
    },
    decorations: false,
  },
  {
    id: "christmas",
    name: "🎄 Christmas",
    description: "Red & green festive theme with snow",
    colors: {
      primary: "0 84% 50%",
      secondary: "120 70% 40%",
      accent: "40 100% 50%",
    },
    decorations: true,
  },
  {
    id: "halloween",
    name: "🎃 Halloween",
    description: "Orange & black spooky theme",
    colors: {
      primary: "25 100% 50%",
      secondary: "0 0% 20%",
      accent: "40 100% 50%",
    },
    decorations: true,
  },
  {
    id: "easter",
    name: "🐰 Easter",
    description: "Pastel colors with springtime vibes",
    colors: {
      primary: "280 70% 65%",
      secondary: "50 90% 70%",
      accent: "120 60% 60%",
    },
    decorations: true,
  },
  {
    id: "valentine",
    name: "💝 Valentine",
    description: "Pink & red romantic theme",
    colors: {
      primary: "330 100% 55%",
      secondary: "0 84% 60%",
      accent: "330 70% 70%",
    },
    decorations: true,
  },
  {
    id: "summer",
    name: "☀️ Summer",
    description: "Bright & vibrant summer colors",
    colors: {
      primary: "40 100% 50%",
      secondary: "200 100% 50%",
      accent: "50 100% 60%",
    },
    decorations: true,
  },
];

interface ThemeManagerProps {
  onThemeChange?: (theme: ThemeType) => void;
}

export function ThemeManager({ onThemeChange }: ThemeManagerProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("default");
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("website-theme");
    if (saved) {
      setSelectedTheme(saved as ThemeType);
    }
    const savedDecorations = localStorage.getItem("website-decorations");
    if (savedDecorations) {
      setShowDecorations(JSON.parse(savedDecorations));
    }
  }, []);

  const handleThemeChange = (themeId: ThemeType) => {
    setSelectedTheme(themeId);
    localStorage.setItem("website-theme", themeId);
    applyTheme(themeId);
    onThemeChange?.(themeId);
  };

  const handleDecorationToggle = (enabled: boolean) => {
    setShowDecorations(enabled);
    localStorage.setItem("website-decorations", JSON.stringify(enabled));
    applyDecorations(enabled);
  };

  const applyTheme = (themeId: ThemeType) => {
    const theme = THEMES.find((t) => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--secondary", theme.colors.secondary);
    root.style.setProperty("--accent", theme.colors.accent);
  };

  const applyDecorations = (enabled: boolean) => {
    if (enabled) {
      document.body.classList.add("theme-decorated");
    } else {
      document.body.classList.remove("theme-decorated");
    }
  };

  const currentTheme = THEMES.find((t) => t.id === selectedTheme);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Website Themes</h2>
        <p className="text-muted-foreground">
          Customize the website appearance for special occasions
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-lg font-semibold mb-4 block">Select Theme</Label>
            <RadioGroup value={selectedTheme} onValueChange={(val) => handleThemeChange(val as ThemeType)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {THEMES.map((theme) => (
                  <div
                    key={theme.id}
                    className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleThemeChange(theme.id)}
                  >
                    <RadioGroupItem value={theme.id} id={theme.id} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={theme.id} className="font-semibold text-base cursor-pointer">
                        {theme.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{theme.description}</p>
                      <div className="flex gap-2 mt-2">
                        <div
                          className="h-6 w-6 rounded border"
                          style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                          title="Primary Color"
                        />
                        <div
                          className="h-6 w-6 rounded border"
                          style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                          title="Secondary Color"
                        />
                        <div
                          className="h-6 w-6 rounded border"
                          style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                          title="Accent Color"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>

      {currentTheme?.decorations && (
        <Card className="p-6 border-purple-200 bg-purple-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div>
                <Label className="font-semibold text-base">Enable Decorations</Label>
                <p className="text-sm text-muted-foreground">
                  Add festive decorations and animations to match the theme
                </p>
              </div>
            </div>
            <Switch
              checked={showDecorations}
              onCheckedChange={handleDecorationToggle}
              data-testid="switch-decorations"
            />
          </div>
        </Card>
      )}

      <Card className="p-6 border-blue-200 bg-blue-50/50">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900">Theme Changes Apply Instantly</p>
            <p className="text-blue-800 mt-1">
              The website will update immediately. Theme preferences are saved in browser storage and will persist
              across sessions.
            </p>
          </div>
        </div>
      </Card>

      <div>
        <Button
          onClick={() => {
            localStorage.removeItem("website-theme");
            localStorage.removeItem("website-decorations");
            location.reload();
          }}
          variant="outline"
          data-testid="button-reset-theme"
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
