export interface Preferences {
  username: string;
  defaultTheme: "space-deep" | "cyberpunk-pink" | "solar-gold" | "zen-moss" | "velvet-night";
  defaultBrush: "neon-trail" | "star-dust" | "vortex-glow" | "vaporwave";
  volumeOn: boolean;
  frequency: number; // custom sound tone freq
  animationSpeed: number; // scale 1-5
}

export interface Point {
  x: number;
  y: number;
}

export interface CanvasStroke {
  points: Point[];
  color: string;
  brushSize: number;
  brushType: string;
}

export interface SavedCanvas {
  id: string;
  title: string;
  description: string;
  brushTheme: string;
  paletteColor: string;
  strokes: CanvasStroke[];
  timestamp: string;
}

export interface AlchemistHistoryItem {
  id: string;
  formula: string;
  activeVibes: string[];
  analysis: string;
  recipe: string[];
  poem: string;
  colors: {
    startColor: string;
    endColor: string;
    accentColor: string;
  };
  timestamp: string;
}
