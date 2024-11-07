import readTextFile from "../src/utils/readTextFile.js";
import readLine from "../src/utils/readLine.js";
import { Console } from "@woowacourse/mission-utils";

describe("Util", () => {
  test("파일 한줄씩 읽기", () => {
    const text = readTextFile("__tests__/test.md");
    expect(readLine(text, 1)).toBe("1줄");
    expect(readLine(text, 2)).toBe("2줄");
    expect(readLine(text, 3)).toBe("3줄");
    expect(readLine(text, 5)).toBe("");
  });
});
