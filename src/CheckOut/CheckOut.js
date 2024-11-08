import lineToArray from "../utils/lineToArray";
const input = "[콜라-10],[사이다-3]";
let inputArr = lineToArray(input); // ["[콜라-10]", "[사이다-3]"]
inputArr = inputArr.map((test) => test.replace(/[\[\]]/g, ""));
function inputToObj(inputText) {
  const [name, quantity] = inputText.split("-");
  return { name, quantity: Number(quantity) };
}
function inputArrToObj(inputArr) {
  return inputArr.map((input) => inputToObj(input));
}
export default class CheckOut {}
