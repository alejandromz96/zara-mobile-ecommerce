import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CartView } from "./cart-view";
import { CartProvider } from "@/contexts/cart-context";
import { CART_STORAGE_KEY } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

const item: CartItem = {
  productId: "iphone-16",
  brand: "Apple",
  name: "iPhone 16",
  imageUrl: "/iphone.jpg",
  color: "Black",
  storage: "128 GB",
  price: 959,
};

function renderCartView() {
  return render(
    <CartProvider>
      <CartView />
    </CartProvider>,
  );
}

describe("CartView", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the empty cart state", () => {
    renderCartView();

    expect(
      screen.getByText("Cart (0)"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Continue shopping" }),
    ).toHaveAttribute("href", "/");
  });

  it("renders cart items, total and removes items from storage", () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([item]));
    renderCartView();

    expect(screen.getByRole("heading", { name: "iPhone 16" })).toBeInTheDocument();
    expect(screen.getByText("128 GB / Black")).toBeInTheDocument();
    expect(screen.getAllByText(/959\s€/)).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe("[]");
    expect(
      screen.getByText("Cart (0)"),
    ).toBeInTheDocument();
  });
});
