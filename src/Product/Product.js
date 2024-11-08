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

  isQuantityEnough(quantity) {
    return this.#normalQuantity + this.#promotionQuantity >= quantity;
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

  isPromotionAvailable() {
    if (this.#promotion && this.#promotion.isPromotionAvailable()) {
      return true;
    }
    return false;
  }

  //프로모션 적용안되는 개수
  getNonAppliedPromotionQuantity(quantity) {
    return quantity - this.getAppliedPromotionQuantity(quantity);
  }

  getAppliedPromotionQuantity(quantity) {
    const setQuantity = this.#promotion.getSetQuantity();
    let tempQuantity = quantity;
    if (this.#promotionQuantity < quantity) {
      tempQuantity = this.#promotionQuantity;
    }
    const appliedPromotionQuantity =
      setQuantity * Math.floor(tempQuantity / setQuantity);
    return appliedPromotionQuantity;
  }
  //프로모션 상품 수량을 적게 가져온경우
  isAdditionalGiftEligible(quantity) {
    //줄 수 있는 프로모션 수량이 없는 경우
    if (this.#promotionQuantity - quantity <= 0) {
      return false;
    }
    return this.#promotion.isAdditionalGiftEligible(quantity);
  }

  getGiftQuantity() {
    const appliedPromotionQuantity = this.getAppliedPromotionQuantity();
    return this.#promotion.getGiftQuantity(appliedPromotionQuantity);
  }

  getTotalAmount(quantity) {
    return this.#price * quantity;
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
