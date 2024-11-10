import InputView from "../View/InputView.js";
import outputView from "../View/OutputView.js";
import { DISCOUNT_INFO } from "../Constants.js";
import CheckoutManager from "./CheckoutManager.js";
import DiscountCalculator from "./DiscountCalculator.js";
import Receipt from "./receipt.js";

export default class CheckOut {
  #selectedItems;
  #products;
  #discountInfo;
  #checkoutManager;
  #discountCalculator;
  #receipt;
  #inputView;
  #outputView;

  constructor(selectedItem, products) {
    //input = "[콜라-10],[사이다-3]";
    //formatInput=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]
    this.#selectedItems = selectedItem;
    this.#products = products;
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
    this.#receipt = new Receipt(
      this.#selectedItems,
      this.#products,
      this.#discountInfo
    );

    this.#inputView = new InputView(this.#products);
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
    this.receipt();

    const hasAdditionalPurchase = await this.checkForAdditionalPurchase();
    return hasAdditionalPurchase;
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

  receipt() {
    const receiptDetails = this.#receipt.getReceiptDetails();
    this.#outputView.printReceipt(receiptDetails);
  }

  async checkForAdditionalPurchase() {
    const hasAdditionalPurchase = await this.#inputView.confirmAction(
      "ADDITIONAL_PURCHASE"
    );
    return hasAdditionalPurchase;
  }
}
