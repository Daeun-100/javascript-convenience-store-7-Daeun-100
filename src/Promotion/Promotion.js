export default class Promotion {
  #name;
  #buy;
  #get;
  #start_date;
  #end_date;

  constructor({ name, buy, get, start_date, end_date }) {
    this.#name = name;
    this.#buy = buy;
    this.#get = get;
    this.#start_date = start_date;
    this.#end_date = end_date;
  }

  isAvailable(date) {
    return (
      new Date(this.#start_date) <= date && date <= new Date(this.#end_date)
    );
  }

  getGiftQuantity(quantity) {
    return this.#get * Math.floor(quantity / (this.#buy + this.#get));
  }

  isAdditionalGiftEligible(quantity) {
    const rest = quantity % (this.#buy + this.#get);
    return rest === this.#buy;
  }

  getSetQuantity() {
    return this.#buy + this.#get;
  }

  getName() {
    return this.#name;
  }

  toString() {
    return `${this.#name},buy:${this.#buy},get:${this.#get},${
      this.#start_date
    },${this.#end_date}`;
  }
}
