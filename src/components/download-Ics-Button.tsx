"use client";

// Simple button that builds a query string with basic event details and points to the
// `/api/ics` endpoint that returns a dynamically generated `.ics` file.
//
// Usage:
// <DownloadIcsButton />
//
// The values are hard-coded for demo purposes – replace them with your own data or make
// them props if necessary.
export default function DownloadIcsButton() {
  const event = {
    title: "Team Meeting",
    start: "2025-09-01T10:00:00Z",
    end: "2025-09-01T11:00:00Z",
    location: "Zoom",
    description: "Discuss Q3",
  } as const;

  // Build the query string so that the API route can read the parameters.
  const href = `/api/ics?${new URLSearchParams(event).toString()}`;

  return (
    <a
      href={href}
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      download="events.ics" // if it didn't work delete this to add not download 
    >
      Download .ics (position will be changed)
    </a>
  );
}
