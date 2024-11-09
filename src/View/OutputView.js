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
  padEndForKoreanText(text, targetLength) {
    let currentLength = 0;

    // 각 문자에 대해 한글인지 숫자인지 확인하여 길이 계산
    for (const char of text) {
      if (char.charCodeAt(0) > 127) {
        currentLength += 2; // 한글이면 2칸으로 계산
      } else {
        currentLength += 1; // 숫자(또는 영문)면 1칸으로 계산
      }
    }

    // 목표 길이에서 현재 길이를 뺀 만큼 공백 추가
    const paddingNeeded = targetLength - currentLength;
    if (paddingNeeded > 0) {
      return text + " ".repeat(paddingNeeded);
    } else {
      return text;
    }
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
    Console.print("상품명		   수량	      금액");
    selectedItem.forEach((item) => {
      const amount = products
        .getProduct(item.name)
        .getTotalAmount(item.quantity);
      Console.print(
        `${this.padEndForKoreanText(item.name, 19)}${String(
          item.quantity
        ).padEnd(11)}${amount.toLocaleString()}`
      );
    });
    Console.print("=============증     정===============");
    Object.keys(discountInfo.giftQuantity).forEach((name) => {
      if (discountInfo.giftQuantity[name] > 0) {
        Console.print(
          `${this.padEndForKoreanText(name, 19)}${
            discountInfo.giftQuantity[name]
          }`
        );
      }
    });
    Console.print("======================================");
    const totalCount = selectedItem.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    Console.print(
      `${this.padEndForKoreanText("총구매액", 19)}${String(totalCount).padEnd(
        11
      )}${totalAmount.toLocaleString()}`
    );
    Console.print(
      `${this.padEndForKoreanText("행사할인", 28)} ${
        "-" + promotionDiscount.toLocaleString()
      }`
    );
    Console.print(
      `${this.padEndForKoreanText("멤버십할인", 29)}${
        "-" + membershipDiscount.toLocaleString()
      }`
    );
    Console.print(
      `${this.padEndForKoreanText("내실돈", 30)}${finalAmount.toLocaleString()}`
    );
  }
}
