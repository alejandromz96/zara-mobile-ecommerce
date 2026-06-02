"use client";

import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { t } from "@/lib/i18n";

export function CartCounter() {
  const { itemsCount } = useCart();
  const cartIcon = itemsCount > 0 ? "/cart-active.svg" : "/cart-inactive.svg";

  return (
    <span
      className="inline-flex items-center gap-1.5 align-middle"
      aria-label={t("cart.ariaLabel", { count: itemsCount })}
    >
      <Image
        src={cartIcon}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        className="block shrink-0"
      />
      <span className="text-base uppercase tabular-nums">
        {itemsCount}
      </span>
    </span>
  );
}
