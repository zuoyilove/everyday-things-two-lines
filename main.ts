// Everyday Things, Two Lines — an elevator, explained to a 10-year-old.
//
// The entry is two lines. Line 1 explains one everyday thing (an elevator)
// through a single concrete analogy a 10-year-old can picture: a bucket on a
// rope drawn up from a well. Line 2 says why the analogy works: what it maps
// and what it leaves out, instead of praising the analogy.
//
// The program is deterministic: every run writes byte-identical output, and
// it asserts the sealed gate (UTF-8 text, 1-400 characters, not only
// whitespace) plus the two-line shape before writing anything.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE_1 =
  "An elevator is a big metal bucket on a rope that carries people up and down a tall building instead of water up from a well.";
const LINE_2 =
  "It maps the up-and-down trip and the waiting at each stop, but it leaves out the hidden motor and heavy block that do the lifting, and that you can pick any floor with a button while a bucket only goes where the rope takes it.";

const ENTRY = `${LINE_1}\n${LINE_2}\n`;

function main(): void {
  // Gate: UTF-8 text of 1 to 400 characters, not only whitespace.
  if (ENTRY.length < 1 || ENTRY.length > 400) {
    throw new Error(`entry is ${ENTRY.length} characters, must be 1-400`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  // Shape: exactly two lines, each exactly one sentence.
  const lines = ENTRY.trimEnd().split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry has ${lines.length} lines, must be 2`);
  }
  for (const [i, line] of lines.entries()) {
    const sentences = line.split(".").filter((part) => part.trim().length > 0);
    if (sentences.length !== 1 || !line.trimEnd().endsWith(".")) {
      throw new Error(`line ${i + 1} is not exactly one sentence: ${line}`);
    }
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
