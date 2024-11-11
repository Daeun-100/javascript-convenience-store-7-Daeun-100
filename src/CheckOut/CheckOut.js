import InputView from "../View/InputView.js";
import outputView from "../View/OutputView.js";
import formatInput from "../utils/formatInput.js";
import { DISCOUNT_INFO } from "../Constants.js";
import CheckoutManager from "./CheckoutManager.js";
import DiscountCalculator from "./DiscountCalculator.js";
import Receipt from "./Receipt.js";
import { Console } from "@woowacourse/mission-utils";

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
    this.#discountInfo = this.#generatedisCountInfo();

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

  #generatedisCountInfo() {
    const discountInfo = JSON.parse(JSON.stringify(DISCOUNT_INFO));

    this.#selectedItems.forEach((inputItem) => {
      discountInfo.giftQuantity[inputItem.name] = 0;
      discountInfo.nonAppliedPromotionQuantity[inputItem.name] = 0;
    });

    return discountInfo;
  }

  async checkout() {
    await this.#checkoutManager.processSelectedItems();
    const allItemsQuantityZero = this.#selectedItems.every(
      (item) => item.quantity === 0
    );

    if (!allItemsQuantityZero) {
      await this.applyMembershipDiscount();
      this.receipt();
    } else {
      Console.print("결제할 상품이 없습니다.\n");
    }

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
