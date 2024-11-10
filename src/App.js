import OutputView from "./View/OutputView.js";
import InputView from "./View/InputView.js";
import Products from "./Product/Products.js";
import Promotions from "./Promotion/Promotions.js";
import CheckOut from "./CheckOut/CheckOut.js";
import FileHandler from "./FileHandler.js";
import getProductFormsArr from "./Product/getProductsForm.js";
import getPromotionsArr from "./Promotion/getPromotionsArr.js";
import formatInput from "./utils/formatInput.js";

class App {
  #fileHandler;
  #outputView;
  #inputView;
  constructor() {
    this.#fileHandler = new FileHandler();
    this.#outputView = new OutputView();
  }

  loadFiles() {
    const productsText = this.#fileHandler.readTextFile("./public/products.md");
    const promotionsText = this.#fileHandler.readTextFile(
      "./public/promotions.md"
    );
    return { productsText, promotionsText };
  }

  getProducts() {
    const { productsText, promotionsText } = this.loadFiles();

    const productsFormsArr = getProductFormsArr(productsText);
    const promotionsArr = getPromotionsArr(promotionsText);
    const promotions = new Promotions(promotionsArr);
    const products = new Products(productsFormsArr, promotions);

    return products;
  }

  async executePurchase(products) {
    this.#outputView.printGreetings();
    this.#outputView.printProducts(products);

    const input = await this.#inputView.readProductsInput();

    const selectedItems = formatInput(input);
    const checkOut = new CheckOut(selectedItems, products);
    return await checkOut.checkout();
  }

  async executePurchaseLoop(products) {
    let hasAdditionalPurchase;
    do {
      hasAdditionalPurchase = await this.executePurchase(products);
    } while (hasAdditionalPurchase === "Y");
  }

  saveUpdatedProducts(products) {
    const fileHandler = new FileHandler();
    const updatedProductsText = products.getTextProducts();
    fileHandler.writeTextFile("./public/products.md", updatedProductsText);
  }

  async run() {
    const products = this.getProducts();
    this.#inputView = new InputView(products);
    await this.executePurchaseLoop(products);
    this.saveUpdatedProducts(products);
  }
}

export default App;
