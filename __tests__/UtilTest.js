import formatInput from "../src/formatInput.js";

describe("Util", () => {
  test("inputText를 객체를 담은 배열로 변환", () => {
    const input = "[콜라-10],[사이다-3]";
    expect(formatInput(input)).toEqual([
      { name: "콜라", quantity: 10 },
      { name: "사이다", quantity: 3 },
    ]);
  });
});
