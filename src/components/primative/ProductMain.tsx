"use client";
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IProduct } from '../../../type';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';


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
      <div className="w-full flex flex-col items-center">
              <div className=" bg-white m-auto dark:bg-gray-900 w-full mb-10 flex flex-col justify-center align-middle items-center mt-3  rounded-2xl p-10">
        <div className="grid grid-cols-1 mt-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">

        { paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={() => router.push(`/products/${product.id}`)} />
        ))}
        </div>
      </div>

        <div className="mt-6 flex space-x-2">
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
