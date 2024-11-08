export default function selectNotNull(a, b) {
  if (a === null) {
    return b;
  }
  return a;
}
