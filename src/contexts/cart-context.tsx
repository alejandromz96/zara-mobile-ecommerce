"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  addCartItem,
  calculateCartTotal,
  CART_STORAGE_KEY,
  parseCart,
  removeCartItem,
  serializeCart,
} from "@/lib/cart";
import { t } from "@/lib/i18n";
import type { CartItem } from "@/lib/types";

const CART_UPDATED_EVENT = "cart-updated";
const EMPTY_CART: CartItem[] = [];

let cachedCartValue: string | null = null;
let cachedCartItems: CartItem[] = EMPTY_CART;

type CartContextValue = {
  items: CartItem[];
  itemsCount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function getCartSnapshot() {
  const cartValue = window.localStorage.getItem(CART_STORAGE_KEY);

  if (cartValue === cachedCartValue) {
    return cachedCartItems;
  }

  cachedCartValue = cartValue;
  cachedCartItems = parseCart(cartValue);
  return cachedCartItems;
}

function subscribeToCartChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CART_UPDATED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CART_UPDATED_EVENT, onStoreChange);
  };
}

function persistCart(items: CartItem[]) {
  const cartValue = serializeCart(items);
  cachedCartValue = cartValue;
  cachedCartItems = items;
  window.localStorage.setItem(CART_STORAGE_KEY, cartValue);
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCartChanges,
    getCartSnapshot,
    () => EMPTY_CART,
  );

  const addItem = useCallback(
    (item: CartItem) => {
      persistCart(addCartItem(items, item));
    },
    [items],
  );

  const removeItem = useCallback(
    (indexToRemove: number) => {
      persistCart(removeCartItem(items, indexToRemove));
    },
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemsCount: items.length,
      total: calculateCartTotal(items),
      addItem,
      removeItem,
    }),
    [addItem, items, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(t("errors.cartProvider"));
  }

  return context;
}
