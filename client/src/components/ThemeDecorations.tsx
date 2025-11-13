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
      // Create snowflakes in fixed grid positions
      const positions = [
        { left: 5, delay: 0, duration: 15 },
        { left: 15, delay: 2, duration: 18 },
        { left: 25, delay: 4, duration: 16 },
        { left: 35, delay: 1, duration: 17 },
        { left: 45, delay: 3, duration: 19 },
        { left: 55, delay: 2, duration: 15 },
        { left: 65, delay: 4, duration: 18 },
        { left: 75, delay: 1, duration: 16 },
        { left: 85, delay: 3, duration: 17 },
        { left: 95, delay: 2, duration: 19 },
        { left: 10, delay: 5, duration: 16 },
        { left: 30, delay: 6, duration: 18 },
        { left: 50, delay: 5, duration: 17 },
        { left: 70, delay: 6, duration: 19 },
        { left: 90, delay: 5, duration: 15 },
        { left: 20, delay: 7, duration: 16 },
        { left: 40, delay: 7, duration: 17 },
        { left: 60, delay: 7, duration: 18 },
        { left: 80, delay: 7, duration: 19 },
      ];

      positions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`snowflake-${i}`}
            className="snowflake"
            style={{
              left: `${pos.left}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
            }}
          >
            ❄️
          </div>
        );
      });
    }

    if (theme === "halloween") {
      // Fixed pumpkin positions
      const pumpkinPositions = [
        { left: 10, top: 20 },
        { left: 25, top: 15 },
        { left: 40, top: 25 },
        { left: 55, top: 18 },
        { left: 70, top: 22 },
        { left: 85, top: 20 },
        { left: 15, top: 50 },
        { left: 35, top: 55 },
        { left: 60, top: 52 },
        { left: 80, top: 58 },
        { left: 20, top: 80 },
        { left: 45, top: 85 },
        { left: 70, top: 82 },
        { left: 5, top: 40 },
        { left: 92, top: 45 },
      ];

      pumpkinPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`pumpkin-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "2em",
              opacity: 0.3,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🎃
          </div>
        );
      });

      // Fixed spider positions
      const spiderPositions = [
        { right: 15, top: 10 },
        { right: 8, top: 25 },
        { right: 20, top: 40 },
        { right: 5, top: 55 },
        { right: 18, top: 70 },
        { right: 12, top: 35 },
        { right: 3, top: 15 },
        { right: 25, top: 50 },
        { right: 10, top: 80 },
        { right: 22, top: 60 },
      ];

      spiderPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`spider-${i}`}
            className="decoration-spin"
            style={{
              position: "fixed",
              right: `${pos.right}%`,
              top: `${pos.top}%`,
              fontSize: "1.5em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🕷️
          </div>
        );
      });
    }

    if (theme === "easter") {
      // Fixed egg positions
      const eggPositions = [
        { left: 8, top: 15 },
        { left: 22, top: 20 },
        { left: 38, top: 18 },
        { left: 55, top: 22 },
        { left: 70, top: 16 },
        { left: 85, top: 19 },
        { left: 15, top: 50 },
        { left: 45, top: 55 },
        { left: 75, top: 52 },
        { left: 30, top: 80 },
        { left: 60, top: 85 },
        { left: 12, top: 65 },
      ];

      eggPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`egg-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "1.8em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🥚
          </div>
        );
      });

      // Fixed bunny positions
      const bunnyPositions = [
        { left: 5, top: 30 },
        { left: 40, top: 40 },
        { left: 80, top: 35 },
        { left: 25, top: 70 },
        { left: 70, top: 65 },
      ];

      bunnyPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`bunny-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "2em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🐰
          </div>
        );
      });

      // Fixed flower positions
      const flowerPositions = [
        { left: 12, top: 25 },
        { left: 32, top: 60 },
        { left: 52, top: 30 },
        { left: 72, top: 75 },
        { left: 20, top: 85 },
        { left: 50, top: 70 },
        { left: 80, top: 50 },
        { left: 90, top: 20 },
      ];

      flowerPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`flower-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "1.6em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🌸
          </div>
        );
      });
    }

    if (theme === "valentine") {
      // Fixed heart positions
      const heartPositions = [
        { left: 10, top: 15 },
        { left: 25, top: 25 },
        { left: 40, top: 20 },
        { left: 55, top: 30 },
        { left: 70, top: 18 },
        { left: 85, top: 28 },
        { left: 15, top: 50 },
        { left: 35, top: 55 },
        { left: 60, top: 52 },
        { left: 80, top: 60 },
        { left: 20, top: 75 },
        { left: 45, top: 80 },
        { left: 70, top: 78 },
        { left: 8, top: 60 },
        { left: 90, top: 40 },
        { left: 22, top: 42 },
        { left: 50, top: 68 },
        { left: 75, top: 35 },
        { left: 12, top: 85 },
        { left: 65, top: 25 },
      ];

      heartPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`heart-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "1.8em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            ❤️
          </div>
        );
      });

      // Fixed rose positions
      const rosePositions = [
        { left: 5, top: 35 },
        { left: 30, top: 45 },
        { left: 55, top: 40 },
        { left: 80, top: 48 },
        { left: 18, top: 70 },
        { left: 42, top: 65 },
        { left: 68, top: 72 },
        { left: 88, top: 55 },
        { left: 28, top: 15 },
        { left: 62, top: 10 },
      ];

      rosePositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`rose-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "2em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🌹
          </div>
        );
      });
    }

    if (theme === "summer") {
      // Fixed sun positions
      const sunPositions = [
        { left: 10, top: 10 },
        { left: 30, top: 15 },
        { left: 50, top: 8 },
        { left: 70, top: 12 },
        { left: 88, top: 18 },
        { left: 20, top: 40 },
        { left: 60, top: 35 },
        { left: 15, top: 55 },
        { left: 75, top: 48 },
        { left: 40, top: 52 },
        { left: 25, top: 25 },
        { left: 80, top: 28 },
      ];

      sunPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`sun-${i}`}
            className="decoration-spin"
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "2.5em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            ☀️
          </div>
        );
      });

      // Fixed ice cream positions
      const icecreamPositions = [
        { left: 12, bottom: 15 },
        { left: 28, bottom: 20 },
        { left: 45, bottom: 12 },
        { left: 62, bottom: 18 },
        { left: 80, bottom: 22 },
        { left: 20, bottom: 5 },
        { left: 55, bottom: 8 },
        { left: 85, bottom: 10 },
      ];

      icecreamPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`icecream-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              bottom: `${pos.bottom}%`,
              fontSize: "2em",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🍦
          </div>
        );
      });

      // Fixed watermelon positions
      const watermelonPositions = [
        { left: 15, top: 35 },
        { left: 35, top: 42 },
        { left: 55, top: 38 },
        { left: 75, top: 45 },
        { left: 25, top: 65 },
        { left: 65, top: 60 },
      ];

      watermelonPositions.forEach((pos, i) => {
        newDecorations.push(
          <div
            key={`watermelon-${i}`}
            style={{
              position: "fixed",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: "1.8em",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            🍉
          </div>
        );
      });
    }

    setDecorations(newDecorations);
  }, [theme, enabled]);

  if (!enabled) {
    return null;
  }

  return <>{decorations}</>;
}
