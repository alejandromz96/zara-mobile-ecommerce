import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProductDetail } from "./product-detail";
import { CartProvider } from "@/contexts/cart-context";
import { CART_STORAGE_KEY } from "@/lib/cart";
import type { ProductDetail as ProductDetailType } from "@/lib/types";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const product: ProductDetailType = {
  id: "iphone-16",
  brand: "Apple",
  name: "iPhone 16",
  basePrice: 899,
  imageUrl: "/default.jpg",
  description: "A phone",
  rating: 4.8,
  specs: {
    screen: "6.1 inches",
    resolution: "2556 x 1179",
    processor: "A18",
    mainCamera: "48 MP",
    selfieCamera: "12 MP",
    battery: "22 h",
    os: "iOS",
    screenRefreshRate: "60 Hz",
  },
  colorOptions: [
    {
      name: "Black",
      hexCode: "#000000",
      imageUrl: "/black.jpg",
    },
    {
      name: "Blue",
      hexCode: "#1d4ed8",
      imageUrl: "/blue.jpg",
    },
  ],
  storageOptions: [
    {
      capacity: "128 GB",
      price: 959,
    },
    {
      capacity: "256 GB",
      price: 1089,
    },
  ],
  similarProducts: [],
};

describe("ProductDetail", () => {
  beforeEach(() => {
    window.localStorage.clear();
    push.mockReset();
  });

  it("requires color and storage before adding a product to the cart", () => {
    render(
      <CartProvider>
        <ProductDetail product={product} />
      </CartProvider>,
    );

    const addButton = screen.getByRole("button", {
      name: "Add to cart",
    });

    expect(screen.getByText(/From\s899\sEUR/)).toBeInTheDocument();
    expect(screen.queryByText(/959\sEUR/)).not.toBeInTheDocument();
    expect(screen.queryByText(/1089\sEUR/)).not.toBeInTheDocument();
    expect(addButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /256 GB/ }));
    expect(screen.getByText(/1089\sEUR/)).toBeInTheDocument();
    expect(addButton).toBeEnabled();
    expect(screen.getByText("Black")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Blue" }));
    expect(screen.getByText("Blue")).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(screen.queryByText("Product added")).not.toBeInTheDocument();
    expect(push).toHaveBeenCalledWith("/cart");
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]")).toEqual([
      {
        productId: "iphone-16",
        brand: "Apple",
        name: "iPhone 16",
        imageUrl: "/blue.jpg",
        color: "Blue",
        storage: "256 GB",
        price: 1089,
      },
    ]);
  });

  it("selects the first storage option when color is selected first", () => {
    render(
      <CartProvider>
        <ProductDetail product={product} />
      </CartProvider>,
    );

    const addButton = screen.getByRole("button", {
      name: "Add to cart",
    });

    fireEvent.click(screen.getByRole("button", { name: "Blue" }));

    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText(/959\sEUR/)).toBeInTheDocument();
    expect(addButton).toBeEnabled();
  });
});
