import OutputView from "./View/OutputView.js";
import InputView from "./View/InputView.js";
import Products from "./Product/Products.js";
import Promotions from "./Promotion/Promotions.js";
import CheckOut from "./CheckOut/CheckOut.js";
import { Console } from "@woowacourse/mission-utils";
import FileHandler from "./FileHandler.js";
import getProductFormsArr from "./Product/getProductsForm.js";
import getPromotionsArr from "./Promotion/getPromotionsArr.js";

class App {
  constructor() {}
  async run() {
    const fileHandler = new FileHandler();
    // 1. 파일 읽기
    const productsText = await fileHandler.readTextFile("./public/products.md");
    const promotionsText = await fileHandler.readTextFile(
      "./public/promotions.md"
    );

    // 2. 데이터 파싱 및 객체 생성
    const productsFormsArr = getProductFormsArr(productsText);
    const promotionsArr = getPromotionsArr(promotionsText);
    const promotions = new Promotions(promotionsArr);
    const products = new Products(productsFormsArr, promotions);
    const outputView = new OutputView();
    const inputView = new InputView(products);
    // 3. 출력 및 첫 구매 진행
    let hasAdditionalPurchase;
    do {
      outputView.printGreetings();
      outputView.printProducts(products);
      const input = await inputView.readProductsInput();
      const checkOut = new CheckOut(input, products);
      hasAdditionalPurchase = await checkOut.checkout();
    } while (hasAdditionalPurchase === "Y");
  }
}

export default App;
