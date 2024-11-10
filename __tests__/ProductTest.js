import Product from "../src/Product.js";
import Products from "../src/Products.js";
import getProductFormsArr from "../src/getProductsForm.js";
import generateProductForm from "../src/generateProductForm.js";
const mockPromotions = {
  map: jest.fn((name) => {
    if (name === "반짝할인") {
      return { getName: () => "반짝할인" };
    }
    return { getName: () => null };
  }),
};

describe("product class test", () => {
  const product = new Product({
    name: "비타민워터",
    price: 1000,
    promotionQuantity: 5,
    normalQuantity: 10,
    promotion: {
      getName: () => "반짝할인",
      getSetQuantity: () => 3,
      getGiftQuantity: (quantity) => 1 * Math.floor(quantity / 3),
      isAvailable: () => true,
    },
  });

  test("재고 보다 상품을 많이 들고왔을 경우", () => {
    expect(product.isPromotionQuantityEnough(6)).toBe(false);
    expect(product.isNormalQuantityEnough(11)).toBe(false);
  });
  test("재고 보다 상품을 적게 들고왔을 경우", () => {
    expect(product.isPromotionQuantityEnough(4)).toBe(true);
    expect(product.isNormalQuantityEnough(9)).toBe(true);
  });

  test("프로모션 미적용 상품 개수 구하기", () => {
    expect(product.getNonAppliedPromotionQuantity(3)).toBe(0);
    expect(product.getNonAppliedPromotionQuantity(5)).toBe(2);
    expect(product.getNonAppliedPromotionQuantity(7)).toBe(4);
  });
  test("증정 상품 개수 구하기", () => {
    expect(product.getGiftQuantity(3)).toBe(1);
    expect(product.getGiftQuantity(5)).toBe(1);
    expect(product.getGiftQuantity(15)).toBe(1);
  });
  test("프로모션 재고 차감", () => {
    product.substractPromotionQuantity(3);
    expect(product.isPromotionQuantityEnough(2)).toBe(true);
    expect(product.isPromotionQuantityEnough(3)).toBe(false);
  });
  test("일반 재고 차감", () => {
    product.substractNormalQuantity(4);
    expect(product.isNormalQuantityEnough(6)).toBe(true);
    expect(product.isNormalQuantityEnough(7)).toBe(false);
  });
  //promotionquantity:2, normalQuantity:6
  test("상품 구매", () => {
    product.purchaseProduct(7);
    expect(product.toString()).toBe("비타민워터,1000,1,0,반짝할인");
  });
});

describe("product 정보 가공 테스트", () => {
  test("productForm 생성 테스트", () => {
    const line = "비타민워터,1000,5,반짝할인";
    const productForm = generateProductForm(line);
    expect(productForm).toEqual({
      name: "비타민워터",
      price: 1000,
      promotionQuantity: 5,
      promotion: "반짝할인",
    });
  });
  test("productFormArr 생성 테스트", () => {
    const productText =
      "name,price,quantity,promotion\n 비타민워터,1000,5,반짝할인\n  비타민워터,1000,10,null\n 불닭볶음면,2000,4,null\n";
    const productForm = getProductFormsArr(productText);
    expect(productForm).toEqual([
      {
        name: "비타민워터",
        price: 1000,
        normalQuantity: 10,
        promotionQuantity: 5,
        promotion: "반짝할인",
      },
      {
        name: "불닭볶음면",
        price: 2000,
        normalQuantity: 4,
        promotion: null,
      },
    ]);
  });
});

describe("products class test", () => {
  const productsFormArr = [
    {
      name: "비타민워터",
      price: 1000,
      normalQuantity: 10,
      promotionQuantity: 5,
      promotion: "반짝할인",
    },
    {
      name: "불닭볶음면",
      price: 2000,
      normalQuantity: 4,
      promotion: null,
    },
  ];
  const products = new Products(productsFormArr, mockPromotions);
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
    expect(products.getProduct("콜라")).toBe(undefined);
  });
});
