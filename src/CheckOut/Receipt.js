import DiscountCalculator from "./DiscountCalculator.js";
export default class Receipt {
  #selectedItems;
  #products;
  #discountInfo;
  #discountCalculator;
  constructor(selectedItems, products, discountInfo) {
    this.#selectedItems = selectedItems;
    this.#products = products;
    this.#discountInfo = discountInfo;

    this.#discountCalculator = new DiscountCalculator(
      this.#selectedItems,
      this.#products,
      this.#discountInfo
    );
  }

  getAllProductsInfo() {
    return this.#selectedItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      amount: this.#products
        .getProduct(item.name)
        .getTotalAmount(item.quantity),
    }));
  }

  getTotalCount() {
    return this.#selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  getReceiptDetails() {
    const totalAmount = this.#discountCalculator.getTotalAmount();
    const promotionDiscount = this.#discountCalculator.getPromotionDiscount();
    const membershipDiscount = this.#discountInfo.membershipDiscount;
    const allProductsInfo = this.getAllProductsInfo();
    const totalCount = this.getTotalCount();
    const finalAmount = totalAmount - promotionDiscount - membershipDiscount;
    return {
      allProductsInfo,
      discountInfo: this.#discountInfo,
      totalCount,
      totalAmount,
      promotionDiscount,
      membershipDiscount,
      finalAmount,
    };
  }
}
