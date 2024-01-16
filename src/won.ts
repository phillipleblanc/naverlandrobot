function formatKoreanWon(number: number): string {
  let billionPart = Math.floor(number / 100000000);
  let remainder = number % 100000000;
  let tenThousandPart = remainder ? Math.floor(remainder / 10000) : 0;

  let formattedString = billionPart > 0 ? billionPart + "억" : '';
  formattedString += tenThousandPart > 0 ? ` ${tenThousandPart.toLocaleString('ko-KR')}` : '';

  return formattedString.trim();
}

function parseKoreanWon(input: string): number {
  let parts = input.split('억').map(part => part.trim().replace(/,/g, ''));
  let billionPart = parts[0] ? parseInt(parts[0]) : 0;
  let remainder = parts[1] ? parseInt(parts[1]) : 0;

  return (billionPart * 100000000) + (remainder * 10000);
}

export { formatKoreanWon, parseKoreanWon };