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
  //프로모션 적용기간이 아닌데 일반재고로는 부족한 경우는 어떡하지..?? 프로모션 부터 차감..?
  isQuantityEnough(quantity) {
    return this.#normalQuantity + this.#promotionQuantity >= quantity;
  }

  isNormalQuantityEnough(number) {
    return this.#normalQuantity >= number;
  }

  isPromotionQuantityEnough(number) {
    return this.#promotionQuantity >= number;
  }
  //현재는 프로모션 기간이 지났으면 프로모션 재고 부터 소진하도록 설정
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
    if (this.#promotion && this.#promotion.isAvailable()) {
      return true;
    }
    return false;
  }

  //프로모션 적용안되는 개수
  getNonAppliedPromotionQuantity(quantity) {
    return quantity - this.getAppliedPromotionQuantity(quantity);
  }
  //프로모션 적용 날짜 지난경우, or 없는경우
  getAppliedPromotionQuantity(quantity) {
    if (!this.isPromotionAvailable()) {
      return 0;
    }

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
  //프로모션 적용 불가능한 경우
  getGiftQuantity(quantity) {
    if (!this.isPromotionAvailable()) {
      return 0;
    }

    const appliedPromotionQuantity = this.getAppliedPromotionQuantity(quantity);
    return this.#promotion.getGiftQuantity(appliedPromotionQuantity);
  }

  getTotalAmount(quantity) {
    return this.#price * quantity;
  }
  getName() {
    return this.#name;
  }

  quantityLabel(quantity) {
    if (quantity === 0) {
      return "재고 없음";
    }
    return `${quantity}개`;
  }

  getNonPromotionFormattedProduct() {
    return `- ${this.#name} ${this.#price}원 ${this.quantityLabel(
      this.#normalQuantity
    )}`;
  }

  getPromotionFormattedProduct() {
    const promotionInfo = `- ${this.#name} ${
      this.#price
    }원 ${this.quantityLabel(
      this.#promotionQuantity
    )} ${this.#promotion.getName()}`;
    const normalInfo = `- ${this.#name} ${this.#price}원 ${this.quantityLabel(
      this.#normalQuantity
    )}`;

    return `${promotionInfo}\n${normalInfo}`;
  }

  getFormattedProduct() {
    if (!this.#promotion) {
      return this.getNonPromotionFormattedProduct();
    }
    return this.getPromotionFormattedProduct();
  }

  toString() {
    return `${this.#name},${this.#price},${this.#normalQuantity},${
      this.#promotionQuantity
    },${this.#promotion.getName()}`;
  }
}
