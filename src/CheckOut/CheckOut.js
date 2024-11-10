import InputView from "../View/InputView.js";
import outputView from "../View/OutputView.js";
import formatInput from "../utils/formatInput.js";
import { DISCOUNT_INFO } from "../Constants.js";
import CheckoutManager from "./CheckoutManager.js";
import DiscountCalculator from "./DiscountCalculator.js";

export default class CheckOut {
  #selectedItems;
  #products;
  #discountInfo;
  #checkoutManager;
  #discountCalculator;
  #inputView;
  #outputView;

  constructor(Input, Products) {
    //input = "[콜라-10],[사이다-3]";
    //formatInput=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]
    this.#selectedItems = formatInput(Input);
    this.#products = Products;
    this.#discountInfo = this.#geratedisCountInfo();

    this.#checkoutManager = new CheckoutManager(
      this.#selectedItems,
      this.#products,
      this.#discountInfo
    );
    this.#discountCalculator = new DiscountCalculator(
      this.#selectedItems,
      this.#products,
      this.#discountInfo
    );

    this.#inputView = new InputView();
    this.#outputView = new outputView();
  }

  #geratedisCountInfo() {
    const discountInfo = { ...DISCOUNT_INFO };

    this.#selectedItems.forEach((inputItem) => {
      discountInfo.giftQuantity[inputItem.name] = 0;
      discountInfo.nonAppliedPromotionQuantity[inputItem.name] = 0;
    });

    return discountInfo;
  }

  async checkout() {
    await this.#checkoutManager.processSelectedItems();
    await this.applyMembershipDiscount();
    this.reciept();
    return await this.checkForAdditionalPurchase();
  }

  async applyMembershipDiscount() {
    const hasMembershipDiscount = await this.#inputView.confirmAction(
      "MEMBERSHIP_DISCOUNT"
    );
    if (hasMembershipDiscount === "Y") {
      this.#discountInfo.membershipDiscount =
        this.#discountCalculator.getMembershipDiscount();
    }
  }

  reciept() {
    const totalAmount = this.#discountCalculator.getTotalAmount();
    const promotionDiscount = this.#discountCalculator.getPromotionDiscount();
    const membershipDiscount = this.#discountInfo.membershipDiscount;

    this.#outputView.printReceipt({
      products: this.#products,
      //흠..여기서 가공해서 넘겨줘야할까?
      selectedItem: this.#selectedItems,
      discountInfo: this.#discountInfo,
      totalAmount,
      promotionDiscount,
      membershipDiscount,
    });
  }

  async checkForAdditionalPurchase() {
    const hasAdditionalPurchase = await this.#inputView.confirmAction(
      "ADDITIONAL_PURCHASE"
    );
    return hasAdditionalPurchase;
  }
}
