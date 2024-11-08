//inputText = "[콜라-10]";
export default function formatInputItem(inputItem) {
  const formatInput = inputItem.replace(/[\[\]]/g, "");
  const [name, quantity] = formatInput.split("-");
  return { name, quantity: Number(quantity) };
}
