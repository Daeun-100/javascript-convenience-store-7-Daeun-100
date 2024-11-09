import { Console } from "@woowacourse/mission-utils";
import { MESSAGES } from "../Constants.js";
import Validate from "../Validate.js";
import getProductFormsArr from "../Product/getProductsForm.js";

export default class InputView {
  #validate;
  constructor(products) {
    this.#validate = new Validate(products);
  }

  async readProductsInput() {
    let input;
    try {
      input = await Console.readLineAsync(
        "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n"
      );
      input = input.trim();
      this.#validate.productInputForm(input);
      this.#validate.isProductExist(input);
      this.#validate.isQuantityEnough(input);
    } catch (e) {
      Console.print(e.message);
      return this.readProductsInput();
    }
    return input;
  }

  async askYesOrNo(message) {
    let input;
    try {
      input = await Console.readLineAsync(message);
      this.#validate.YesOrNo(input);
    } catch (e) {
      Console.print(e.message);
      return this.askYesOrNo(message);
    }
    return input.trim().toUpperCase();
  }

  async confirmAction(type, productName = "", quantity = "") {
    let message;

    if (typeof MESSAGES[type] === "function") {
      message = MESSAGES[type](productName, quantity);
    } else {
      message = MESSAGES[type];
    }

    return await this.askYesOrNo(message);
  }
}
