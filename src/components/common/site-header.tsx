import Image from "next/image";
import Link from "next/link";
import { CartCounter } from "@/components/common/cart-counter";
import { t } from "@/lib/i18n";

export function SiteHeader() {
  return (
    <header className="bg-[var(--background)]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label={t("common.homeAriaLabel")}
        >
          <Image
            src="/mbst-logo.svg"
            alt="MBST"
            width={77}
            height={29}
            priority
          />
        </Link>

        <Link
          href="/cart"
          className="inline-flex min-h-10 items-center px-2 text-sm"
          aria-label={t("common.cartAriaLabel")}
        >
          <CartCounter />
        </Link>
      </nav>
    </header>
  );
}
