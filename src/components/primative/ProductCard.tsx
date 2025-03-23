"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "../../../type";

// Define the product interface
interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
  onSaveProduct?: (product: IProduct) => void;
  onQuickView?: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSaveProduct,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Calculate discount percentage if there's an original price
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? product.originalPrice && Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Event handlers with stopPropagation to prevent unwanted navigation
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setIsAdded(true);
      
      // Reset the added state after a delay
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleSaveProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSaveProduct) {
      onSaveProduct(product);
    }
    setIsSaved(!isSaved); // Toggle saved state
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };


  return (
    <Card 
      className="w-full max-w-xs border border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full z-10">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product image with hover effect */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.image as string}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Quick actions overlay */}
      <div
        className={`absolute top-0 left-0 right-0 h-48 bg-black/10 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-2">
          <button
            onClick={handleSaveProduct}
            className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Save product"
          >
            <Heart 
              size={16} 
              className={isSaved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"} 
            />
          </button>
          <button
            onClick={handleAddToCart}
            className={`${isAdded ? "bg-green-600" : "bg-neutral-800 dark:bg-neutral-700"} p-2 rounded-full shadow-md hover:bg-neutral-900 dark:hover:bg-neutral-600 transition-colors`}
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} className="text-white" />
          </button>
          <button
            onClick={handleQuickView}
            className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Quick view"
          >
            <Eye size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        {product.category && (
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            {product.category}
          </p>
        )}

        {/* Product name */}
        <Link 
          href={`/products/${product.id}`} 
          onClick={(e) => e.stopPropagation()}
          className="hover:underline"
        >
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price display */}
        <div className="mt-2 flex items-center">
          <p className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
            ${product.price.toFixed(2)}
          </p>
          {hasDiscount && (
            <p className="text-sm text-gray-400 dark:text-gray-500 line-through ml-2">
              ${product.originalPrice?.toFixed(2)}
            </p>
          )}
        </div>

        {/* Description (optional, limited to 2 lines) */}
        {product.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {product.description}
          </p>
        )}      
      </CardContent>
    </Card>
  );
};

export default ProductCard;