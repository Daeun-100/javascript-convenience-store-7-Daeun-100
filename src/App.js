import OutputView from "./View/OutputView.js";
import InputView from "./View/InputView.js";
import Products from "./Product/Products.js";
import Promotions from "./Promotion/Promotions.js";
import CheckOut from "./CheckOut/CheckOut.js";
import { Console } from "@woowacourse/mission-utils";
class App {
  products;
  constructor() {
    this.products = new Products(
      [
        {
          name: "콜라",
          price: 1000,
          normalQuantity: 10,
          promotionQuantity: 10,
          promotion: "반짝할인",
        },
        {
          name: "사이다",
          price: 900,
          normalQuantity: 4,
          promotion: null,
        },
      ],
      new Promotions([
        {
          name: "반짝할인",
          buy: 2,
          get: 1,
          start_date: "2024-07-01",
          end_date: "2024-12-31",
        },
      ])
    );
  }
  async run() {
    const outputView = new OutputView();
    const inputView = new InputView(this.products);
    outputView.printGreetings();
    outputView.printProducts(this.products);
    const input = await inputView.readProductsInput();
    const checkOut = new CheckOut(input, this.products);
    await checkOut.checkout();
  }
}

export default App;
