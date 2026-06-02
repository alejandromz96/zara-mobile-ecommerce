import { ProductCard } from "@/components/common/product-card";
import { t } from "@/lib/i18n";
import type { ProductListItem } from "@/lib/types";

type ProductGridProps = {
  products: ProductListItem[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-(--line) bg-(--surface) px-6 py-16 text-center text-sm uppercase text-(--muted)">
        {t("products.empty")}
      </div>
    );
  }

  return (
    <section
      className="grid grid-cols-1 border-l border-t border-(--line) sm:grid-cols-2 lg:grid-cols-3"
      aria-label={t("products.gridAriaLabel")}
    >
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}
          product={product}
          priority={index === 0}
        />
      ))}
    </section>
  );
}
