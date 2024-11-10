export default class PromotionManager {
  #discountInfo;

  constructor(discountInfo) {
    this.#discountInfo = discountInfo;
  }

  checkPurchaseWithoutPromotion(inputItem, product) {
    return (
      product.isPromotionAvailable() &&
      !product.isPromotionQuantityEnough(inputItem.quantity)
    );
  }

  checkAdditionalGift(inputItem, product) {
    return (
      product.isPromotionAvailable() &&
      product.isPromotionQuantityEnough(inputItem.quantity) &&
      //추가로 받을 수 있을지
      product.isAdditionalGiftEligible(inputItem.quantity)
    );
  }

  updateDiscountInfo(inputItem, product) {
    const name = product.getName();
    this.#discountInfo.nonAppliedPromotionQuantity[name] =
      product.getNonAppliedPromotionQuantity(inputItem.quantity);
    this.#discountInfo.giftQuantity[name] = product.getGiftQuantity(
      inputItem.quantity
    );
  }

  updateQuantityWithoutPromotion(inputItem) {
    const name = inputItem.name;
    inputItem.quantity -= this.#discountInfo.nonAppliedPromotionQuantity[name];
    this.#discountInfo.nonAppliedPromotionQuantity[name] = 0;
  }

  updateQuantityAdditionalGift(inputItem) {
    const name = inputItem.name;
    inputItem.quantity += 1;
    this.#discountInfo.giftQuantity[name] += 1;
    this.#discountInfo.nonAppliedPromotionQuantity[name] = 0;
  }
}
