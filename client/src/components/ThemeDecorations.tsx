import { useEffect, useState } from "react";
import type { ThemeType } from "./ThemeManager";

interface ThemeDecorationsProps {
  theme: ThemeType;
  enabled: boolean;
}

export function ThemeDecorations({ theme, enabled }: ThemeDecorationsProps) {
  const [decorations, setDecorations] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!enabled) {
      setDecorations([]);
      return;
    }

    const newDecorations: JSX.Element[] = [];

    if (theme === "christmas") {
      // Create snowflakes
      for (let i = 0; i < 20; i++) {
        newDecorations.push(
          <div
            key={`snowflake-${i}`}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            ❄️
          </div>
        );
      }

      // Add garland decoration to header
      const header = document.querySelector("header");
      if (header) {
        const garland = document.createElement("div");
        garland.className = "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-60";
        header.style.position = "relative";
        header.appendChild(garland);
        return () => garland.remove();
      }
    }

    if (theme === "halloween") {
      // Create pumpkins
      for (let i = 0; i < 15; i++) {
        newDecorations.push(
          <div
            key={`pumpkin-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "2em",
              opacity: 0.3,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🎃
          </div>
        );
      }

      // Add spiders
      for (let i = 0; i < 10; i++) {
        newDecorations.push(
          <div
            key={`spider-${i}`}
            className="decoration-spin"
            style={{
              position: "fixed",
              right: `${Math.random() * 20}%`,
              top: `${Math.random() * 50}%`,
              fontSize: "1.5em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🕷️
          </div>
        );
      }
    }

    if (theme === "easter") {
      // Create eggs and bunnies
      for (let i = 0; i < 12; i++) {
        newDecorations.push(
          <div
            key={`egg-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "1.8em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🥚
          </div>
        );
      }

      // Add bunnies
      for (let i = 0; i < 5; i++) {
        newDecorations.push(
          <div
            key={`bunny-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "2em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🐰
          </div>
        );
      }

      // Add flowers
      for (let i = 0; i < 8; i++) {
        newDecorations.push(
          <div
            key={`flower-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "1.6em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🌸
          </div>
        );
      }
    }

    if (theme === "valentine") {
      // Create hearts and roses
      for (let i = 0; i < 20; i++) {
        newDecorations.push(
          <div
            key={`heart-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "1.8em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </div>
        );
      }

      // Add roses
      for (let i = 0; i < 10; i++) {
        newDecorations.push(
          <div
            key={`rose-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "2em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🌹
          </div>
        );
      }
    }

    if (theme === "summer") {
      // Create suns, ice creams, and beach balls
      for (let i = 0; i < 12; i++) {
        newDecorations.push(
          <div
            key={`sun-${i}`}
            className="decoration-float decoration-spin"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              fontSize: "2.5em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            ☀️
          </div>
        );
      }

      // Add ice creams
      for (let i = 0; i < 8; i++) {
        newDecorations.push(
          <div
            key={`icecream-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
              fontSize: "2em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🍦
          </div>
        );
      }

      // Add watermelons
      for (let i = 0; i < 6; i++) {
        newDecorations.push(
          <div
            key={`watermelon-${i}`}
            className="decoration-float"
            style={{
              position: "fixed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "1.8em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🍉
          </div>
        );
      }
    }

    setDecorations(newDecorations);
  }, [theme, enabled]);

  if (!enabled) {
    return null;
  }

  return <>{decorations}</>;
}
