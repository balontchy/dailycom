"use client";
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IProduct } from '../../../../type';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';


export default function ProductMain({ filteredProduct }: { filteredProduct: IProduct[] }) {
  const PaginatedProductList: React.FC<{ products: IProduct[] }> = ({
    products,
  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const router = useRouter();

    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="w-full h-full flex flex-col items-center">
        <Card className="px-6">
          <div className="grid w-full min-h-screen grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => router.push(`/products/${product.id}`)}
              />
            ))}
          </div>
        </Card>

        <div className=" flex space-x-2 my-10">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-600 dark:bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-600 dark:bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className=" w-full min-h-screen h-full flex justify-center py-10 items-center">
      <PaginatedProductList products={filteredProduct} />
    </div>
  );
}
