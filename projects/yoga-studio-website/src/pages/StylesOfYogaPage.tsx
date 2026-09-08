import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { MantraBand } from "../components/ui/MantraBand";
import { Section } from "../components/ui/Section";
import { StyleCard } from "../components/ui/StyleCard";
import { stylesMantra } from "../data/studio";
import { yogaStyles } from "../data/yogaStyles";

export function StylesOfYogaPage() {
  return (
    <>
      <Section className="pb-10 text-center">
        <Container>
          <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
            Styles of Yoga
          </span>
          <h1 className="text-4xl sm:text-5xl">Which class is actually for you</h1>
          <p className="mx-auto mt-4 max-w-[56ch] text-sand-700">
            No two styles ask the same thing of your body. Here's the short version of each one we teach.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {yogaStyles.map((style) => (
              <StyleCard key={style.id} style={style} />
            ))}
          </div>
        </Container>
      </Section>

      <MantraBand sanskrit={stylesMantra.sanskrit} translation={stylesMantra.translation} />

      <Section>
        <Container className="max-w-xl text-center">
          <h2 className="text-3xl">Not sure where to start?</h2>
          <p className="mt-4 text-sand-700">
            Hatha and Gentle Hatha classes are the easiest place to begin. From there, most students settle into
            Vinyasa, Yin, or a mix of both.
          </p>
          <Button to="/schedule" className="mt-6">
            View the schedule
          </Button>
        </Container>
      </Section>
    </>
  );
}
