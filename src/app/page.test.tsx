import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HomePage from "./page";
import { searchProducts } from "@/app/actions/products";
import type { ProductListItem } from "@/lib/types";

vi.mock("@/app/actions/products", () => ({
  searchProducts: vi.fn(),
}));

vi.mock("@/components/common/site-header", () => ({
  SiteHeader: () => <header>Header</header>,
}));

vi.mock("@/components/home/product-search", () => ({
  ProductSearch: ({
    initialSearch,
    resultsCount,
  }: {
    initialSearch?: string;
    resultsCount: number;
  }) => (
    <div>
      Search: {initialSearch} ({resultsCount})
    </div>
  ),
}));

vi.mock("@/components/common/product-grid", () => ({
  ProductGrid: ({ products }: { products: ProductListItem[] }) => (
    <div>Grid: {products.map((product) => product.name).join(", ")}</div>
  ),
}));

const searchProductsMock = vi.mocked(searchProducts);

describe("HomePage", () => {
  it("loads products using the search param and passes them to the page sections", async () => {
    searchProductsMock.mockResolvedValueOnce([
      {
        id: "iphone-16",
        brand: "Apple",
        name: "iPhone 16",
        basePrice: 959,
        imageUrl: "/iphone.jpg",
      },
    ]);

    render(
      await HomePage({
        searchParams: Promise.resolve({ search: "iphone" }),
      }),
    );

    expect(searchProductsMock).toHaveBeenCalledWith("iphone");
    expect(screen.getByText("Search: iphone (1)")).toBeInTheDocument();
    expect(screen.getByText("Grid: iPhone 16")).toBeInTheDocument();
  });
});
