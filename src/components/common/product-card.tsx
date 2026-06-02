import Image from "next/image";
import Link from "next/link";
import { formatCatalogPrice } from "@/lib/formatters";
import type { ProductListItem } from "@/lib/types";

type ProductCardProps = {
  product: ProductListItem;
  priority?: boolean;
  compact?: boolean;
  className?: string;
};

export function ProductCard({
  product,
  priority = false,
  compact = false,
  className = "",
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={`group relative isolate flex cursor-pointer flex-col overflow-hidden border-b border-r border-(--line) bg-(--surface) focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black ${
        compact ? "pt-5" : "min-h-86.25 sm:min-h-105"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100"
      />

      <div className="relative z-10 flex aspect-[1.18/1] items-center justify-center sm:aspect-[1.12/1]">
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          loading={priority ? undefined : "eager"}
          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="relative z-10 grid grid-cols-[1fr_auto] gap-3 px-4 pb-5 pt-2 text-xs uppercase sm:px-5">
        <p className="col-span-2 text-[10px] text-(--muted) transition-colors group-hover:text-[#b8b8b8]">
          {product.brand}
        </p>
        <h2 className="text-xs font-normal leading-snug transition-colors group-hover:text-white">
          {product.name}
        </h2>
        <p className="text-xs transition-colors group-hover:text-white">
          {formatCatalogPrice(product.basePrice)}
        </p>
      </div>
    </Link>
  );
}
