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
    this.#start_date = new Date(start_date);
    this.#end_date = new Date(end_date);
  }

  isAvailable(date) {
    return this.#start_date <= date && date <= this.#end_date;
  }

  buyNgetM(buy, get) {
    return { buy: this.#buy, get: this.#get };
  }
}
