import { type NextRequest } from "next/server";
import { createEvents } from "ics";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const GET = async (_req: NextRequest) => {
  const filePath = join(process.cwd(), "public", "events.json");

  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    return new Response("events.json not found in /public", { status: 404 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!Array.isArray(json)) {
    return new Response("Expected an array of events", { status: 400 });
  }

  type InputEvent = {
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    location?: string;
    description?: string;
  };

  const toIcsDate = (iso: string): [number, number, number, number, number] => {
    const date = new Date(iso);
    return [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
    ];
  };

  const events = (json as InputEvent[]).map((e) => ({
    title: e.title,
    description: e.description,
    location: e.location,
    start: toIcsDate(e.start),
    end: toIcsDate(e.end),
  }));

  const { error, value } = createEvents(events);
  if (error || !value) {
    return new Response("Failed to generate calendar", { status: 500 });
  }

  return new Response(value, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="events.ics"`,
    },
  });
};
