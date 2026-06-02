import { describe, expect, it } from "vitest";

import { buildProductSearchUrl } from "./search";

describe("buildProductSearchUrl", () => {
  it("returns null when the next search matches the current search after trimming", () => {
    expect(
      buildProductSearchUrl({
        currentSearch: "iphone",
        pathname: "/",
        query: "  iphone  ",
      }),
    ).toBeNull();
  });

  it("builds an encoded search URL for new queries", () => {
    expect(
      buildProductSearchUrl({
        currentSearch: "",
        pathname: "/products",
        query: "iPhone 16 Pro",
      }),
    ).toBe("/products?search=iPhone%2016%20Pro");
  });

  it("returns the pathname when the query is cleared", () => {
    expect(
      buildProductSearchUrl({
        currentSearch: "pixel",
        pathname: "/products",
        query: "   ",
      }),
    ).toBe("/products");
  });
});
