import { getProductFormArr } from "./generateProductForm";
import Product from "./Product";
export default class Products {
  #products;

  constructor(productsFormArr) {
    this.#products = this.generateProducts(productsFormArr);
  }

  addProduct(product) {
    this.#products.push(product);
  }

  isProductExist(name) {
    return this.#products.some((product) => product.getName() === name);
  }

  generateProducts(productsFormArr) {
    return productsFormArr.map((productForm) => new Product(productForm));
  }

  toString() {
    return this.#products.map((product) => product.toString());
  }
}
