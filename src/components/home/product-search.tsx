"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  useEffect,
  useId,
  useState,
  useTransition,
} from "react";
import { buildProductSearchUrl } from "@/lib/search";
import { t } from "@/lib/i18n";

type ProductSearchProps = {
  initialSearch?: string;
  resultsCount: number;
};

export function ProductSearch({
  initialSearch = "",
  resultsCount,
}: ProductSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const searchInputId = useId();
  const [query, setQuery] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextUrl = buildProductSearchUrl({
        currentSearch,
        pathname,
        query,
      });

      if (!nextUrl) {
        return;
      }

      startTransition(() => {
        router.replace(nextUrl);
      });
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [currentSearch, pathname, query, router]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleClear() {
    setQuery("");
  }

  return (
    <div className="flex flex-col gap-4 pb-12 sm:pb-16">
      <div className="flex flex-col">
        <label className="sr-only" htmlFor={searchInputId}>
          {t("search.label")}
        </label>
        <span className="relative block">
          <input
            id={searchInputId}
            type="search"
            value={query}
            onChange={handleChange}
            placeholder={t("search.placeholder")}
            className="h-12 w-full border-0 border-b border-black bg-transparent px-0 pr-10 text-base outline-none placeholder:text-[#b6b6b6] focus:border-b-2"
          />
          {query.length > 0 ? (
            <button
              type="button"
              aria-label={t("search.clear")}
              onClick={handleClear}
              className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M9.22887 9.36147L6 12.4289L6.62613 13.0237L9.855 9.95629L13.0839 13.0237L13.71 12.4289L10.4811 9.36147L13.71 6.29404L13.0839 5.69922L9.855 8.76664L6.62613 5.69922L6 6.29404L9.22887 9.36147Z"
                  fill="black"
                />
              </svg>
            </button>
          ) : null}
        </span>
      </div>

      <div className="text-xs uppercase">
        <p aria-live="polite">
          {isPending
            ? t("search.pending")
            : t("search.results", { count: resultsCount })}
        </p>
      </div>
    </div>
  );
}
