import { PrivateSessionForm } from "../components/forms/PrivateSessionForm";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";

export function PrivateSessionsPage() {
  return (
    <>
      <Section className="pb-6 text-center">
        <Container>
          <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
            Private Sessions
          </span>
          <h1 className="text-4xl sm:text-5xl">One-to-one, built around you</h1>
          <p className="mx-auto mt-4 max-w-[60ch] text-sand-700">
            Private sessions are for recovering from an injury, preparing for something specific, or simply
            wanting more attention than a group class allows. Tell us a little about yourself and we'll match
            you with the right teacher.
          </p>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <PrivateSessionForm />
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="max-w-xl text-center">
          <h2 className="text-3xl">What to expect</h2>
          <p className="mt-4 text-sand-700">
            Once we receive your application, we'll match you with a teacher based on your goals and
            availability, then confirm a time by email. Most students start with a single session before
            deciding on a package.
          </p>
        </Container>
      </Section>
    </>
  );
}
