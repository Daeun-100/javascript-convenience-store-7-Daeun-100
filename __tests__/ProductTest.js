import Product from "../src/Product";
describe("product", () => {
  const product = new Product("비타민워터", 1000, 10, 5, null);

  test("재고 보다 상품을 많이 들고왔을 경우", () => {
    expect(product.isPromotionStockAvailable(6)).toBe(false);
    expect(product.isNormalStockAvailable(11)).toBe(false);
  });
  test("재고 보다 상품을 적게 들고왔을 경우", () => {
    expect(product.isPromotionStockAvailable(4)).toBe(true);
    expect(product.isNormalStockAvailable(9)).toBe(true);
  });
  test("프로모션 재고 차감", () => {
    product.substractPromotionStock(3);
    expect(product.isPromotionStockAvailable(2)).toBe(true);
    expect(product.isPromotionStockAvailable(3)).toBe(false);
  });
  test("일반 재고 차감", () => {
    product.substractNormalStock(4);
    expect(product.isNormalStockAvailable(6)).toBe(true);
    expect(product.isNormalStockAvailable(7)).toBe(false);
  });
});
