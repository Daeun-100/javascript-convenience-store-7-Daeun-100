import readLine from "./readLine.js";
import lineToArray from "./lineToArray.js";

function createPromotionForm(line) {
  const [name, buy, get, start_date, end_date] = lineToArray(line);
  return {
    name,
    buy: Number(buy),
    get: Number(get),
    start_date,
    end_date,
  };
}

export default function getPromotionsArr(promotionsText) {
  const promotionsArr = [];
  let i = 2;

  while (readLine(promotionsText, i) !== null) {
    let line = readLine(promotionsText, i);
    promotionsArr.push(createPromotionForm(line));
    i++;
  }
  return promotionsArr;
}
