import { Console } from "@woowacourse/mission-utils";
import formatInput from "./utils/formatInput.js";
export default class Validate {
  #products;

  constructor(products) {
    this.#products = products;
  }

  YesOrNo(input) {
    if (
      input.trim().toUpperCase() !== "Y" &&
      input.trim().toUpperCase() !== "N"
    ) {
      throw new Error("[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.");
    }
  }

  productInputForm(input) {
    const regx = /^\[([가-힣]+)-(\d+)\](,\[([가-힣]+)-(\d+)\])*$/;
    if (!regx.test(input)) {
      throw new Error(
        "[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요."
      );
    }
  }

  //상품에 대한 확인, 어디서 호출할 것인가?
  isProductExist(input) {
    const formattedInput = formatInput(input);
    const isProductExist = formattedInput.every((inputItem) =>
      this.#products.isProductExist(inputItem.name)
    );
    if (!isProductExist) {
      throw new Error(`[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`);
    }
  }

  checkQuantity(formattedInput) {
    return formattedInput.every((inputItem) =>
      this.#products
        .getProduct(inputItem.name)
        .isQuantityEnough(inputItem.quantity)
    );
  }

  isQuantityEnough(input) {
    const formattedInput = formatInput(input);
    const isQuantityEnough = this.checkQuantity(formattedInput);
    if (!isQuantityEnough) {
      throw new Error(
        `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
      );
    }
  }
}
