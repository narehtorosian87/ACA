import type { ClassSession } from "../../data/types";

interface ScheduleTableProps {
  sessions: ClassSession[];
}

export function ScheduleTable({ sessions }: ScheduleTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl2 border border-sand-300 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-sand-200">
            <th scope="col" className="px-5 py-4 font-heading font-semibold text-sand-900">
              Day
            </th>
            <th scope="col" className="px-5 py-4 font-heading font-semibold text-sand-900">
              Time
            </th>
            <th scope="col" className="px-5 py-4 font-heading font-semibold text-sand-900">
              Class
            </th>
            <th scope="col" className="px-5 py-4 font-heading font-semibold text-sand-900">
              Instructor
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="border-t border-sand-300">
              <td className="whitespace-nowrap px-5 py-4 font-semibold text-primary-700">{session.day}</td>
              <td className="px-5 py-4">{session.time}</td>
              <td className="px-5 py-4">{session.className}</td>
              <td className="px-5 py-4">{session.instructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
