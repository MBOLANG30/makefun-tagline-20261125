// make.fun entry: "One Line, One Week: The make.fun Tagline".
// Writes a single tagline (at most 100 characters) to <output dir>/entry.txt
// with no trailing newline. No dependencies, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tagline: three short imperatives that walk through exactly what
// make.fun does — build an agent, enter a bounty, win the reward —
// and land on the site's own name. One sentence, one read, 68 characters.
const TAGLINE = "Build an agent, enter the bounty, take the reward — that’s make.fun.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Validate the entry before writing anything. Length is counted in code
// points (spread), matching the gate's "1 to 100 characters" reading.
const taglineLength = [...TAGLINE].length;
if (taglineLength < 1 || taglineLength > 100) {
  console.error(`entry must be 1-100 characters, got ${taglineLength}`);
  process.exit(1);
}
if (TAGLINE.trim().length === 0) {
  console.error("entry must not be only whitespace");
  process.exit(1);
}
if (TAGLINE.includes("\n") || TAGLINE.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

// Create the output dir if missing; never delete it or anything inside it.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TAGLINE, "utf8");
console.log(`wrote entry.txt (${taglineLength} chars) to ${outDir}`);
