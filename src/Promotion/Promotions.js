import Promotion from "./Promotion.js";
import { Console } from "@woowacourse/mission-utils";
export default class Promotions {
  #promotions;
  constructor(promotionsArr) {
    this.#promotions = this.generatePromotions(promotionsArr);
  }
  generatePromotions(promotionsArr) {
    return promotionsArr.map((promotion) => new Promotion(promotion));
  }

  toString() {
    return this.#promotions.map((promotion) => promotion.toString());
  }
}
