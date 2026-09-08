import type { ClassSession } from "./types";

/**
 * Single source of truth for the weekly class schedule. Both the schedule
 * table and the group class sign-up dropdown are built from this list, so
 * they can never drift out of sync with each other.
 */
export const classSchedule: ClassSession[] = [
  { id: "mon-am-vinyasa", day: "Monday", dayOrder: 0, time: "7:00 – 8:00 AM", className: "Vinyasa Flow", instructor: "Maya Torres" },
  { id: "mon-pm-yin", day: "Monday", dayOrder: 0, time: "6:00 – 7:15 PM", className: "Yin Yoga", instructor: "Daniel Osei" },
  { id: "tue-am-hatha", day: "Tuesday", dayOrder: 1, time: "9:30 – 10:30 AM", className: "Hatha Yoga", instructor: "Priya Nandakumar" },
  { id: "tue-pm-restorative", day: "Tuesday", dayOrder: 1, time: "6:00 – 7:00 PM", className: "Restorative Yoga", instructor: "Maya Torres" },
  { id: "wed-am-vinyasa", day: "Wednesday", dayOrder: 2, time: "7:00 – 8:00 AM", className: "Vinyasa Flow", instructor: "Daniel Osei" },
  { id: "wed-noon-express", day: "Wednesday", dayOrder: 2, time: "12:15 – 1:00 PM", className: "Lunchtime Flow (Express)", instructor: "Priya Nandakumar" },
  { id: "wed-pm-ashtanga", day: "Wednesday", dayOrder: 2, time: "6:00 – 7:15 PM", className: "Ashtanga-Inspired Flow", instructor: "Maya Torres" },
  { id: "thu-am-hatha", day: "Thursday", dayOrder: 3, time: "9:30 – 10:30 AM", className: "Gentle Hatha", instructor: "Priya Nandakumar" },
  { id: "thu-pm-yin", day: "Thursday", dayOrder: 3, time: "6:00 – 7:00 PM", className: "Yin Yoga", instructor: "Daniel Osei" },
  { id: "fri-am-vinyasa", day: "Friday", dayOrder: 4, time: "7:00 – 8:00 AM", className: "Vinyasa Flow", instructor: "Maya Torres" },
  { id: "fri-pm-restorative", day: "Friday", dayOrder: 4, time: "5:30 – 6:30 PM", className: "Restorative Yoga", instructor: "Priya Nandakumar" },
  { id: "sat-am-community", day: "Saturday", dayOrder: 5, time: "9:00 – 10:15 AM", className: "Community Vinyasa Flow", instructor: "Maya Torres" },
  { id: "sat-late-yin-sound", day: "Saturday", dayOrder: 5, time: "10:30 – 11:30 AM", className: "Yin & Sound", instructor: "Daniel Osei" },
];

export function formatSessionLabel(session: ClassSession): string {
  return `${session.day} ${session.time}, ${session.className} (${session.instructor})`;
}
