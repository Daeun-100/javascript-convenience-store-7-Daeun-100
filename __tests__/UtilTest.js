import readTextFile from "../src/utils/readTextFile.js";
import readLine from "../src/utils/readLine.js";
import formatInput from "../src/utils/formatInput.js";

describe("Util", () => {
  test("파일 한줄씩 읽기", () => {
    const text = readTextFile("__tests__/test.md");
    expect(readLine(text, 1)).toBe("name,price,quantity,promotion");
    expect(readLine(text, 2)).toBe("콜라,2000,10,탄산2+1");
    expect(readLine(text, 3)).toBe("콜라,2000,10,null");
    expect(readLine(text, 100)).toBe(null);
  });
  test("inputText를 객체를 담은 배열로 변환", () => {
    const input = "[콜라-10],[사이다-3]";
    expect(formatInput(input)).toEqual([
      { name: "콜라", quantity: 10 },
      { name: "사이다", quantity: 3 },
    ]);
  });
});
