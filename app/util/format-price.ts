export default function formatMapPrice(num: number) {
  if (num < 100) {
    return num.toString();
  }

  const units = ["백만", "천만", "억", "십억", "조"];
  const thresholds = [100, 1000, 10000, 100000, 1000000]; // 기준값: 만 단위에서 천만, 억 등

  let unitIndex = 0;
  while (
    unitIndex < thresholds.length - 1 &&
    num >= thresholds[unitIndex + 1]
  ) {
    unitIndex++;
  }

  const reducedNum = num / thresholds[unitIndex];
  const formattedNum = reducedNum.toFixed(1);

  // 소수점 끝이 0이면 제거
  return formattedNum.endsWith(".0")
    ? `${parseInt(formattedNum)}${units[unitIndex]}`
    : `${formattedNum}${units[unitIndex]}`;
}
