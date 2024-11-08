import readTextFile from "../utils/readTextFile.js";
import readLine from "../utils/readLine.js";
import lineToArray from "../utils/lineToArray.js";
import selectNotNull from "../utils/selectNotNull.js";
import Promotions from "../Promotion/Promotions.js";

export function generateProductForm(line) {
  let [name, price, quantity, promotion] = lineToArray(line);
  let productForm;
  if (promotion === "null") {
    productForm = {
      name,
      price: Number(price),
      normalQuantity: Number(quantity),
      promotion,
    };
  } else {
    productForm = {
      name,
      price: Number(price),
      promotionQuantity: Number(quantity),
      promotion,
    };
  }
  return productForm;
}

export function getProductFormsArr(productText) {
  const productFormArr = [];
  let i = 2;
  let line = readLine(productText, i);
  //왜 while문에서 안걸러지는 걸까?
  while (line !== null) {
    let line = readLine(productText, i);
    if (line === null) {
      break;
    }
    let productForm = generateProductForm(line);
    if (
      productFormArr.at(-1) &&
      productFormArr.at(-1).name === productForm.name
    ) {
      let promotion1 = productFormArr.at(-1).promotion;
      let promotion2 = productForm.promotion;
      let promotion = selectNotNull(promotion1, promotion2);

      const finalProductForm = {
        ...productFormArr.at(-1),
        ...productForm,
        promotion,
      };
      productFormArr.pop();
      productFormArr.push(finalProductForm);
      i++;
      continue;
    }
    productFormArr.push(productForm);
    i++;
  }
  return productFormArr;
}
