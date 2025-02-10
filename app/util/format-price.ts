export default function formatPrice(price: number): string {
  if (price < 10000) {
    return price + "만";
  } else {
    const divided = (price / 10000).toString().split(".");
    if (divided.length === 1) {
      return divided[0] + "억";
    } else {
      return divided[0] + "억" + divided[1].slice(0, 1) + "천만";
    }
  }
}
