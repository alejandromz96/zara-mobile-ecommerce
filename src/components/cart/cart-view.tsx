"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/formatters";
import { t } from "@/lib/i18n";

export function CartView() {
  const { items, removeItem, total } = useCart();

  return (
    <section className="px-4 pb-32">
      <h1 className="mb-10 text-2xl font-normal uppercase">
        {t("cart.title")} ({items.length})
      </h1>

      <div className="divide-y divide-(--line)">
        {items.map((item, index) => (
          <article
            key={`${item.productId}-${item.storage}-${item.color}-${index}`}
            className="grid grid-cols-[110px_1fr] gap-5 py-4 sm:grid-cols-[150px_1fr_auto]"
          >
            <div className="relative aspect-3/4 bg-white">
              <Image
                src={item.imageUrl}
                alt={`${item.brand} ${item.name}`}
                fill
                loading="eager"
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-contain"
              />
            </div>

            <div>
              <p className="text-[11px] uppercase text-(--muted)">
                {item.brand}
              </p>
              <h2 className="mt-2 text-sm font-normal uppercase">
                {item.name}
              </h2>
              <p className="mt-3 text-sm text-(--muted)">
                {item.storage} / {item.color}
              </p>
              <p className="mt-3 text-sm">{formatPrice(item.price)}</p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="col-start-2 self-end text-red-500 text-left text-sm uppercase hover:text-red-700 sm:col-start-auto"
            >
              {t("cart.remove")}
            </button>
          </article>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-(--surface) px-4 py-5">
        {items.length !== 0 && (<div className="flex items-center justify-between text-sm mb-4">
          <span className="uppercase">{t("cart.total")}</span>
          <span className="text-base">{formatPrice(total)}</span>
        </div>)}

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/"
            className="flex min-h-11 items-center justify-center border border-black  text-xs uppercase"
          >
            {t("cart.continueShopping")}
          </Link>

         {items.length !== 0 && ( <button
            type="button"
            className="flex min-h-11 items-center justify-center bg-black text-white text-xs uppercase"
          >
            {t("cart.pay")}
          </button>)}
        </div>
      </div>
    </section>
  );
}
