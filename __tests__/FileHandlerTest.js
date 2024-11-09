import FileHandler from "../src/FileHandler";

describe("FileHandler 테스트", () => {
  const fileHandler = new FileHandler();
  const path = "./__tests__/test.md";
  test("writeTextFile 테스트", () => {
    const content = "test";
    fileHandler.writeTextFile(path, content);
    fileHandler.writeTextFile(path, "name,price,quantity,promotion");
    const readContent = fileHandler.readTextFile(path);
    expect(readContent).toBe("name,price,quantity,promotion");
  });
  test("readTextFile 테스트", () => {
    const content = fileHandler.readTextFile(path);
    expect(content).toContain("name,price,quantity,promotion");
  });
});
