import { render, screen } from "@testing-library/react";
import { ScheduleTable } from "./ScheduleTable";
import type { ClassSession } from "../../data/types";

const sessions: ClassSession[] = [
  { id: "a", day: "Monday", dayOrder: 0, time: "7:00 – 8:00 AM", className: "Vinyasa Flow", instructor: "Maya Torres" },
  { id: "b", day: "Tuesday", dayOrder: 1, time: "9:30 – 10:30 AM", className: "Hatha Yoga", instructor: "Priya Nandakumar" },
];

describe("ScheduleTable", () => {
  it("renders one row per class session with day, time, class, and instructor", () => {
    render(<ScheduleTable sessions={sessions} />);
    const rows = screen.getAllByRole("row");
    // One header row + one row per session.
    expect(rows).toHaveLength(sessions.length + 1);

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Vinyasa Flow")).toBeInTheDocument();
    expect(screen.getByText("Maya Torres")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Hatha Yoga")).toBeInTheDocument();
    expect(screen.getByText("Priya Nandakumar")).toBeInTheDocument();
  });

  it("labels its columns for accessibility", () => {
    render(<ScheduleTable sessions={sessions} />);
    expect(screen.getByRole("columnheader", { name: "Day" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Time" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Class" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Instructor" })).toBeInTheDocument();
  });
});
