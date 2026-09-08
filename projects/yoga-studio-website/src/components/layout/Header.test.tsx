import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

function renderHeader(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("links to every page of the site", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Schedule" })).toHaveAttribute("href", "/schedule");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: "Styles of Yoga" })).toHaveAttribute("href", "/styles-of-yoga");
    expect(screen.getByRole("link", { name: "Private Sessions" })).toHaveAttribute("href", "/private-sessions");
  });

  it("marks the link for the current page as active", () => {
    renderHeader("/pricing");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("keeps the mobile menu closed until the toggle is pressed", () => {
    renderHeader();
    expect(screen.getByTestId("mobile-nav")).toHaveClass("hidden");
  });

  it("opens and closes the mobile menu when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: /menu/i });

    await user.click(toggle);
    expect(screen.getByTestId("mobile-nav")).not.toHaveClass("hidden");

    await user.click(toggle);
    expect(screen.getByTestId("mobile-nav")).toHaveClass("hidden");
  });

  it("closes the mobile menu after a link is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: /menu/i }));

    const mobileNav = screen.getByTestId("mobile-nav");
    const scheduleLinks = screen.getAllByRole("link", { name: "Schedule" });
    await user.click(scheduleLinks[scheduleLinks.length - 1]);

    expect(mobileNav).toHaveClass("hidden");
  });
});
