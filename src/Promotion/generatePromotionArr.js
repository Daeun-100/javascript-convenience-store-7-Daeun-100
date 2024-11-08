import readLine from "../utils/readLine";
import lineToArray from "../utils/lineToArray";

export default function generatePromotionsArr(promotionsText) {
  const promotionsArr = [];

  let i = 2;
  while (readLine(promotionsText, i) !== null) {
    let line = readLine(promotionsText, i);
    const [name, buy, get, start_date, end_date] = lineToArray(line);
    let promotion = {
      name,
      buy: Number(buy),
      get: Number(get),
      start_date: start_date,
      end_date: end_date,
    };
    promotionsArr.push(promotion);
    i++;
  }
  return promotionsArr;
}
