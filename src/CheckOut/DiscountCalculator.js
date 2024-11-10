export default class DiscountCalculator {
  #selectedItems;
  #products;
  #discountInfo;
  constructor(selectedItems, products, discountInfo) {
    this.#selectedItems = selectedItems;
    this.#products = products;
    this.#discountInfo = discountInfo;
  }

  getNonPromotionTotalAmount() {
    return this.#selectedItems.reduce((total, item) => {
      const product = this.#products.getProduct(item.name);
      const nonAppliedPromotionQuantity =
        this.#discountInfo.nonAppliedPromotionQuantity[item.name];
      return total + product.getTotalAmount(nonAppliedPromotionQuantity);
    }, 0);
  }

  getMembershipDiscount() {
    const nonPromotionTotal = this.getNonPromotionTotalAmount();
    return Math.min(nonPromotionTotal * 0.3, 8000); // 멤버십 할인 최대값 8000원
  }

  getTotalAmount() {
    return this.#selectedItems.reduce((total, item) => {
      const product = this.#products.getProduct(item.name);
      return total + product.getTotalAmount(item.quantity);
    }, 0);
  }

  getPromotionDiscount() {
    return Object.keys(this.#discountInfo.giftQuantity).reduce(
      (total, name) => {
        const product = this.#products.getProduct(name);
        return (
          total + product.getTotalAmount(this.#discountInfo.giftQuantity[name])
        );
      },
      0
    );
  }
}
