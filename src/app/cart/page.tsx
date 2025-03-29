"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Check, 
  // Trash2, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import CardSelected from '../../components/primative/cart/cardSelected';
import cartItems from '../../../product.json';
import { IProduct } from '../../../type';
import MainCard from '@/components/primative/cart/mainCard';

function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 5;
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cartItems.products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(cartItems.products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSelectProduct = (product: IProduct) => {
    setSelectedProducts(prev => 
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => total + product.price, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="
      w-full 
      
      min-h-screen 
      dark:to-gray-800 
      py-16 
      px-4
      mt-20
    ">
      <div className="
        max-w-6xl 
        mx-auto 
        flex 
        flex-col 
        lg:flex-row 
        gap-8
      ">
        {/* Product List Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="
            lg:w-2/3 
            w-full 
            bg-white 
            dark:bg-gray-800 
            rounded-3xl 
            shadow-2xl 
            p-8
          "
        >
          <div className="flex items-center mb-8 space-x-4">
            <ShoppingCart className="text-blue-600 dark:text-blue-400" size={36} />
            <h1 className="
              text-3xl 
              font-bold 
              text-gray-800 
              dark:text-white
            ">
              Shopping Cart
            </h1>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MainCard
                    product={product}
                    onSelect={() => toggleSelectProduct(product)}
                    onRemove={() => toggleSelectProduct(product)}
                    isSelected={selectedProducts.some((p) => p.id === product.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="
            flex 
            justify-center 
            items-center 
            mt-8 
            space-x-2
          ">
            <motion.button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="
                p-2 
                bg-gray-200 
                dark:bg-gray-700 
                rounded-full 
                disabled:opacity-50
              "
            >
              <ChevronLeft />
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <motion.button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  px-4 
                  py-2 
                  rounded-full 
                  font-medium 
                  transition-colors 
                  duration-200 
                  ${currentPage === pageNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {pageNumber}
              </motion.button>
            ))}

            <motion.button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="
                p-2 
                bg-gray-200 
                dark:bg-gray-700 
                rounded-full 
                disabled:opacity-50
              "
            >
              <ChevronRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Selected Items Section */}
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="
              lg:w-1/2
              w-full 
              bg-white 
              dark:bg-gray-800 
              rounded-3xl 
              shadow-2xl 
              p-8 
              px-2
              flex 
              flex-col
            "
          >
            <div className="flex items-center mb-6 space-x-4">
              <Check className="text-green-600 dark:text-green-400" size={36} />
              <h2 className="
                text-2xl 
                font-semibold 
                text-gray-800 
                dark:text-white
              ">
                Selected Items
              </h2>
            </div>

            <div className="
              flex 
              flex-col 
              gap-4 
              overflow-y-auto 
              max-h-[500px] 
              pr-2
            ">
              <AnimatePresence>
                {selectedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardSelected
                      product={product}
                      onSelect={() => toggleSelectProduct(product)}
                      onRemove={() => toggleSelectProduct(product)}
                      isSelected={true}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="
              mt-6 
              pt-4 
              border-t 
              dark:border-gray-700
            ">
              <div className="
                flex 
                justify-between 
                items-center 
                mb-4
              ">
                <h3 className="
                  text-xl 
                  font-semibold 
                  text-gray-800 
                  dark:text-white
                ">
                  Total Price:
                </h3>
                <span className="
                  text-xl 
                  font-bold 
                  text-green-600 
                  dark:text-green-400
                ">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  w-full 
                  bg-gradient-to-r 
                  from-green-500 
                  to-emerald-600 
                  text-white 
                  font-bold 
                  py-3 
                  px-6 
                  rounded-xl 
                  transition 
                  duration-300 
                  flex 
                  items-center 
                  justify-center 
                  space-x-2
                  hover:shadow-lg
                "
              >
                <CreditCard size={24} />
                <span>Finalize Purchase</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Page;