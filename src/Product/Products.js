import Product from "./Product.js";

export default class Products {
  #products;

  constructor(productsFormArr, promotions) {
    this.#products = this.#generateProducts(productsFormArr, promotions);
  }

  isProductExist(name) {
    return this.#products.some((product) => product.getName() === name);
  }

  getProduct(name) {
    return this.#products.find((product) => product.getName() === name);
  }

  #generateProducts(productsFormArr, promotions) {
    return productsFormArr.map((productForm) => {
      const promotion = promotions.map(productForm.promotion);
      const productData = { ...productForm, promotion };
      return new Product(productData);
    });
  }

  getFormattedProducts() {
    return this.#products.map((product) => product.getFormattedProduct());
  }

  toString() {
    return this.#products.map((product) => product.toString());
  }
}
