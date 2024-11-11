import fs from "fs";

export default class FileHandler {
  constructor() {
    this.fs = fs;
  }

  readTextFile(path) {
    const text = this.fs.readFileSync(path, "utf-8");
    return text;
  }

  writeTextFile(path, text) {
    this.fs.writeFileSync(path, text, "utf-8");
  }
}
