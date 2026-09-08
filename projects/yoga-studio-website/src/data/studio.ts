import type { Instructor, Mantra } from "./types";

export const instructors: Instructor[] = [
  { id: "maya-torres", name: "Maya Torres" },
  { id: "priya-nandakumar", name: "Priya Nandakumar" },
  { id: "daniel-osei", name: "Daniel Osei" },
];

export const homeMantra: Mantra = {
  sanskrit: "Lokah Samastah Sukhino Bhavantu",
  translation:
    "May all beings everywhere be happy and free, and may the thoughts, words, and actions of my own life contribute in some way to that happiness and to that freedom for all.",
};

export const stylesMantra: Mantra = {
  sanskrit: "Sthira Sukham Asanam",
  translation:
    "A posture should be steady and comfortable. Whichever style you choose, that's really the only rule.",
};
