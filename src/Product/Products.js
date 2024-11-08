import { getProductFormArr } from "./generateProductForm";
import Product from "./Product";
export default class Products {
  #products;

  constructor(productsFormArr) {
    this.#products = this.#generateProducts(productsFormArr);
  }

  isProductExist(name) {
    return this.#products.some((product) => product.getName() === name);
  }

  getProduct(name) {
    if (this.isProductExist(name)) {
      return this.#products.find((product) => product.getName() === name);
    }
    return null;
  }

  #generateProducts(productsFormArr) {
    return productsFormArr.map((productForm) => new Product(productForm));
  }

  toString() {
    return this.#products.map((product) => product.toString());
  }
}
