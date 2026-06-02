import { describe, expect, it } from "vitest";

import { formatCatalogPrice, formatPrice } from "./formatters";

describe("formatters", () => {
  it("formats prices as rounded Spanish euros", () => {
    expect(formatPrice(959)).toBe("959\xa0€");
    expect(formatPrice(959.8)).toBe("960\xa0€");
  });

  it("formats catalog prices with the EUR currency code", () => {
    expect(formatCatalogPrice(1199)).toBe("1199\xa0EUR");
  });
});
