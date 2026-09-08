import type { Mantra } from "../../data/types";
import { Container } from "./Container";

export function MantraBand({ sanskrit, translation }: Mantra) {
  return (
    <div className="bg-primary-700 py-20 text-center text-sand-50">
      <Container>
        <p className="font-heading text-2xl sm:text-3xl">{sanskrit}</p>
        <p className="mx-auto mt-3 max-w-xl text-sand-100/90">{translation}</p>
      </Container>
    </div>
  );
}
