import { sunSalutationPoses } from "../../data/poses";

const CYCLE_SECONDS = 16;

export function SunSalutationFlow() {
  const stepSeconds = CYCLE_SECONDS / sunSalutationPoses.length;

  return (
    <div className="relative mx-auto aspect-[4/4.6] w-full max-w-sm" aria-hidden="true">
      <div className="breath-ring absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_40%,theme(colors.primary.200),transparent_68%)]" />

      {sunSalutationPoses.map((pose, index) => {
        const delay = `${index * stepSeconds}s`;
        return (
          <div
            key={pose.id}
            className="pose-layer absolute inset-0 text-primary-700"
            style={{ animationDelay: delay }}
          >
            <svg
              viewBox="0 0 200 220"
              fill="none"
              stroke="currentColor"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full"
            >
              <circle
                cx={pose.illustration.head.cx}
                cy={pose.illustration.head.cy}
                r={pose.illustration.head.r}
                fill="currentColor"
                stroke="none"
              />
              {pose.illustration.paths.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </div>
        );
      })}

      <div className="absolute inset-x-0 -bottom-1.5 text-center">
        {sunSalutationPoses.map((pose, index) => {
          const delay = `${index * stepSeconds}s`;
          return (
            <div key={pose.id} className="pose-name absolute inset-x-0" style={{ animationDelay: delay }}>
              <span className="block font-heading text-lg text-sand-900">{pose.sanskrit}</span>
              <span className="block text-xs uppercase tracking-wide text-sand-600">{pose.english}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
