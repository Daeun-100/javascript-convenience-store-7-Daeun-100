export const DISCOUNT_INFO = {
  giftQuantity: {},
  nonAppliedPromotionQuantity: {},
  membershipDiscount: 0,
};

export const MESSAGES = {
  PURCHASE_WITHOUT_PROMOTION: (productName, quantity) =>
    `현재 ${productName} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
  ADDITIONAL_GIFT: (productName) =>
    `현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
  MEMBERSHIP_DISCOUNT: "멤버십 할인을 받으시겠습니까? (Y/N)\n",
  ADDITIONAL_PURCHASE: "감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n",
};
