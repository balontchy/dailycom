"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProduct } from '../../../../type';
import { useParams } from 'next/navigation';
import productJson from '../../../../product.json';
import Image from 'next/image';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState<number | null>(null);

  useEffect(() => {
    // Make sure we have an ID before fetching
    if (!id) return;

    async function fetchProduct() {
      setLoading(true);
      const response = productJson.products.find(product => product.id === id);
      setProduct(response as IProduct);
      
      // Initialize with default size if available
      if (response && response.sizes && response.sizes.length > 0) {
        setSelectedSize(response.sizes[0].name);
        setCurrentPrice(response.sizes[0].price);
        setCurrentOriginalPrice(response.sizes[0].originalPrice || null);
      } else {
        setCurrentPrice(response ? response.price : 0);
        setCurrentOriginalPrice(response ? response.originalPrice : null);
      }
      
      setError(null);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  // Handle size change
  const handleSizeChange = (sizeName: string) => {
    if (!product || !product.sizes) return;
    
    const size = product.sizes.find(s => s.name === sizeName);
    if (size) {
      setSelectedSize(sizeName);
      setCurrentPrice(size.price);
      setCurrentOriginalPrice(size.originalPrice || null);
    }
  };
  // Handle color change
  const handleColorChange = (color: string) => {
    if (!product || !product.sizes) return;
    
    const size = product.colors && product.colors.find(s => s === color);
    if (size) {
      setSelectedColor(color);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Add to cart function
  const addToCart = () => {
    alert(`Added ${quantity} ${product?.name} (Size: ${selectedSize}) to cart`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 my-20">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl text-red-600 dark:text-red-400 mb-4">Error: {error}</h1>
      <Link href="/products" className="text-blue-600 dark:text-blue-400 hover:underline">
        Back to all products
      </Link>
    </div>
  );

  if (!product) return null;

  // Calculate discount percentage if originalPrice exists
  const discountPercentage = currentOriginalPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) 
    : 0;

  return (
    <div className="max-w-6xl min-h-screen  m-auto h-full flex flex-col mx-auto p-4 md:p-6 bg-neutral-100 dark:bg-gray-900 mt-30 mb-10 rounded-2xl">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all products
        </Link>
      </div>

      <div className="grid grid-cols-1 m-auto md:grid-cols-2 gap-8">
        {/* Product Image with gallery-like effect */}
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/30 rounded-lg overflow-hidden">
          <div className="relative h-96">
            {product.image ? (
              <Image 
                width={2000}
                height={2000}
                src={product.image} 
                alt={product.name} 
                className="object-contain w-full h-full p-4"
              />
            ) : (
              <div className="text-gray-400 dark:text-gray-500 flex items-center justify-center h-full">No image available</div>
            )}
          </div>
          
          {/* Thumbnail navigation could be added here if multiple images are available */}
          <div className="flex justify-center p-2 bg-gray-50 dark:bg-gray-700">
            <div className="w-16 h-16 border-2 border-blue-500 dark:border-blue-400 rounded-md overflow-hidden">
              {product.image && (
                <Image 
                  width={100}
                  height={100}
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            {/* Additional thumbnails would go here */}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/30 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{product.name}</h1>
          
          {/* Category */}
          {product.category && (
            <div className="mb-4">
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                {product.category}
              </span>
            </div>
          )}
          
          {/* Price display with optional original price */}
          <div className="flex items-center mb-6 mt-4">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              ${currentPrice.toFixed(2)}
            </div>
            
            {currentOriginalPrice && (
              <>
                <div className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                  ${currentOriginalPrice.toFixed(2)}
                </div>
                <div className="ml-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                  {discountPercentage}% off
                </div>
              </>
            )}
          </div>
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => handleSizeChange(size.name)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
               {/* Color Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors && product?.colors.map((color,key) => (
                  <button
                    key={key}
                    onClick={() => handleColorChange(color)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-l-md flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300"
                disabled={quantity <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 h-10 border-t border-b border-gray-300 dark:border-gray-600 text-center dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-r-md flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300"
                disabled={quantity >= 10}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-3">
            <h2 className="text-xl font-semibold dark:text-white flex gap-2">rating : <p className='text-yellow-600'>{product.rating}</p></h2>
            <h2 className="text-xl font-semibold dark:text-white flex gap-2">reviews : <p>{product.reviews}</p></h2>
          </div>
          {/* Description */}
          <div className="prose dark:prose-invert max-w-none mb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold dark:text-white">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            className="w-full py-3 px-6 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-150 flex items-center justify-center"
            onClick={addToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Product Details Footer */}
      <div className="mt-2 bg-white dark:bg-gray-800 px-10 py-6 rounded-2xl text-center border-t dark:border-gray-700 pt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.category && (
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Category</h3>
              <div className="font-medium dark:text-white">{product.category}</div>
            </div>
          )}
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Selected Size</h3>
            <div className="font-medium dark:text-white">{selectedSize || 'Standard'}</div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Subtotal</h3>
            <div className="font-bold text-2xl rounded-2xl text-black dark:text-white m-auto w-auto">${(currentPrice * quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}