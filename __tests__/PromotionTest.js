import Promotion from "../src/Promotion/Promotion.js";
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
