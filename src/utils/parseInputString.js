import lineToArray from "./lineToArray";
import formatInputItem from "./formatInputItem";
// const input = "[콜라-10],[사이다-3]";

export default function parseInputString(input) {
  const inputArr = lineToArray(input);
  return inputArr.map((inputItem) => formatInputItem(inputItem));
}
