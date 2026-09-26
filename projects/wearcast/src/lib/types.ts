export type ClosetCategory =
  | "top"
  | "bottom"
  | "dress"
  | "outerwear"
  | "shoes"
  | "accessory";

export type Formality =
  | "very_casual"
  | "casual"
  | "smart_casual"
  | "business"
  | "formal";

export type Season = "spring" | "summer" | "fall" | "winter";

export type Pattern =
  | "solid"
  | "striped"
  | "plaid"
  | "floral"
  | "graphic"
  | "textured"
  | "other";

export type OccasionTag =
  | "work"
  | "casual"
  | "gym"
  | "date"
  | "travel"
  | "outdoor"
  | "party"
  | "lounge";

export interface ClosetItem {
  id: string;
  name: string;
  category: ClosetCategory;
  subcategory?: string;
  colors: string[];
  pattern: Pattern;
  formality: Formality;
  /** 1 = very light/breathable, 5 = very warm/insulated */
  warmth: 1 | 2 | 3 | 4 | 5;
  rainOk: boolean;
  seasons: Season[];
  occasionTags: OccasionTag[];
  fit?: string;
  photoUrl?: string;
  favorite: boolean;
  lastWornDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ClosetItemInput = Omit<
  ClosetItem,
  "id" | "createdAt" | "updatedAt"
>;

export type MoodChip =
  | "cozy"
  | "bold"
  | "professional"
  | "relaxed"
  | "romantic"
  | "adventurous"
  | "low_key";

export interface PlanEntry {
  id: string;
  title: string;
  time?: string;
  occasionTag: OccasionTag;
}

export interface WeatherSnapshot {
  temperatureC: number;
  feelsLikeC: number;
  precipitationChance: number;
  windKph: number;
  conditionCode: number;
  conditionLabel: string;
  isRaining: boolean;
  isSnowing: boolean;
}

export interface DayContext {
  date: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  weather?: WeatherSnapshot;
  plans: PlanEntry[];
  moodChips: MoodChip[];
  moodNote?: string;
}

export interface Settings {
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface OutfitItem {
  item: ClosetItem;
  role: ClosetCategory;
}

export interface OutfitRecommendation {
  id: string;
  label: string;
  items: OutfitItem[];
  score: number;
  reasons: string[];
  summary: string;
}
