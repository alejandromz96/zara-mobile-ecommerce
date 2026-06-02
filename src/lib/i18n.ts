export const defaultLocale = "en";

export const translations = {
  en: {
    "app.title": "Zara Mobile Ecommerce",
    "app.description": "Responsive mobile phone catalog.",
    "cart.ariaLabel": "{count} products in cart",
    "cart.continueShopping": "Continue shopping",
    "cart.pay": "Pay",
    "cart.empty": "There are no phones in the cart yet.",
    "cart.remove": "Remove",
    "cart.summary": "Summary",
    "cart.title": "Cart",
    "cart.total": "Total",
    "common.back": "Back",
    "common.homeAriaLabel": "Go to home",
    "common.cartAriaLabel": "Go to cart",
    "errors.cartProvider": "useCart must be used inside CartProvider.",
    "errors.productsLoad": "Products could not be loaded from the API.",
    "product.addToCart": "Add to cart",
    "product.added": "Product added",
    "product.brand": "Brand",
    "product.color": "Color",
    "product.colorPrompt": "Color. Pick your favourite.",
    "product.description": "Description",
    "product.name": "Name",
    "product.similarItems": "Similar items",
    "product.specs": "Specifications",
    "product.storage": "Storage",
    "product.storagePrompt": "Storage. How much space do you need?",
    "product.specs.battery": "Battery",
    "product.specs.mainCamera": "Main camera",
    "product.specs.os": "OS",
    "product.specs.processor": "Processor",
    "product.specs.refreshRate": "Screen refresh rate",
    "product.specs.resolution": "Resolution",
    "product.specs.screen": "Screen",
    "product.specs.selfieCamera": "Selfie camera",
    "products.empty": "No phones found for this search",
    "products.gridAriaLabel": "Phone list",
    "search.label": "Search",
    "search.clear": "Clear search",
    "search.pending": "Updating...",
    "search.placeholder": "Search for a smartphone...",
    "search.results": "{count} results",
  },
} as const;

type Locale = keyof typeof translations;
type TranslationKey = keyof (typeof translations)[typeof defaultLocale];

export function t(
  key: TranslationKey,
  params?: Record<string, string | number>,
  locale: Locale = defaultLocale,
) {
  let value: string = translations[locale][key];

  if (!params) {
    return value;
  }

  Object.entries(params).forEach(([paramKey, paramValue]) => {
    value = value.replaceAll(`{${paramKey}}`, String(paramValue));
  });

  return value;
}
