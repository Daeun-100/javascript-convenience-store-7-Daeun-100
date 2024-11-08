import Promotion from "../src/Promotion/Promotion.js";
import Promotions from "../src/Promotion/Promotions.js";
import generatePromotionsArr from "../src/Promotion/generatePromotionArr.js";
describe("Promotion test", () => {
  const promotion = new Promotion({
    name: "반짝할인",
    buy: 1,
    get: 1,
    start_date: "2021-09-01",
    end_date: "2021-09-30",
  });
  test("오늘 날짜에 적용 가능한지 확인", () => {
    expect(promotion.isAvailable(new Date("2021-09-01"))).toBe(true);
    expect(promotion.isAvailable(new Date("2021-09-30"))).toBe(true);
    expect(promotion.isAvailable(new Date("2021-10-01"))).toBe(false);
  });
  test("buyNgetM 테스트", () => {
    expect(promotion.buyNgetM()).toEqual({ buy: 1, get: 1 });
  });
});

describe("Promotions test", () => {
  const promotionsText =
    "name,buy,get,start_date,end_date\n 반짝할인,1,1,2021-09-01,2021-09-30\n 추천행사,2,1,2021-09-01,2021-09-30";
  const promotionsArr = generatePromotionsArr(promotionsText);
  test(generatePromotionsArr, () => {
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
  test("Promotions 생성", () => {
    const promotions = new Promotions(promotionsArr);
    expect(promotions.toString()).toEqual([
      "반짝할인,buy:1,get:1,2021-09-01,2021-09-30",
      "추천행사,buy:2,get:1,2021-09-01,2021-09-30",
    ]);
  });
});
