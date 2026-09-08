import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Reserve my spot</Button>);
    expect(screen.getByRole("button", { name: "Reserve my spot" })).toBeInTheDocument();
  });

  it("defaults to the primary variant", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary-700");
  });

  it("applies outline variant styling when requested", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-primary-700");
    expect(button).not.toHaveClass("bg-primary-700");
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("defaults to type=button so it never accidentally submits a form", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("respects an explicit type override", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders as an internal router link when `to` is provided", () => {
    render(
      <MemoryRouter>
        <Button to="/schedule">View the schedule</Button>
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: "View the schedule" });
    expect(link).toHaveAttribute("href", "/schedule");
  });
});
