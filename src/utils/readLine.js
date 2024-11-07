export default function readLine(text, line) {
  const textArr = text.split("\n");
  if (line === 0 || !textArr[line - 1]) {
    return "";
  }
  return textArr[line - 1].trim();
}
