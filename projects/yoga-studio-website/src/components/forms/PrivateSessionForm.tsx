import { useRef, useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { SelectField, TextareaField, TextField } from "../ui/FormField";
import { SuccessMessage } from "../ui/SuccessMessage";

const EXPERIENCE_LEVELS = ["New to yoga", "Some experience", "Experienced practitioner"];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  level: "",
  goal: "",
  availability: "",
  notes: "",
};

export function PrivateSessionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(false);

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setIsSubmitted(true);
    setValues(initialValues);
  }

  function update<K extends keyof typeof initialValues>(key: K) {
    return (event: { target: { value: string } }) => setValues((prev) => ({ ...prev, [key]: event.target.value }));
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl2 border border-sand-300 bg-white p-8 shadow-soft sm:p-10">
      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        <div className="grid gap-x-5 sm:grid-cols-2">
          <TextField id="app-name" label="Full name" required value={values.name} onChange={update("name")} />
          <TextField
            id="app-email"
            label="Email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
          />
        </div>

        <div className="grid gap-x-5 sm:grid-cols-2">
          <TextField id="app-phone" label="Phone (optional)" type="tel" value={values.phone} onChange={update("phone")} />
          <SelectField id="app-level" label="Experience level" required value={values.level} onChange={update("level")}>
            <option value="" disabled>
              Select one
            </option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </SelectField>
        </div>

        <TextareaField
          id="app-goal"
          label="What are you hoping to work on?"
          required
          placeholder="An injury, a specific goal, more flexibility, less stress, anything at all."
          value={values.goal}
          onChange={update("goal")}
        />

        <TextField
          id="app-availability"
          label="Preferred days and times"
          placeholder="For example: weekday mornings, or Saturday afternoons"
          value={values.availability}
          onChange={update("availability")}
        />

        <TextareaField
          id="app-notes"
          label="Anything else we should know (optional)"
          value={values.notes}
          onChange={update("notes")}
        />

        <Button type="submit">Send application</Button>
      </form>

      {isSubmitted ? (
        <SuccessMessage>
          Thank you. We've received your application and will reach out within a couple of days to set up your
          first session. (This is a first-version demo form; nothing is sent yet.)
        </SuccessMessage>
      ) : null}
    </div>
  );
}
