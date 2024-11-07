export default class Product {
  #name;
  #price;
  #normalStock;
  #promotionStock;
  #promotion;

  constructor(name, price, normalStock, promotionStock, promotion) {
    //name과 price, promotion을 여기서 정의해야 할까?
    this.#name = name;
    this.#price = price;
    this.#normalStock = normalStock;
    this.#promotionStock = promotionStock;
    this.#promotion = promotion;
  }

  isPromotionStockAvailable(number) {
    return this.#promotionStock >= number;
  }

  isNormalStockAvailable(number) {
    return this.#normalStock >= number;
  }

  substractPromotionStock(number) {
    this.#promotionStock -= number;
  }

  substractNormalStock(number) {
    this.#normalStock -= number;
  }
}
