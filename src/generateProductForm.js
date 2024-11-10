import lineToArray from "./lineToArray.js";

function chooseQuantityType(promotion) {
  if (promotion === null) {
    return "normalQuantity";
  }
  return "promotionQuantity";
}

function promotionToNull(string) {
  if (string === "null") {
    return null;
  }
  return string;
}
/*line = "비타민워터,1000,5,반짝할인";
  productForm = {
    name: "비타민워터",
    price: 1000,
    promotionQuantity: 5,
    promotion: "반짝할인",
  } */

export default function generateProductForm(line) {
  const [name, price, quantity, promotionString] = lineToArray(line);
  const promotion = promotionToNull(promotionString);
  const quantityType = chooseQuantityType(promotion);

  return {
    name,
    price: Number(price),
    [quantityType]: Number(quantity),
    promotion,
  };
}
