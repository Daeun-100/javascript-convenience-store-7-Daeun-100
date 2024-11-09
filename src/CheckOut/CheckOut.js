import InputView from "../View/InputView.js";
import outputView from "../View/OutputView.js";
import { Console } from "@woowacourse/mission-utils";
import formatInput from "../utils/formatInput.js";
import { DISCOUNT_INFO } from "../Constants.js";
//input = "[콜라-10],[사이다-3]";
//formatInput=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]

export default class CheckOut {
  #selectedItems;
  #products;
  #discountInfo;
  #inputView;
  #outputView;

  constructor(Input, Products) {
    this.#selectedItems = formatInput(Input);
    this.#products = Products;
    this.#discountInfo = this.#geratedisCountInfo();

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
    for (const inputItem of this.#selectedItems) {
      await this.promoteProcessSingleItem(inputItem);
    }
    const yesOrNo = await this.#inputView.confirmAction("MEMBERSHIP_DISCOUNT");
    if (yesOrNo === "Y") {
      this.membershipDiscount();
    }
    this.reciept();
    this.#inputView.confirmAction("ADDITIONAL_PURCHASE");
  }

  //FIXME: 나중에
  validateQuantity() {
    if (!product.isQuantityEnough(inputItem.quantity)) {
      //validate 밖으로 빼기
      //[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.
      //재입력 받기
    }
  }

  async checkPurchaseWithoutPromotion(inputItem, product) {
    const name = product.getName();
    if (
      product.isPromotionAvailable() &&
      !product.isPromotionQuantityEnough(inputItem.quantity)
    ) {
      const yesOrNo = await this.#inputView.confirmAction(
        "PURCHASE_WITHOUT_PROMOTION",
        name,
        this.#discountInfo.nonAppliedPromotionQuantity[name]
      );
      return yesOrNo;
    }
  }

  async checkAdditionalGift(inputItem, product) {
    if (
      product.isPromotionAvailable() &&
      product.isPromotionQuantityEnough(inputItem.quantity) &&
      //추가로 받을 수 있을지
      product.isAdditionalGiftEligible(inputItem.quantity)
    ) {
      const yesOrNo = await this.#inputView.confirmAction(
        "ADDITIONAL_GIFT",
        product.getName()
      );
      return yesOrNo;
    }
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

  async checkAndUpdatePurchaseOptions(inputItem, product) {
    const purchaseConfirmation = await this.checkPurchaseWithoutPromotion(
      inputItem,
      product
    );
    if (purchaseConfirmation === "N") {
      this.updateQuantityWithoutPromotion(inputItem);
    }

    const giftConfirmation = await this.checkAdditionalGift(inputItem, product);
    if (giftConfirmation === "Y") {
      this.updateQuantityAdditionalGift(inputItem);
    }
  }

  //프로모션 적용 안되는 기간은 product에서 알아서 처리
  //inputItem = {name:콜라, quantity:10} // this.#selectedItems의 각 객체 요소
  async promoteProcessSingleItem(inputItem) {
    const product = this.#products.getProduct(inputItem.name);
    const name = product.getName();
    this.#discountInfo.nonAppliedPromotionQuantity[name] =
      product.getNonAppliedPromotionQuantity(inputItem.quantity);
    this.#discountInfo.giftQuantity[name] = product.getGiftQuantity(
      inputItem.quantity
    );

    await this.checkAndUpdatePurchaseOptions(inputItem, product);
    product.purchaseProduct(inputItem.quantity);
  }

  //프로모션 적용안된 상품의 총 금액
  getNonPromotionTotalAmount() {
    let nonPromotionTotalAmount = 0;
    this.#selectedItems.forEach((inputItem) => {
      const product = this.#products.getProduct(inputItem.name);
      const nonAppliedPromotionQuantity =
        this.#discountInfo.nonAppliedPromotionQuantity[inputItem.name];
      nonPromotionTotalAmount += product.getTotalAmount(
        nonAppliedPromotionQuantity
      );
    });
    return nonPromotionTotalAmount;
  }

  //멤버쉽 할인 적용
  membershipDiscount() {
    const nonPromotionTotalAmount = this.getNonPromotionTotalAmount();

    let disCountAmount = nonPromotionTotalAmount * 0.3;
    if (disCountAmount > 8000) {
      disCountAmount = 8000;
    }

    this.#discountInfo.membershipDiscount = disCountAmount;
    return disCountAmount;
  }

  getTotalAmount() {
    return this.#selectedItems.reduce((acc, inputItem) => {
      const product = this.#products.getProduct(inputItem.name);
      const Amount = product.getTotalAmount(inputItem.quantity);
      return acc + Amount;
    }, 0);
  }
  getPromotionDiscount() {
    return Object.keys(this.#discountInfo.giftQuantity).reduce((acc, name) => {
      const product = this.#products.getProduct(name);
      const giftQuantity = this.#discountInfo.giftQuantity[name];
      const Amount = product.getTotalAmount(giftQuantity);
      return acc + Amount;
    }, 0);
  }
  reciept() {
    // 총구매액: 구매한 상품의 총 수량과 총 금액
    const totalAmount = this.getTotalAmount();
    // 행사할인: 프로모션에 의해 할인된 금액
    const promotionDiscount = this.getPromotionDiscount();
    // 멤버십할인: 멤버십에 의해 추가로 할인된 금액
    const membershipDiscount = this.#discountInfo.membershipDiscount;
    // 내실돈: 최종 결제 금액
    const finalAmount = totalAmount - promotionDiscount - membershipDiscount;

    this.#outputView.printReceipt(
      this.#selectedItems,
      this.#discountInfo,
      totalAmount,
      promotionDiscount,
      membershipDiscount,
      finalAmount
    );
  }
}
