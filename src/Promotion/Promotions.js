import Promotion from "./Promotion.js";

export default class Promotions {
  #promotions;
  constructor(promotionsArr) {
    this.#promotions = this.#generatePromotions(promotionsArr);
  }

  #generatePromotions(promotionsArr) {
    return promotionsArr.map((promotion) => new Promotion(promotion));
  }

  toString() {
    return this.#promotions.map((promotion) => promotion.toString());
  }

  map(name) {
    if (name === null) {
      return null;
    }
    return this.#promotions.find((promotion) => promotion.getName() === name);
  }
}
