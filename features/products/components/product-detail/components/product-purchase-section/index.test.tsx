import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductPurchaseSection from './index';
import { mockProducts } from '@/shared/config/mockData';

const PRODUCT_ID = mockProducts[0].id;
const PRODUCT = mockProducts[0];
const OUT_OF_STOCK_PRODUCT = { ...PRODUCT, stock: 0 };

function mockFetch(response: any, ok = true) {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    json: async () => response,
  }) as any;
}

describe('ProductPurchaseSection', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render loading skeletons while fetching product data', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByRole('status', { hidden: true })).not.toBeInTheDocument(),
    );
  });

  it('should display an error message if product data cannot be loaded', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load pricing information/i)).toBeInTheDocument();
    });
  });

  it('should display the correct product price when data is loaded', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await waitFor(() => {
      expect(screen.getByText(`$${PRODUCT.price}`)).toBeInTheDocument();
    });
  });

  it('should allow incrementing and decrementing quantity within valid limits', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await screen.findByText(`$${PRODUCT.price}`);

    const incrementBtn = screen.getAllByRole('button')[1]; // Plus button
    const decrementBtn = screen.getAllByRole('button')[0]; // Minus button
    const qty = () => screen.getByText('1');

    // Increment
    await userEvent.click(incrementBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    // Decrement
    await userEvent.click(decrementBtn);
    expect(qty()).toBeInTheDocument();
  });

  it('should disable decrement button when quantity is 1', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await screen.findByText(`$${PRODUCT.price}`);

    const decBtn = screen.getAllByRole('button')[0];
    expect(decBtn).toBeDisabled();
  });

  it('should disable increment button when quantity equals product stock', async () => {
    const lowStockProduct = { ...PRODUCT, stock: 2 };

    mockFetch(lowStockProduct);

    render(<ProductPurchaseSection productId={lowStockProduct.id} />);

    await screen.findByText(`$${lowStockProduct.price}`);
    const incBtn = screen.getAllByRole('button')[1];

    await userEvent.click(incBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(incBtn).toBeDisabled();
  });

  it('should display "In Stock" with correct count if stock > 0', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await screen.findByText(`$${PRODUCT.price}`);
    expect(screen.getByText(`In Stock (${PRODUCT.stock} available)`)).toBeInTheDocument();
  });

  it('should display "Out of Stock" if stock is 0', async () => {
    mockFetch(OUT_OF_STOCK_PRODUCT);

    render(<ProductPurchaseSection productId={OUT_OF_STOCK_PRODUCT.id} />);

    await screen.findByText(/Out of Stock/i);
    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });

  it('should enable Add to Cart button when product is in stock', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await screen.findByText(`$${PRODUCT.price}`);
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });

    expect(addToCartBtn).toBeEnabled();
  });

  it('should disable Add to Cart button when product is out of stock', async () => {
    mockFetch(OUT_OF_STOCK_PRODUCT);

    render(<ProductPurchaseSection productId={OUT_OF_STOCK_PRODUCT.id} />);

    await screen.findByText(/Out of Stock/i);
    const addToCartBtn = screen.getByRole('button', { name: /out of stock/i });

    expect(addToCartBtn).toBeDisabled();
  });

  it('should render correct button text based on stock status', async () => {
    mockFetch(PRODUCT);

    render(<ProductPurchaseSection productId={PRODUCT_ID} />);

    await screen.findByText(`$${PRODUCT.price}`);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();

    mockFetch(OUT_OF_STOCK_PRODUCT);

    render(<ProductPurchaseSection productId={OUT_OF_STOCK_PRODUCT.id} />);

    await screen.findByText(/Out of Stock/i);
    expect(screen.getByRole('button', { name: /out of stock/i })).toBeInTheDocument();
  });
});
