export default function mergeDuplicateItems(items) {
  const mergedItems = {};

  items.forEach((item) => {
    if (mergedItems[item.name]) {
      // 이름이 이미 존재하면 수량을 합산
      mergedItems[item.name].quantity += item.quantity;
    } else {
      // 처음 등장하는 이름이면 새로 추가
      mergedItems[item.name] = { ...item };
    }
  });

  return Object.values(mergedItems); // 객체를 배열로 변환
}
