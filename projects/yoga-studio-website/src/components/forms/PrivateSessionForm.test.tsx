import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrivateSessionForm } from "./PrivateSessionForm";

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Jordan Reyes");
  await user.type(screen.getByLabelText("Email"), "jordan@example.com");
  await user.selectOptions(screen.getByLabelText("Experience level"), "New to yoga");
  await user.type(screen.getByLabelText("What are you hoping to work on?"), "Recovering from a knee injury");
}

describe("PrivateSessionForm", () => {
  it("renders the experience level options", () => {
    render(<PrivateSessionForm />);
    expect(screen.getByRole("option", { name: "New to yoga" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Some experience" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Experienced practitioner" })).toBeInTheDocument();
  });

  it("does not confirm an application when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<PrivateSessionForm />);
    await user.click(screen.getByRole("button", { name: "Send application" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("confirms the application once the required fields are filled in", async () => {
    const user = userEvent.setup();
    render(<PrivateSessionForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Send application" }));
    expect(screen.getByRole("status")).toHaveTextContent(/received your application/i);
  });

  it("clears the form after a successful application", async () => {
    const user = userEvent.setup();
    render(<PrivateSessionForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Send application" }));
    expect(screen.getByLabelText("Full name")).toHaveValue("");
    expect(screen.getByLabelText("What are you hoping to work on?")).toHaveValue("");
  });

  it("treats phone number and additional notes as optional", async () => {
    const user = userEvent.setup();
    render(<PrivateSessionForm />);
    await fillRequiredFields(user);
    // Deliberately leave phone and "anything else" blank.
    await user.click(screen.getByRole("button", { name: "Send application" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
