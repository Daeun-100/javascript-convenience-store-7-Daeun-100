import readTextFile from "../src/utils/readTextFile.js";
import readLine from "../src/utils/readLine.js";
import { Console } from "@woowacourse/mission-utils";

describe("Util", () => {
  test("파일 한줄씩 읽기", () => {
    const text = readTextFile("__tests__/test.md");
    expect(readLine(text, 1)).toBe("name,price,quantity,promotion");
    expect(readLine(text, 2)).toBe("콜라,2000,10,탄산2+1");
    expect(readLine(text, 3)).toBe("콜라,2000,10,null");
    expect(readLine(text, 100)).toBe(null);
  });
});
