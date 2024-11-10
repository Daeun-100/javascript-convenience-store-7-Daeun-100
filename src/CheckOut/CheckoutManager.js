import InputView from "../View/InputView.js";
import DiscountCalculator from "./DiscountCalculator.js";
import PromotionManager from "./PromotionManager.js";
export default class CheckoutManager {
  #selectedItems;
  #products;
  #promotionManager;
  #discountInfo;
  #inputView;

  constructor(selectedItems, products, discountInfo) {
    this.#selectedItems = selectedItems;
    this.#products = products;
    this.#discountInfo = discountInfo;

    this.#promotionManager = new PromotionManager(this.#discountInfo);
    this.#inputView = new InputView(this.#products);
  }

  async processSelectedItems() {
    for (const inputItem of this.#selectedItems) {
      const product = this.#products.getProduct(inputItem.name);
      await this.processSingleItem(inputItem, product);
    }
  }

  async processSingleItem(inputItem, product) {
    this.#promotionManager.updateDiscountInfo(inputItem, product);
    await this.checkAndUpdatePurchaseOptions(inputItem, product);
    product.purchaseProduct(inputItem.quantity);
  }

  async checkAndUpdatePurchaseOptions(inputItem, product) {
    await this.handlePurchaseWithoutPromotion(inputItem, product);
    await this.handleAdditionalGift(inputItem, product);
  }

  async handlePurchaseWithoutPromotion(inputItem, product) {
    const purchaseConfirmation = await this.askPurchaseWithoutPromotion(
      inputItem,
      product
    );
    if (purchaseConfirmation === "N") {
      this.#promotionManager.updateQuantityWithoutPromotion(inputItem);
    }
  }

  async askPurchaseWithoutPromotion(inputItem, product) {
    const name = product.getName();
    if (
      this.#promotionManager.checkPurchaseWithoutPromotion(inputItem, product)
    ) {
      const yesOrNo = await this.#inputView.confirmAction(
        "PURCHASE_WITHOUT_PROMOTION",
        name,
        this.#discountInfo.nonAppliedPromotionQuantity[name]
      );
      return yesOrNo;
    }
  }

  async handleAdditionalGift(inputItem, product) {
    const giftConfirmation = await this.askAdditionalGift(inputItem, product);
    if (giftConfirmation === "Y") {
      this.#promotionManager.updateQuantityAdditionalGift(inputItem);
    }
  }

  async askAdditionalGift(inputItem, product) {
    if (this.#promotionManager.checkAdditionalGift(inputItem, product)) {
      const yesOrNo = await this.#inputView.confirmAction(
        "ADDITIONAL_GIFT",
        product.getName()
      );
      return yesOrNo;
    }
  }
}
