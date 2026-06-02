import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductGrid } from "./product-grid";
import type { ProductListItem } from "@/lib/types";

const products: ProductListItem[] = [
  {
    id: "iphone-16",
    brand: "Apple",
    name: "iPhone 16",
    basePrice: 959,
    imageUrl: "/iphone.jpg",
  },
  {
    id: "pixel-9",
    brand: "Google",
    name: "Pixel 9",
    basePrice: 899,
    imageUrl: "/pixel.jpg",
  },
];

describe("ProductGrid", () => {
  it("renders an empty state when there are no products", () => {
    render(<ProductGrid products={[]} />);

    expect(
      screen.getByText("No phones found for this search"),
    ).toBeInTheDocument();
  });

  it("renders product cards with links, images and formatted catalog prices", () => {
    render(<ProductGrid products={products} />);

    expect(
      screen.getByRole("region", { name: "Phone list" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /apple iphone 16/i })).toHaveAttribute(
      "href",
      "/products/iphone-16",
    );
    expect(screen.getByRole("img", { name: "Apple iPhone 16" })).toHaveAttribute(
      "src",
      expect.stringContaining("iphone.jpg"),
    );
    expect(screen.getByText(/959\sEUR/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /google pixel 9/i })).toHaveAttribute(
      "href",
      "/products/pixel-9",
    );
  });
});
