import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getProductById } from "@/app/actions/products";
import { SiteHeader } from "@/components/common/site-header";
import { ProductDetail } from "@/components/product-detail/product-detail";
import { ProductSimilarItems } from "@/components/product-detail/product-similar-items";
import { t } from "@/lib/i18n";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function findProduct(id: string) {
  try {
    return await getProductById(id);
  } catch {
    notFound();
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await findProduct(id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase">
          <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          {t("common.back")}
        </Link>
        <ProductDetail product={product} />

        <ProductSimilarItems products={product.similarProducts} />
      </main>
    </>
  );
}
