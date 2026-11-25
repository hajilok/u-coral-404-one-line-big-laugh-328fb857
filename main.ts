import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

// Generation-1 tournament leader (pending Generation-2 blind championship).
const ENTRY_LINE =
  "I paid $400 to teach my dog boundaries, and now he shuts the door whenever I start crying.";

function validateLine(line: string): string {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line without newline characters.");
  }
  const trimmed = line.trim();
  const charCount = [...trimmed].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(`Entry length ${charCount} is outside 1..${MAX_CHARS} characters.`);
  }
  return trimmed;
}

function main(): void {
  const outputDir = process.argv[2] ?? "/output";
  const text = validateLine(ENTRY_LINE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
}

main();
