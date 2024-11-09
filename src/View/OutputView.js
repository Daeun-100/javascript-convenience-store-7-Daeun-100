import { Console } from "@woowacourse/mission-utils";

export default class OutputView {
  printGreetings() {
    Console.print("안녕하세요. W편의점입니다.");
    Console.print("현재 보유하고 있는 상품입니다.");
  }
  printProducts(products) {
    const formattedProducts = products.getFormattedProducts();
    formattedProducts.forEach((productInfo) => {
      Console.print(productInfo);
    });
  }
  printReceipt(receipt) {
    Console.print("## 영수증");
    receipt.forEach((receiptInfo) => {
      Console.print(receiptInfo);
    });
  }
}
