import fs from "fs";
import Readline from "readline";

export async function readFile(file: string) {
  const fileStream = fs.createReadStream(file);

  const rl = Readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }
  return lines;
}
