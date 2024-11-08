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
    this.#name = name;
    this.#price = price;
    this.#normalQuantity = normalQuantity;
    this.#promotionQuantity = promotionQuantity;
    this.#promotion = promotion;
  }

  isNormalQuantityEnough(number) {
    return this.#normalQuantity >= number;
  }

  isPromotionQuantityEnough(number) {
    return this.#promotionQuantity >= number;
  }

  purchaseProduct(quantity) {
    let restQuantity = quantity;
    if (this.#promotionQuantity >= quantity) {
      this.substractPromotionQuantity(quantity);
      return;
    }
    restQuantity = quantity - this.#promotionQuantity;
    this.substractPromotionQuantity(this.#promotionQuantity);
    this.substractNormalQuantity(restQuantity);
  }

  substractNormalQuantity(number) {
    this.#normalQuantity -= number;
  }

  substractPromotionQuantity(number) {
    this.#promotionQuantity -= number;
  }

  isQuantityEnough(quantity) {
    return this.#normalQuantity + this.#promotionQuantity >= quantity;
  }

  isPromotionQuantityEnough(quantity) {
    return this.#promotionQuantity >= quantity;
  }

  isPromotionAvailable() {
    if (this.#promotion && this.#promotion.isPromotionAvailable()) {
      return true;
    }
    return false;
  }

  //프로모션 적용안되는 개수
  getNonPromotionQuantity(quantity) {
    const setQuantity = this.#promotion.getSetQuantity();
    const promotionQuantity =
      setQuantity * Math.floor(this.#promotionQuantity / setQuantity);
    return quantity - promotionQuantity;
  }

  //프로모션 상품 수량을 적게 가져온경우
  isAdditionalGiftEligible(quantity) {
    //프로모션 상품 수량이 0인 경우 불가능
    if (this.#promotionQuantity === 0) {
      return false;
    }
    return this.#promotion.isAdditionalGiftEligible(quantity);
  }

  getGiftQuantity(quantity) {
    return this.#promotion.getGiftQuantity(quantity);
  }

  getName() {
    return this.#name;
  }

  getPromotionQuantity() {
    return this.#promotionQuantity;
  }

  toString() {
    return `${this.#name},${this.#price},${this.#normalQuantity},${
      this.#promotionQuantity
    },${this.#promotion.getName()}`;
  }
}
