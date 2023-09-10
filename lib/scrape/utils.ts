export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      return priceText.replace(/[^\d.]/g, ''); // Remove non-digit characters
    }
  }
  return '';
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim();
  return currencyText ? currencyText : '';
}
