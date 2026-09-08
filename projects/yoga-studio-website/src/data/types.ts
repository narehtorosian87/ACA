export interface ClassSession {
  id: string;
  day: string;
  /** 0 = Monday .. 5 = Saturday, used for sort order. */
  dayOrder: number;
  time: string;
  className: string;
  instructor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  tag?: string;
  featured?: boolean;
}

export interface YogaStyle {
  id: string;
  name: string;
  tag: string;
  description: string;
}

export interface PoseIllustrationData {
  head: { cx: number; cy: number; r: number };
  paths: string[];
}

export interface Pose {
  id: string;
  sanskrit: string;
  english: string;
  illustration: PoseIllustrationData;
}

export interface Instructor {
  id: string;
  name: string;
}

export interface Mantra {
  sanskrit: string;
  translation: string;
}
