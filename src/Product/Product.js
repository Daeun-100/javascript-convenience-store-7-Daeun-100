export default class Product {
  #name;
  #price;
  #normalQuantity;
  #promotionQuantity;
  #promotion;

  constructor({
    name,
    price,
    normalQuantity = 0,
    promotionQuantity = 0,
    promotion = null,
  }) {
    //name과 price, promotion을 여기서 정의해야 할까?
    this.#name = name;
    this.#price = price;
    this.#normalQuantity = normalQuantity;
    this.#promotionQuantity = promotionQuantity;
    this.#promotion = promotion;
  }

  isNormalQuantityAvailable(number) {
    return this.#normalQuantity >= number;
  }

  isPromotionQuantityAvailable(number) {
    return this.#promotionQuantity >= number;
  }

  substractNormalQuantity(number) {
    this.#normalQuantity -= number;
  }

  substractPromotionQuantity(number) {
    this.#promotionQuantity -= number;
  }
  getName() {
    return this.#name;
  }

  toString() {
    return `${this.#name},${this.#price},${this.#normalQuantity},${
      this.#promotionQuantity
    },${this.#promotion.getName()}`;
  }
}
