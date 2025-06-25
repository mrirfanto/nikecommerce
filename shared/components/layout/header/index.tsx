import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Nikel E-Shop
          </Link>
          <nav className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
