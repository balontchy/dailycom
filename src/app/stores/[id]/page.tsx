"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {stores} from '../../../../json/stores.json'
import { StoreData } from '@/components/primative/stores/StoreMain';
import {products} from '../../../../json/product.json'
import { IProduct } from '../../../../type';
import Store from '@/components/primative/stores/Store';



const StoreDetailPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState<StoreData | null>(null);
  const [product, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    stores.find((store) => {
      if (store.id === Number(id)) {
        setStore(store as StoreData);
        return true;
      }
      // setError("Store not found");
      return false;
    });
  }, [id]);

  useEffect(() => {
    const storeProducts = products.filter(
      (product) => product.store === Number(id)
    );
    setProducts(storeProducts);
  }, [id, store]);


  return (
    <div className="w-[80%] m-auto flex flex-col  justify-center pt-30 align-middle items-center ">
          {store && <Store store={store} products={product} />}
    </div>
  );
};

export default StoreDetailPage;