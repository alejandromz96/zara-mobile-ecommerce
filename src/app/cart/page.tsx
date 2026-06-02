import { CartView } from "@/components/cart/cart-view";
import { SiteHeader } from "@/components/common/site-header";

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CartView />
      </main>
    </>
  );
}
