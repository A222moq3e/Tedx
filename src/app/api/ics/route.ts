import { type NextRequest } from "next/server";
import { createEvent } from "ics";

export const GET = async (req: NextRequest) => {
  // Read query parameters
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Untitled Event";
  const description = searchParams.get("description") ?? undefined;
  const location = searchParams.get("location") ?? undefined;
  const startIso = searchParams.get("start");
  const endIso = searchParams.get("end");

  if (!startIso || !endIso) {
    return new Response("Missing start or end", { status: 400 });
  }

  // Convert ISO strings to date arrays required by `ics` [year, month, day, hour, minute]
  const toIcsDate = (iso: string): [number, number, number, number, number] => {
    const date = new Date(iso);
    return [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1, // ics month is 1-based
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
    ];
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { error, value } = createEvent({
    title,
    description,
    location,
    start: toIcsDate(startIso),
    end: toIcsDate(endIso),
  });

  if (error || !value) {
    return new Response("Failed to generate calendar", { status: 500 });
  }

  return new Response(value, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=events.ics",
    },
  });
};
