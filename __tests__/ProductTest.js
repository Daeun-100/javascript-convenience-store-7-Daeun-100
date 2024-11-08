import Product from "../src/Product/Product.js";
import Products from "../src/Product/Products.js";
import {
  getProductFormArr,
  generateProductForm,
} from "../src/Product/generateProductForm.js";

describe("product class test", () => {
  const product = new Product({
    name: "비타민워터",
    price: "1000",
    promotionQuantity: "5",
    normalQuantity: "10",
    promotion: "반짝할인",
  });

  test("재고 보다 상품을 많이 들고왔을 경우", () => {
    expect(product.isPromotionQuantityAvailable(6)).toBe(false);
    expect(product.isNormalQuantityAvailable(11)).toBe(false);
  });
  test("재고 보다 상품을 적게 들고왔을 경우", () => {
    expect(product.isPromotionQuantityAvailable(4)).toBe(true);
    expect(product.isNormalQuantityAvailable(9)).toBe(true);
  });
  test("프로모션 재고 차감", () => {
    product.substractPromotionQuantity(3);
    expect(product.isPromotionQuantityAvailable(2)).toBe(true);
    expect(product.isPromotionQuantityAvailable(3)).toBe(false);
  });
  test("일반 재고 차감", () => {
    product.substractNormalQuantity(4);
    expect(product.isNormalQuantityAvailable(6)).toBe(true);
    expect(product.isNormalQuantityAvailable(7)).toBe(false);
  });
});

describe("product 정보 가공 테스트", () => {
  test("productForm 생성 테스트", () => {
    const line = "비타민워터,1000,5,반짝할인";
    const productForm = generateProductForm(line);
    expect(productForm).toEqual({
      name: "비타민워터",
      price: "1000",
      promotionQuantity: "5",
      promotion: "반짝할인",
    });
  });
  test("productFormArr 생성 테스트", () => {
    const productText =
      "name,price,quantity,promotion\n 비타민워터,1000,5,반짝할인\n  비타민워터,1000,10,null";
    const productForm = getProductFormArr(productText);
    expect(productForm).toEqual([
      {
        name: "비타민워터",
        price: "1000",
        normalQuantity: "10",
        promotionQuantity: "5",
        promotion: "반짝할인",
      },
    ]);
  });
});

describe("products class test", () => {
  const productsFormArr = [
    {
      name: "비타민워터",
      price: "1000",
      normalQuantity: "10",
      promotionQuantity: "5",
      promotion: "반짝할인",
    },
    {
      name: "불닭볶음면",
      price: "2000",
      normalQuantity: "4",
      promotion: null,
    },
  ];
  const products = new Products(productsFormArr);
  test("products 생성 테스트", () => {
    expect(products.toString()).toEqual([
      "비타민워터,1000,10,5,반짝할인",
      "불닭볶음면,2000,4,0,null",
    ]);
  });
  test("상품이 존재하는지 확인", () => {
    expect(products.isProductExist("비타민워터")).toBe(true);
    expect(products.isProductExist("콜라")).toBe(false);
  });
  test("상품 정보 가져오기", () => {
    expect(products.getProduct("비타민워터").toString()).toBe(
      "비타민워터,1000,10,5,반짝할인"
    );
    expect(products.getProduct("콜라")).toBe(null);
  });
});
