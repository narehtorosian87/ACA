import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { classSchedule } from "./data/schedule";

function renderApp(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the home page at /", () => {
    renderApp("/");
    expect(screen.getByRole("heading", { level: 1, name: "Find your ground." })).toBeInTheDocument();
  });

  it("renders the schedule page at /schedule", () => {
    renderApp("/schedule");
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();
  });

  it("renders the pricing page at /pricing", () => {
    renderApp("/pricing");
    expect(screen.getByRole("heading", { level: 1, name: "Simple pricing, no fine print" })).toBeInTheDocument();
  });

  it("renders the styles of yoga page at /styles-of-yoga", () => {
    renderApp("/styles-of-yoga");
    expect(screen.getByRole("heading", { level: 1, name: "Which class is actually for you" })).toBeInTheDocument();
  });

  it("renders the private sessions page at /private-sessions", () => {
    renderApp("/private-sessions");
    expect(screen.getByRole("heading", { level: 1, name: "One-to-one, built around you" })).toBeInTheDocument();
  });
});

describe("Cross-page user flows", () => {
  it("lets a visitor go from the home page CTA to reserving a group class", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: "View the schedule" }));
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Full name"), "Jordan Reyes");
    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.selectOptions(screen.getByLabelText("Choose a class"), classSchedule[0].id);
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));

    expect(screen.getByRole("status")).toHaveTextContent(/spot is reserved/i);
  });

  it("lets a visitor go from the home page CTA to applying for a private session", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: /apply for a private session/i }));
    expect(screen.getByRole("heading", { level: 1, name: "One-to-one, built around you" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Full name"), "Jordan Reyes");
    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.selectOptions(screen.getByLabelText("Experience level"), "Some experience");
    await user.type(screen.getByLabelText("What are you hoping to work on?"), "More flexibility");
    await user.click(screen.getByRole("button", { name: "Send application" }));

    expect(screen.getByRole("status")).toHaveTextContent(/received your application/i);
  });

  it("lets a visitor browse styles of yoga then jump to the schedule", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: /compare the styles/i }));
    expect(screen.getByRole("heading", { level: 1, name: "Which class is actually for you" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "View the schedule" }));
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();
  });

  it("lets a visitor use the nav bar to reach pricing from anywhere on the site", async () => {
    const user = userEvent.setup();
    renderApp("/styles-of-yoga");

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    await user.click(within(primaryNav).getByRole("link", { name: "Pricing" }));
    expect(screen.getByRole("heading", { level: 1, name: "Simple pricing, no fine print" })).toBeInTheDocument();
  });
});
