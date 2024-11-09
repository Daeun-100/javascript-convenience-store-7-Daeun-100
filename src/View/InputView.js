import { Console } from "@woowacourse/mission-utils";

export default class InputView {
  async readProductsInput() {
    const input = await Console.readLineAsync(
      "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n"
    );
    return input;
  }

  async askYesOrNo(message) {
    const input = await Console.readLineAsync(message);
    return input.trim().toUpperCase();
  }

  async confirmAction(type, productName = "", quantity = "") {
    //상수로 빼기
    const MESSAGES = {
      PURCHASE_WITHOUT_PROMOTION: `현재 ${productName} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
      ADDITIONAL_GIFT: `현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
      MEMBERSHIP_DISCOUNT: "멤버십 할인을 받으시겠습니까? (Y/N)\n",
      ADDITIONAL_PURCHASE:
        "감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n",
    };
    const message = MESSAGES[type] || "잘못된 요청입니다.\n";
    return await this.askYesOrNo(MESSAGES[type]);
  }
}
