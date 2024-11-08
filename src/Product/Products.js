export default class Products {
  #products;

  constructor() {
    this.#products = [];
  }

  addProduct(product) {
    this.#products.push(product);
  }

  isProductExist(name) {
    return this.#products.some((product) => product.getName() === name);
  }
}
