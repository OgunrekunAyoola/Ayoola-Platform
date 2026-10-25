import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";

/** Resolved at build time, so CV buttons never link to a missing file. */
export const hasCv = fs.existsSync(path.join(process.cwd(), "public", site.cvPath));
