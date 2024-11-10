import Promotion from "../src/Promotion.js";
import Promotions from "../src/Promotions.js";
import getPromotionsArr from "../src/getPromotionsArr.js";
describe("Promotion test", () => {
  const promotion = new Promotion({
    name: "반짝할인",
    buy: 1,
    get: 1,
    start_date: "2024-09-01",
    end_date: "2024-09-30",
  });
  test("오늘 날짜에 적용 가능한지 확인", () => {
    expect(promotion.isAvailable()).toBe(false);
  });
  const promotion21 = new Promotion({
    name: "Buy 2 Get 1",
    buy: 2,
    get: 1,
    start_date: "2024-09-01",
    end_date: "2025-01-30",
  });
  test("증정 수량 게산", () => {
    expect(promotion21.getGiftQuantity(2)).toBe(0);
    expect(promotion21.getGiftQuantity(3)).toBe(1);
    expect(promotion21.getGiftQuantity(7)).toBe(2);
  });
  test("추가 증정 가능한지 확인", () => {
    expect(promotion21.isAdditionalGiftEligible(2)).toBe(true);
    expect(promotion21.isAdditionalGiftEligible(3)).toBe(false);
    expect(promotion21.isAdditionalGiftEligible(5)).toBe(true);
  });
});

describe("Promotions test", () => {
  const promotionsText =
    "name,buy,get,start_date,end_date\n 반짝할인,1,1,2021-09-01,2021-09-30\n 추천행사,2,1,2021-09-01,2021-09-30";
  const promotionsArr = getPromotionsArr(promotionsText);
  test("getPromotionsArr", () => {
    expect(promotionsArr).toEqual([
      {
        name: "반짝할인",
        buy: 1,
        get: 1,
        start_date: "2021-09-01",
        end_date: "2021-09-30",
      },
      {
        name: "추천행사",
        buy: 2,
        get: 1,
        start_date: "2021-09-01",
        end_date: "2021-09-30",
      },
    ]);
  });
  const promotions = new Promotions(promotionsArr);
  test("Promotions 생성", () => {
    expect(promotions.toString()).toEqual([
      "반짝할인,buy:1,get:1,2021-09-01,2021-09-30",
      "추천행사,buy:2,get:1,2021-09-01,2021-09-30",
    ]);
  });
  test("프로모션 매핑 테스트", () => {
    expect(promotions.map("반짝할인").toString()).toBe(
      "반짝할인,buy:1,get:1,2021-09-01,2021-09-30"
    );
  });
});
