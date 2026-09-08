import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { MantraBand } from "../components/ui/MantraBand";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SunSalutationFlow } from "../components/ui/SunSalutationFlow";
import { homeMantra, instructors } from "../data/studio";

const PATHS_IN = [
  {
    title: "Group Classes",
    description:
      "A steady weekly rhythm across Vinyasa, Hatha, Yin, and Restorative, taught by the same few instructors so the room starts to feel familiar.",
    linkLabel: "See the schedule",
    to: "/schedule",
    icon: (
      <path d="M4 20c8-1 14-7 15-15-8 1-14 7-15 15Zm2-2c2-4 5-7 9-9" />
    ),
  },
  {
    title: "Private Sessions",
    description:
      "One-to-one time built around you, whether that's working around an injury, preparing for something specific, or just wanting more attention.",
    linkLabel: "Apply for a private session",
    to: "/private-sessions",
    icon: <><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.2-4.2 4-6.4 7-6.4S18.8 15.8 20 20" /></>,
  },
  {
    title: "Styles of Yoga",
    description:
      "Hatha, Vinyasa, Yin, and more, explained simply, so you can choose a class that actually matches what your body needs that day.",
    linkLabel: "Compare the styles",
    to: "/styles-of-yoga",
    icon: <><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /></>,
  },
];

export function HomePage() {
  return (
    <>
      <Section className="pb-20 pt-16 sm:pt-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
              Ekam Yoga Studio
            </span>
            <h1 className="text-5xl sm:text-6xl">Find your ground.</h1>
            <p className="mt-5 max-w-[46ch] text-sand-700">
              Ekam means "one," and that's the idea here: one breath, one body, one moment at a time. We're a
              small studio that keeps things simple, with steady classes and attentive teachers, and enough quiet
              to actually hear yourself think.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/schedule">View the schedule</Button>
              <Button to="/pricing" variant="outline">
                See pricing
              </Button>
            </div>
          </div>

          <SunSalutationFlow />
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Start here"
            title="Three ways into the practice"
            description="However you like to move, there's a way in. Pick a group class, book a private session, or read up on the styles first."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {PATHS_IN.map((path) => (
              <div key={path.to} className="rounded-xl2 border border-sand-300 bg-white p-8 shadow-soft">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  className="mb-4 h-8 w-8 text-primary-700"
                >
                  {path.icon}
                </svg>
                <h3 className="mb-2">{path.title}</h3>
                <p className="text-sand-700">{path.description}</p>
                <Button to={path.to} variant="outline" className="mt-4 !px-4 !py-2 text-xs">
                  {path.linkLabel} <span aria-hidden="true">→</span>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <MantraBand sanskrit={homeMantra.sanskrit} translation={homeMantra.translation} />

      <Section>
        <Container className="max-w-2xl text-center">
          <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
            About the studio
          </span>
          <h2 className="text-3xl sm:text-4xl">A small room, on purpose</h2>
          <p className="mt-4 text-sand-700">
            Ekam stays small so teachers can actually notice you, correct alignment by hand when it helps, and
            remember what you were working on last week. There's no sign-in kiosk, no upsell at the front desk,
            just a quiet room, a few mats, and a class about to start.
          </p>
          <p className="mt-4 text-sand-700">
            Classes are taught by {instructors.map((instructor) => instructor.name).join(", ")}, each with their
            own focus but a shared, unhurried teaching style. You'll find their names next to every class on the
            schedule.
          </p>
        </Container>
      </Section>
    </>
  );
}
