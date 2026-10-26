"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
});

const subscribe = (tick: () => void) => {
  const id = window.setInterval(tick, 15_000);
  return () => window.clearInterval(id);
};
const now = () => format.format(new Date());
// Static pages are built ahead of time, so the server has no "now" to show.
const notYet = () => null;

/** "Lagos · 14:05 WAT", live in the visitor's browser. */
export default function LagosClock() {
  const time = useSyncExternalStore(subscribe, now, notYet);
  return (
    <span>
      Lagos · <span className="tabular-nums">{time ?? "--:--"}</span> WAT
    </span>
  );
}
