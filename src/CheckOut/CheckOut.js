import InputView from "../View/InputView.js";
import outputView from "../View/OutputView.js";
import { Console } from "@woowacourse/mission-utils";
//input = "[콜라-10],[사이다-3]";
//formatInput=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]
//selectedItems = formatInput
export default class CheckOut {
  #selectedItems;
  #products;
  #discountInfo;
  #inputView;
  #outputView;
  constructor(formatInput, Products) {
    this.#selectedItems = formatInput;
    this.#products = Products;
    this.#discountInfo = {
      //{콜라:0,사이다:0}
      giftQuantity: {},
      nonAppliedPromotionQuantity: {},
      membershipDiscount: 0,
    };

    this.#inputView = new InputView();
    this.#outputView = new outputView();
  }

  async checkout() {
    Console.print(this.#selectedItems);
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

  validateQuantity() {
    if (!product.isQuantityEnough(inputItem.quantity)) {
      //validate 밖으로 빼기
      //[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.
      //재입력 받기
    }
  }
  //손님이 원하는 물건 이름과 개수를 넘겨줌 - selectedItems
  //이름으로 제품을 찾음
  //제품의 재고 확인
  //재고가 충분하면 재고를 줄임
  //하나의 inputitem에 대해서만 처리
  async promoteProcessSingleItem(inputItem) {
    const product = this.#products.getProduct(inputItem.name);
    const name = product.getName();
    // TODO: 프로모션이 적용 안되는 기간이면 어디서 처리하지? 일단 checktout에서 처리해보기
    //프로모션이 없거나 기간이 지났으면 프로모션 적용 아예 안됨
    let nonAppliedPromotionQuantity;
    let giftQuantity;
    if (product.isPromotionAvailable(new Date("2024-11-09"))) {
      //프로모션 적용 안되는 개수 저장
      Console.print("프로모션 적용 가능");
      nonAppliedPromotionQuantity = product.getNonAppliedPromotionQuantity(
        inputItem.quantity
      );
      //증정하는 제품 수량 저장
      giftQuantity = product.getGiftQuantity(inputItem.quantity);
    } else {
      nonAppliedPromotionQuantity = inputItem.quantity;
      giftQuantity = 0;
    }
    this.#discountInfo.nonAppliedPromotionQuantity[name] =
      nonAppliedPromotionQuantity;
    this.#discountInfo.giftQuantity[name] = giftQuantity;

    if (
      product.isPromotionAvailable(new Date("2024-11-09")) &&
      !product.isPromotionQuantityEnough(inputItem.quantity)
    ) {
      //현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다.
      //그래도 구매하시겠습니까? (Y/N)
      const yesOrNo = await this.#inputView.confirmAction(
        "PURCHASE_WITHOUT_PROMOTION",
        name,
        nonAppliedPromotionQuantity
      );
      // 차감해야하는 일반 상품 수량 알아야함 -> Product에서 알아서 처리
      // 프로모션 할인이 적용안되는 수량 알아야함 -> Product에서 알아서 처리

      //N일때 프로모션 가능 수량만 구매하도록 처리
      if (yesOrNo === "N") {
        //프로모션 할인이 적용안되는 수량만큼 전체 quantity 감소
        inputItem.quantity -= nonAppliedPromotionQuantity;
        // 이 경우 프로모션이 적용 안되는 수량은 없음
        this.#discountInfo.nonAppliedPromotionQuantity[name] = 0;
      }
    }
    //고민되는게 프로모션이 적용가능한 충분한 재고가 있지만 충족을 못할때는 어떡하지?
    //그냥 구매해?
    if (
      product.isPromotionAvailable(new Date("2024-11-09")) &&
      product.isPromotionQuantityEnough(inputItem.quantity) &&
      //추가로 받을 수 있을지
      product.isAdditionalGiftEligible(inputItem.quantity)
    ) {
      //현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다.
      //추가하시겠습니까? (Y/N)
      //Y일때 추가로 구매하도록 처리
      const yesOrNo = await this.#inputView.confirmAction(
        "ADDITIONAL_GIFT",
        name
      );
      if (yesOrNo === "Y") {
        inputItem.quantity++;
        //추가로 구매한 수량만큼 giftQuantity 증가
        this.#discountInfo.giftQuantity[name] += 1;
        //이 경우 프로모션이 적용 안되는 수량은 없음
        this.#discountInfo.nonAppliedPromotionQuantity[name] = 0;
      }
    }
    //purchase 로직도 바꿔야함 왜냐? 프로모션재고갸 있지만 기간이 지났을때도 있음
    product.purchaseProduct(inputItem.quantity);
  }
  //멤버쉽 할인 적용
  //selectedItems=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]
  membershipDiscount() {
    let nonPromotionTotalAmount = 0;
    this.#selectedItems.forEach((inputItem) => {
      const product = this.#products.getProduct(inputItem.name);
      const nonAppliedPromotionQuantity =
        this.#discountInfo.nonAppliedPromotionQuantity[inputItem.name];
      nonPromotionTotalAmount += product.getTotalAmount(
        nonAppliedPromotionQuantity
      );
    });
    let disCountAmount = nonPromotionTotalAmount * 0.3;
    if (disCountAmount > 8000) {
      disCountAmount = 8000;
    }
    this.#discountInfo.membershipDiscount = disCountAmount;
    return disCountAmount;
  }

  reciept() {
    // 총구매액: 구매한 상품의 총 수량과 총 금액
    const totalAmount = this.#selectedItems.reduce((acc, inputItem) => {
      const product = this.#products.getProduct(inputItem.name);
      const Amount = product.getTotalAmount(inputItem.quantity);
      return acc + Amount;
    }, 0);
    // 행사할인: 프로모션에 의해 할인된 금액
    const promotionDiscount = Object.keys(
      this.#discountInfo.giftQuantity
    ).reduce((acc, name) => {
      const product = this.#products.getProduct(name);
      const giftQuantity = this.#discountInfo.giftQuantity[name];
      const Amount = product.getTotalAmount(giftQuantity);
      return acc + Amount;
    }, 0);
    // 멤버십할인: 멤버십에 의해 추가로 할인된 금액
    const membershipDiscount = this.membershipDiscount();
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
