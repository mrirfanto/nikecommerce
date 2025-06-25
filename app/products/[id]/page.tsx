export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Detail</h1>
      <div className="text-center py-12">
        <p className="text-gray-600">Product ID: {id}</p>
      </div>
    </div>
  );
}
