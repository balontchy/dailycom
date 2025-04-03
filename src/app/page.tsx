"use client";
import Hero from '@/components/primative/Products/Hero';
import { IProduct } from '../../type';


export default function Home() {

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mt-20 w-[80%] rounded-xl">
      <Hero onFilterChange={(filteredProducts: IProduct[]) => {
        console.log('Filtered products:', filteredProducts);
      }} />
      </div>
    </div>
  );
};
