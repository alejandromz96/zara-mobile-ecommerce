import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProductById, searchProducts } from "./products";
import type { ProductDetail, ProductListItem } from "@/lib/types";

const fetchMock = vi.fn<typeof fetch>();

vi.stubGlobal("fetch", fetchMock);

const products: ProductListItem[] = [
  {
    id: "iphone-16",
    brand: "Apple",
    name: "iPhone 16",
    basePrice: 959,
    imageUrl: "/iphone.jpg",
  },
];

const product: ProductDetail = {
  ...products[0],
  description: "A phone",
  rating: 4.8,
  specs: {
    screen: "6.1 inches",
    resolution: "2556 x 1179",
    processor: "A18",
    mainCamera: "48 MP",
    selfieCamera: "12 MP",
    battery: "22 h",
    os: "iOS",
    screenRefreshRate: "60 Hz",
  },
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
};

function okJsonResponse<T>(data: T) {
  return {
    ok: true,
    json: () => Promise.resolve(data),
  } as Response;
}

describe("product actions", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("searches products with pagination, trimmed search and API headers", async () => {
    fetchMock.mockResolvedValueOnce(okJsonResponse(products));

    await expect(searchProducts("  iphone  ")).resolves.toEqual(products);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];

    expect(String(url)).toBe(
      "https://prueba-tecnica-api-tienda-moviles.onrender.com/products?limit=20&offset=0&search=iphone",
    );
    expect(init).toMatchObject({
      headers: {
        "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
      },
      next: {
        revalidate: 300,
      },
    });
  });

  it("omits the search parameter when the search is empty", async () => {
    fetchMock.mockResolvedValueOnce(okJsonResponse(products));

    await searchProducts("   ");

    expect(String(fetchMock.mock.calls[0][0])).toBe(
      "https://prueba-tecnica-api-tienda-moviles.onrender.com/products?limit=20&offset=0",
    );
  });

  it("loads product details by id", async () => {
    fetchMock.mockResolvedValueOnce(okJsonResponse(product));

    await expect(getProductById("iphone-16")).resolves.toEqual(product);

    expect(String(fetchMock.mock.calls[0][0])).toBe(
      "https://prueba-tecnica-api-tienda-moviles.onrender.com/products/iphone-16",
    );
  });

  it("throws a user-facing error when the API response is not ok", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    } as Response);

    await expect(searchProducts()).rejects.toThrow(
      "Products could not be loaded from the API.",
    );
  });
});
