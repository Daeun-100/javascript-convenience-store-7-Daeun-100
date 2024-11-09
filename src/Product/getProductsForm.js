import readTextFile from "../utils/readTextFile.js";
import readLine from "../utils/readLine.js";
import lineToArray from "../utils/lineToArray.js";
import selectNotNull from "../utils/selectNotNull.js";
import Promotions from "../Promotion/Promotions.js";
import generateProductForm from "./generateProductForm.js";
import { Console } from "@woowacourse/mission-utils";
function hasSameProductForm(productFormArr, productForm) {
  if (productFormArr.some((form) => form.name === productForm.name)) {
    return true;
  }
  return false;
}

function mergeProductForm(productForm1, productForm2) {
  let promotion1 = productForm1.promotion;
  let promotion2 = productForm2.promotion;
  let promotion = selectNotNull(promotion1, promotion2);

  const finalProductForm = {
    ...productForm1,
    ...productForm2,
    promotion,
  };

  return finalProductForm;
}

function addProductForm(productFormArr, productForm) {
  const updateArr = [...productFormArr, productForm];
  return updateArr;
}

function updateProductForm(productFormArr, productForm) {
  const sameProductForm = productFormArr.find(
    (form) => form.name === productForm.name
  );
  const finalProductForm = mergeProductForm(sameProductForm, productForm);
  const popArr = productFormArr.filter(
    (form) => form.name !== productForm.name
  );
  const updateArr = [...popArr, finalProductForm];
  return updateArr;
}

function addOrUpdateProductForm(productFormArr, productForm) {
  if (!hasSameProductForm(productFormArr, productForm)) {
    return addProductForm(productFormArr, productForm);
  }
  return updateProductForm(productFormArr, productForm);
}

export default function getProductFormsArr(productText) {
  let productFormArr = [];
  let i = 2;
  let line;

  while ((line = readLine(productText, i))) {
    let productForm = generateProductForm(line);
    productFormArr = addOrUpdateProductForm(productFormArr, productForm);

    i++;
  }
  return productFormArr;
}
