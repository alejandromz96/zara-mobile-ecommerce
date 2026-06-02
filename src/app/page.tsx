import { searchProducts } from "@/app/actions/products";
import { ProductGrid } from "@/components/common/product-grid";
import { SiteHeader } from "@/components/common/site-header";
import { ProductSearch } from "@/components/home/product-search";

type HomePageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search = "" } = await searchParams;
  const products = await searchProducts(search);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ProductSearch initialSearch={search} resultsCount={products.length} />
        <ProductGrid products={products} />
      </main>
    </>
  );
}
