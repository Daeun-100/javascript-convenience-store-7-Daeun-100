import { Console } from "@woowacourse/mission-utils";
import { MESSAGES } from "../Constants.js";
import Validate from "../Validate.js";

export default class InputView {
  #validate;
  constructor(products) {
    this.#validate = new Validate(products);
  }

  validateInput(input) {
    this.#validate.productInputForm(input);
    this.#validate.isProductExist(input);
    this.#validate.isQuantityEnough(input);
  }

  handleError(e, callback) {
    Console.print(e.message);
    return callback();
  }

  async readProductsInput() {
    try {
      let input = await Console.readLineAsync(
        "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n"
      );
      Console.print("");
      input = input.trim();
      this.validateInput(input);
      return input;
    } catch (e) {
      return this.handleError(e, this.readProductsInput.bind(this));
    }
  }

  async askYesOrNo(message) {
    let input;
    try {
      input = await Console.readLineAsync(message);
      Console.print("");
      this.#validate.YesOrNo(input);
      return input.trim();
    } catch (e) {
      return this.handleError(e, this.askYesOrNo.bind(this, message));
    }
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
