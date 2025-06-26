import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProductGrid from ".";
import { mockProducts } from "@/shared/config/mockData";

describe("ProductGrid", () => {
  it("should render empty state accordingly", () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("should render accordingly when product list is not empty", () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getAllByRole("link")).not.toHaveLength(0);
    expect(screen.queryByText("No products found")).toBeNull();
  });
});
