import { ProductCard } from "@/components/common/product-card";
import { t } from "@/lib/i18n";
import type { ProductListItem } from "@/lib/types";

type ProductSimilarItemsProps = {
  products: ProductListItem[];
};

export function ProductSimilarItems({ products }: ProductSimilarItemsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 lg:ml-[33%]">
      <h2 className="mb-10 text-xl font-normal uppercase">
        {t("product.similarItems")}
      </h2>
      <div
        className="overflow-x-auto overscroll-x-contain border-l border-t border-(--line)"
        aria-label={t("product.similarItems")}
      >
        <div className="flex min-w-max">
          {products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              priority={false}
              compact
              className="w-70 shrink-0 sm:w-80"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
