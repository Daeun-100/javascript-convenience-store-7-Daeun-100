import lineToArray from "../utils/lineToArray";

//input = "[콜라-10],[사이다-3]";
//formatInput=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]
//selectedItems = formatInput
export default class CheckOut {
  #selectedItems;
  #Products;
  #discountInfo;
  constructor(formatInput, Products) {
    this.#selectedItems = formatInput;
    this.#Products = Products;
    this.#discountInfo = {
      //{콜라:0,사이다:0}
      giftQuantity: {},
      nonPromotionQuantity: {},
      membershipDiscount: 0,
    };
  }
  //흠...확인하는건 이미 있는거 사용하고 로직에 관련된 함수만 남겨야할듯?

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
  promoteProcessSingleItem(inputItem) {
    const product = this.#Products.getProduct(inputItem.name);
    const name = product.getName();
    const nonPromotionQuantity = product.getNonPromotionQuantity(
      inputItem.quantity
    );
    //프로모션 적용 안되는 개수 저장
    this.#discountInfo.nonPromotionQuantity[name] = nonPromotionQuantity;
    if (
      product.isPromotionAvailable() &&
      !product.isPromotionQuantityEnough(inputItem.quantity)
    ) {
      //현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다.
      // 차감해야하는 일반 상품 수량 알아야함 -> Product에서 알아서 처리
      // 프로모션 할인이 적용안되는 수량 알아야함 -> Product에서 알아서 처리
      const giftQuantity = product.getGiftQuantity(
        quantity - nonPromotionQuantity
      );
      this.#discountInfo.giftQuantity[name] = giftQuantity;
      //그래도 구매하시겠습니까? (Y/N)
      //N일때 프로모션 가능 수량만 구매하도록 처리
      if (N) {
        inputItem.quantity = quantity - nonPromotionQuantity;
      }
    }
    if (
      product.isPromotionAvailable() &&
      product.isPromotionQuantityEnough(inputItem.quantity) &&
      //추가로 받을 수 있을지
      product.isAdditionalGiftEligible(inputItem.quantity)
    ) {
      const giftQuantity = product.getGiftQuantity(inputItem.quantity);
      this.#discountInfo.giftQuantity[name] = giftQuantity;

      //현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다.
      //추가하시겠습니까? (Y/N)
      //Y일때 추가로 구매하도록 처리
      if (Y) {
        inputItem.quantity++;
        //추가로 구매한 수량만큼 giftQuantity 증가
        this.#discountInfo.giftQuantity[name]++;
        //이 경우 프로모션이 적용 안되는 수량은 없음
        this.#discountInfo.nonPromotionQuantity[name] = 0;
      }
    }
    product.purchaseProduct(inputItem.quantity);
  }
  //멤버쉽 할인 적용
  //selectedItems=[{name:콜라, quantity:10}, {name:사이다, quantity:3}]
  membershipDiscount() {
    let nonPromotionTotalAmount = 0;
    this.#selectedItems.forEach((inputItem) => {
      const product = this.#Products.getProduct(inputItem.name);
      const nonPromotionQuantity =
        this.#discountInfo.nonPromotionQuantity[inputItem.name];
      nonPromotionTotalAmount += product.getTotalAmount(nonPromotionQuantity);
    });
    let disCountAmount = nonPromotionTotalAmount * 0.3;
    if (disCountAmount > 8000) {
      disCountAmount = 8000;
    }
    this.#discountInfo.membershipDiscount = disCountAmount;
    return disCountAmount;
  }
}
