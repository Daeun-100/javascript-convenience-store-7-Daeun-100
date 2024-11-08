import OutputView from "./View/OutputView.js";
import InputView from "./View/InputView.js";
import Products from "./Product/Products.js";
import Promotions from "./Promotion/Promotions.js";
class App {
  constructor() {
    this.products = new Products(
      [
        {
          name: "콜라",
          price: 1000,
          normalQuantity: 10,
          promotionQuantity: 0,
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
          buy: 1,
          get: 1,
          start_date: "2024-07-01",
          end_date: "2024-07-31",
        },
      ])
    );
  }
  async run() {
    const outputView = new OutputView();
    const inputView = new InputView();
    outputView.printGreetings();
    outputView.printProducts(this.products);
    const input = await inputView.readProductsInput();
    const a = await inputView.confirmAction(
      "PURCHASE_WITHOUT_PROMOTION",
      "콜라",
      10
    );
    const b = await inputView.confirmAction("ADDITIONAL_GIFT", "사이다", 1);
    const c = await inputView.confirmAction("MEMBERSHIP_DISCOUNT");
  }
}

export default App;
