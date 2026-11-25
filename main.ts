import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

// Generation-2 undefeated blind-tournament champion (92 UTF-8 bytes, single line).
const ENTRY_LINE =
  "The pastor asked who had a kind word for Uncle Frank, and the motion-sensor lights shut off.";

function validateLine(line: string): string {
  if (/[\r\n]/.test(line)) {
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
  writeFileSync(join(outputDir, "entry.txt"), text, { encoding: "utf8" });
}

main();
