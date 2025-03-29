import React from 'react';
import { IProduct } from '../../../../type';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Trash2, ShoppingCart } from 'lucide-react';

interface CardSelectedProps {
  product: IProduct;
  onSelect: (product: IProduct, isSelected: boolean) => void;
  onRemove: (product: IProduct) => void;
  isSelected: boolean;
}

const CardSelected: React.FC<CardSelectedProps> = ({ 
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
        items-center 
        justify-between 
        p-5 
        rounded-2xl 
        shadow-lg 
        transition-all 
        duration-300 
        group 
        w-full 
        max-w-md 
        ${isSelected 
          ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
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
      {/* Product Image and Details */}
      <div className="flex items-center space-x-5">
        <div className="relative">
          <Image
            width={100}
            height={100}
            src={product.image as string}
            alt={product.name}
            className="
              rounded-xl 
              object-cover 
              transition-transform 
              duration-300 
              group-hover:scale-105
              w-24 
              h-24
            "
          />
          {isSelected && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
              <Check size={16} strokeWidth={3} />
            </div>
          )}
        </div>
        
        <div>
          <h3 className="
            text-xl 
            font-bold 
            text-gray-800 
            dark:text-white 
            mb-1 
            transition-colors 
            group-hover:text-green-600
          ">
            {product.name}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>Price: <span className="font-semibold">${product.price}</span></p>
            <p>Quantity: <span className="font-semibold">{product.quantity}</span></p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <motion.button
          onClick={handleSelect}
          className={`
            flex 
            items-center 
            justify-center 
            space-x-2 
            px-4 
            py-2 
            rounded-full 
            font-semibold 
            transition-all 
            duration-300 
            ${isSelected 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSelected ? <Check size={20} /> : <ShoppingCart size={20} />}
          <span>{isSelected ? 'Selected' : 'Select'}</span>
        </motion.button>

        <motion.button
          onClick={handleRemove}
          className="
            flex 
            items-center 
            justify-center 
            space-x-2 
            px-4 
            py-2 
            bg-red-500 
            text-white 
            rounded-full 
            hover:bg-red-600 
            transition-all 
            duration-300
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={20} />
          <span>Remove</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CardSelected;