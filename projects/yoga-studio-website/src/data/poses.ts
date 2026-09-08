import type { Pose } from "./types";

/**
 * The eight poses of the home page sun salutation animation, in sequence.
 * Each illustration is a minimal line figure drawn in a shared 200x220
 * viewBox so every pose lines up on the same "stage".
 */
export const sunSalutationPoses: Pose[] = [
  {
    id: "tadasana",
    sanskrit: "Tadasana",
    english: "Mountain Pose",
    illustration: {
      head: { cx: 100, cy: 34, r: 14 },
      paths: ["M100,48 L100,140", "M100,60 L82,130", "M100,60 L118,130", "M100,140 L88,205", "M100,140 L112,205"],
    },
  },
  {
    id: "urdhva-hastasana",
    sanskrit: "Urdhva Hastasana",
    english: "Upward Salute",
    illustration: {
      head: { cx: 103, cy: 32, r: 14 },
      paths: ["M100,46 Q108,90 104,140", "M101,55 L70,15", "M101,55 L132,17", "M104,140 L92,205", "M104,140 L116,205"],
    },
  },
  {
    id: "uttanasana",
    sanskrit: "Uttanasana",
    english: "Standing Forward Fold",
    illustration: {
      head: { cx: 91, cy: 205, r: 13 },
      paths: ["M100,140 L88,205", "M100,140 L112,205", "M100,140 Q100,172 94,196", "M100,150 L92,206", "M100,150 L108,206"],
    },
  },
  {
    id: "ardha-uttanasana",
    sanskrit: "Ardha Uttanasana",
    english: "Halfway Lift",
    illustration: {
      head: { cx: 151, cy: 99, r: 13 },
      paths: ["M100,140 L88,205", "M100,140 L112,205", "M100,140 L146,108", "M140,113 L120,140"],
    },
  },
  {
    id: "phalakasana",
    sanskrit: "Phalakasana",
    english: "Plank Pose",
    illustration: {
      head: { cx: 48, cy: 142, r: 13 },
      paths: ["M63,148 L168,150", "M63,148 L63,192", "M168,150 L182,188"],
    },
  },
  {
    id: "bhujangasana",
    sanskrit: "Bhujangasana",
    english: "Cobra Pose",
    illustration: {
      head: { cx: 78, cy: 132, r: 13 },
      paths: ["M70,192 L85,150", "M85,150 Q130,118 150,180", "M150,180 L185,190"],
    },
  },
  {
    id: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Svanasana",
    english: "Downward-Facing Dog",
    illustration: {
      head: { cx: 70, cy: 165, r: 13 },
      paths: ["M55,195 L85,150", "M85,150 L125,110", "M125,110 L165,195"],
    },
  },
  {
    id: "uttanasana-return",
    sanskrit: "Uttanasana",
    english: "Forward Fold",
    illustration: {
      head: { cx: 91, cy: 205, r: 13 },
      paths: ["M100,140 L88,205", "M100,140 L112,205", "M100,140 Q100,172 94,196", "M100,150 L92,206", "M100,150 L108,206"],
    },
  },
];
