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

  buyNgetM(buy, get) {
    return { buy: this.#buy, get: this.#get };
  }

  toString() {
    return `${this.#name},buy:${this.#buy},get:${this.#get},${
      this.#start_date
    },${this.#end_date}`;
  }
}
