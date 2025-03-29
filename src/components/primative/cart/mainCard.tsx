import React from 'react';
import { IProduct } from '../../../../type';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Trash2, ShoppingCart } from 'lucide-react';

interface MainCardProps {
  product: IProduct;
  onSelect: (product: IProduct, isSelected: boolean) => void;
  onRemove: (product: IProduct) => void;
  isSelected: boolean;
}

const MainCard: React.FC<MainCardProps> = ({ 
  product, 
  onSelect, 
  onRemove, 
  isSelected 
}) => {
  const handleSelect = () => {
    onSelect(product, !isSelected);
  };

  const handleRemove = () => {
    onRemove(product);
  };

  return (
    <motion.div 
      className={`
        relative 
        flex 
        flex-col
        items-center 
        justify-between 
        p-4 
        rounded-2xl 
        shadow-md 
        transition-all 
        duration-300 
        w-full 
        min-h-70
        ${isSelected 
          ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800' 
          : 'bg-gray-200 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700'
        }
      `}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
    stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Product Image */}
      <div className="relative">
        <Image
          width={80}
          height={80}
          src={product.image as string}
          alt={product.name}
          className="
            rounded-xl 
            object-cover 
            transition-all 
            duration-300 
            group-hover:scale-105 
            w-full 
            h-full 
            m-auto
            border-2 
            border-white 
            dark:border-gray-700 
            shadow-sm
          "
        />
        {isSelected && (
          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
            <Check size={12} strokeWidth={3} />
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="
          text-md 
          font-bold 
          text-gray-800 
          dark:text-white 
          mb-1 
          transition-colors 
          group-hover:text-green-600
        ">
          {product.name}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Price: <span className="font-semibold">${product.price}</span></p>
          <p>Quantity: <span className="font-semibold">{product.quantity}</span></p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <motion.button
          onClick={handleSelect}
          className={`
            flex 
            items-center 
            justify-center 
            space-x-1 
            px-3 
            py-2 
            rounded-full 
            font-semibold 
            transition-all 
            duration-300 
            text-sm
            ${isSelected 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSelected ? <Check size={16} /> : <ShoppingCart size={16} />}
          <span>{isSelected ? 'Selected' : 'Select'}</span>
        </motion.button>

        <motion.button
          onClick={handleRemove}
          className="
            flex 
            items-center 
            justify-center 
            space-x-1 
            px-3 
            py-2 
            bg-red-500 
            text-white 
            rounded-full 
            hover:bg-red-600 
            transition-all 
            duration-300
            text-sm
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MainCard;