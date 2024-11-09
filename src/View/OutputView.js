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
  printReceipt({
    products,
    selectedItem,
    discountInfo,
    totalAmount,
    promotionDiscount,
    membershipDiscount,
    finalAmount,
  }) {
    Console.print("==============W 편의점================");
    Console.print("상품명		수량	금액");
    selectedItem.forEach((item) => {
      const amount = products
        .getProduct(item.name)
        .getTotalAmount(item.quantity);
      Console.print(`${item.name}		${item.quantity}	${amount}`);
    });
    Console.print("=============증	정===============");
    Object.keys(discountInfo.giftQuantity).forEach((name) => {
      if (discountInfo.giftQuantity[name] > 0) {
        Console.print(`${name}		${discountInfo.giftQuantity[name]}`);
      }
    });
    Console.print("====================================");
    const totalCount = selectedItem.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    Console.print(`총 구매액		${totalCount}	 ${totalAmount.toLocaleString()}`);
    Console.print(`행사 할인		-${promotionDiscount.toLocaleString()}`);
    Console.print(`멤버십 할인    	-${membershipDiscount.toLocaleString()}`);
    Console.print(`내실 돈		${finalAmount.toLocaleString()}`);
  }
}
