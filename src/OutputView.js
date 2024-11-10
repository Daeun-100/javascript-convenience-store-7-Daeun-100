import { Console } from "@woowacourse/mission-utils";

export default class OutputView {
  printGreetings() {
    Console.print("안녕하세요. W편의점입니다.");
    Console.print("현재 보유하고 있는 상품입니다.\n");
  }

  printProducts(products) {
    const formattedProducts = products.getFormattedProducts();
    formattedProducts.forEach((productInfo) => {
      Console.print(productInfo);
    });
    Console.print("");
  }

  // 각 문자에 대해 한글인지 숫자인지 확인하여 길이 계산
  calcuateTextLength(text) {
    let currentLength = 0;
    for (const char of text) {
      if (char.charCodeAt(0) > 127) {
        currentLength += 2;
      } else {
        currentLength += 1;
      }
    }
    return currentLength;
  }

  padEndForKoreanText(text, targetLength) {
    const currentLength = this.calcuateTextLength(text);

    // 목표 길이에서 현재 길이를 뺀 만큼 공백 추가
    const paddingNeeded = targetLength - currentLength;
    if (paddingNeeded > 0) {
      return text + " ".repeat(paddingNeeded);
    } else {
      return text;
    }
  }

  printSelectedItems(allProductsInfo) {
    allProductsInfo.forEach((item) => {
      if (item.quantity === 0) return;
      Console.print(
        `${this.padEndForKoreanText(item.name, 19)}${String(
          item.quantity
        ).padEnd(11)}${item.amount.toLocaleString()}`
      );
    });
  }

  printGiftItems(discountInfo) {
    Object.keys(discountInfo.giftQuantity).forEach((name) => {
      if (discountInfo.giftQuantity[name] > 0) {
        Console.print(
          `${this.padEndForKoreanText(name, 19)}${
            discountInfo.giftQuantity[name]
          }`
        );
      }
    });
  }

  printDiscounts(promotionDiscount, membershipDiscount) {
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
  }

  printFinalAmount(finalAmount) {
    Console.print(
      `${this.padEndForKoreanText("내실돈", 30)}${finalAmount.toLocaleString()}`
    );
  }

  printTotalAmount(totalCount, totalAmount) {
    Console.print(
      `${this.padEndForKoreanText("총구매액", 19)}${String(totalCount).padEnd(
        11
      )}${totalAmount.toLocaleString()}`
    );
  }

  printReceipt({
    allProductsInfo,
    discountInfo,
    totalCount,
    totalAmount,
    promotionDiscount,
    membershipDiscount,
    finalAmount,
  }) {
    Console.print("==============W 편의점================");
    Console.print("상품명		   수량	      금액");
    this.printSelectedItems(allProductsInfo);
    Console.print("=============증     정===============");
    this.printGiftItems(discountInfo);
    Console.print("======================================");
    this.printTotalAmount(totalCount, totalAmount);
    this.printDiscounts(promotionDiscount, membershipDiscount);
    this.printFinalAmount(finalAmount);
    Console.print("");
  }
}
