"use server";

import { t } from "@/lib/i18n";
import type { ProductDetail, ProductListItem } from "@/lib/types";

const API_URL =
  process.env.MOBILE_STORE_API_URL ??
  "https://prueba-tecnica-api-tienda-moviles.onrender.com";

const API_KEY =
  process.env.MOBILE_STORE_API_KEY ?? "87909682e6cd74208f41a6ef39fe4191";

async function fetchFromApi<T>(path: string, searchParams?: URLSearchParams) {
  const url = new URL(path, API_URL);

  if (searchParams) {
    url.search = searchParams.toString();
  }

  const response = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(t("errors.productsLoad"));
  }

  return response.json() as Promise<T>;
}

export async function searchProducts(search = "") {
  const params = new URLSearchParams({
    limit: "20",
    offset: "0",
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  return fetchFromApi<ProductListItem[]>("/products", params);
}

export async function getProductById(id: string) {
  return fetchFromApi<ProductDetail>(`/products/${id}`);
}
