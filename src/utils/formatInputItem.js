//input= "[콜라-10],[사이다-3]";
export default function formatInput(input) {
  const inputArr = input.split(",");
  const returnArr = inputArr.map((inputItem) => {
    const formatInput = inputItem.replace(/[\[\]]/g, "");
    const [name, quantity] = formatInput.split("-");
    return { name, quantity: Number(quantity) };
  });
  return returnArr;
}
