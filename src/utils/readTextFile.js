import fs from "fs";

export default function readTextFile(path) {
  const text = fs.readFileSync(path, "utf-8");
  return text;
}
