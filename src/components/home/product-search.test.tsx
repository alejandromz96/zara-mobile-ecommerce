import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProductSearch } from "./product-search";

const replace = vi.fn();
let pathname = "/products";
let currentSearch = "";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ replace }),
  useSearchParams: () => ({
    get: (key: string) => (key === "search" ? currentSearch : null),
  }),
}));

describe("ProductSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    replace.mockReset();
    pathname = "/products";
    currentSearch = "";
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the initial search and result count", () => {
    render(<ProductSearch initialSearch="iphone" resultsCount={3} />);

    expect(screen.getByRole("searchbox")).toHaveValue("iphone");
    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3 results")).toBeInTheDocument();
  });

  it("only shows the clear button when the search has text", () => {
    render(<ProductSearch initialSearch="" resultsCount={0} />);

    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Pixel" },
    });

    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument();
  });

  it("clears the search input from the clear button", () => {
    render(<ProductSearch initialSearch="iphone" resultsCount={3} />);

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("debounces router updates for new searches", () => {
    render(<ProductSearch initialSearch="" resultsCount={0} />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Pixel 9" },
    });

    expect(replace).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(replace).toHaveBeenCalledWith("/products?search=Pixel%209");
  });

  it("does not navigate when the trimmed search has not changed", () => {
    currentSearch = "iphone";
    render(<ProductSearch initialSearch="iphone" resultsCount={1} />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "  iphone  " },
    });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(replace).not.toHaveBeenCalled();
  });
});
