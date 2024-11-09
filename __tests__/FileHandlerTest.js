import FileHandler from "../src/FileHandler";

describe("FileHandler 테스트", () => {
  test("readTextFile 테스트", () => {
    const fileHandler = new FileHandler();
    const path = "./__tests__/test.md";
    const content = fileHandler.readTextFile(path);
    expect(content).toContain("name,price,quantity,promotion");
  });
});
