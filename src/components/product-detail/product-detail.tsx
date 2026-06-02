"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { formatCatalogPrice } from "@/lib/formatters";
import {
  canAddProductToCart,
  createCartItem,
  getProductImage,
  getProductPrice,
  getProductSpecs,
} from "@/lib/product-details";
import { t } from "@/lib/i18n";
import type { ColorOption, ProductDetail, StorageOption } from "@/lib/types";

type ProductDetailProps = {
  product: ProductDetail;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>();
  const [selectedColor, setSelectedColor] = useState<ColorOption>();

  const currentImage = getProductImage(product, selectedColor);
  const currentPrice = getProductPrice(product, selectedStorage);
  const priceLabel = selectedStorage
    ? formatCatalogPrice(currentPrice)
    : `From ${formatCatalogPrice(currentPrice)}`;
  const canAddToCart = canAddProductToCart(selectedColor, selectedStorage);
  const specs = getProductSpecs(product);

  function addToCart() {
    if (!selectedColor || !selectedStorage) {
      return;
    }

    addItem(createCartItem(product, selectedColor, selectedStorage));
    router.push("/cart");
  }

  function selectStorage(option: StorageOption) {
    setSelectedStorage(option);
    setSelectedColor((currentColor) => currentColor ?? product.colorOptions[0]);
  }

  function selectColor(option: ColorOption) {
    setSelectedColor(option);
    setSelectedStorage(
      (currentStorage) => currentStorage ?? product.storageOptions[0],
    );
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
      <div className="relative h-72 bg-white sm:h-105 lg:h-140">
        <Image
          src={currentImage}
          alt={`${product.brand} ${product.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-10 pt-0 lg:pt-2">
        <div>
          <h1 className="text-xl font-normal uppercase leading-tight sm:text-2xl">
            {product.name}
          </h1>
          <p className="mt-3 text-sm">{priceLabel}</p>
        </div>

        <fieldset className="space-y-5">
          <legend className="text-xs uppercase leading-none">
            {t("product.storagePrompt")}
          </legend>
          <div className="grid grid-cols-3 border-l border-t border-[var(--line)]">
            {product.storageOptions.map((option) => (
              <button
                type="button"
                key={option.capacity}
                onClick={() => selectStorage(option)}
                className={`min-h-11 cursor-pointer border-b border-r border-[var(--line)] bg-[var(--surface)] px-3 text-center text-xs uppercase transition-colors ${
                  selectedStorage?.capacity === option.capacity
                    ? "bg-black text-white"
                    : "hover:bg-[#fafafa]"
                }`}
              >
                {option.capacity}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="text-xs uppercase leading-none">
            {t("product.colorPrompt")}
          </legend>
          <div className="flex flex-wrap gap-3">
            {product.colorOptions.map((option) => (
              <button
                type="button"
                key={option.name}
                aria-label={option.name}
                onClick={() => selectColor(option)}
                className={`size-6 cursor-pointer border bg-white p-px ${
                  selectedColor?.name === option.name
                    ? "border-black"
                    : "border-[var(--line)]"
                }`}
              >
                <span
                  className="block size-full"
                  style={{ backgroundColor: option.hexCode }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
          {selectedColor ? (
            <p className="text-xs uppercase leading-none text-[var(--muted)]">
              {selectedColor.name}
            </p>
          ) : null}
        </fieldset>

        <button
          type="button"
          onClick={addToCart}
          disabled={!canAddToCart}
          className="min-h-12 cursor-pointer bg-black px-6 text-xs uppercase text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#d5d5d5] disabled:text-[#707070]"
        >
          {t("product.addToCart")}
        </button>

      </div>

      <section className="lg:col-span-2 lg:ml-[33%]">
        <h2 className="mb-8 text-xl font-normal uppercase">
          {t("product.specs")}
        </h2>
        <dl className="border-t border-[var(--line)] text-xs uppercase">
          {[
            [t("product.brand"), product.brand],
            [t("product.name"), product.name],
            [t("product.description"), product.description],
            ...specs,
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[minmax(120px,0.36fr)_1fr] gap-6 border-b border-[var(--line)] py-4"
            >
              <dt>{label}</dt>
              <dd className="normal-case">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}
