export default function readLine(text, line) {
  const textArr = text.split("\n");
  if (line === 0 || line > textArr.length) {
    return null;
  }
  return textArr[line - 1].trim();
}
