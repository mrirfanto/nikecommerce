import Image from "next/image";
import Link from "next/link";

import { Product } from "@shared/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="cursor-pointer hover:shadow-lg">
        <div className="w-full sm:h-[120px] lg:h-[240px] relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:opacity-95 transition-opacity duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
