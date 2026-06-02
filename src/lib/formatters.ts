export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCatalogPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(price);
}
