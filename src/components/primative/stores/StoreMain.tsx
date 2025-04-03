"use client";
import React, { useState } from 'react';
import { Filter, Search,  } from 'lucide-react';
import storesData from '../../../../json/stores.json';
import StoreCard from './StoreCard';

// Store data type
export interface StoreData {
  id:number;
  name: string;
  image: string;
  description: string;
  address: string;
  rating: number;
  contact: {
    phone: string;
    email: string;
  };
  categories: string[];
  opening_hours: {
    [key: string]: string | undefined;
  };
  verified: boolean;
}




// Store Listing Page
const StoreMain: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of stores per page

  // Get unique categories
  const allCategories = Array.from(
    new Set(storesData.stores.flatMap(store => store.categories))
  );

  // Filter stores
  const filteredStores = storesData.stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || 
     selectedCategories.some(cat => store.categories.includes(cat)))
  );

  // Paginate stores
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mt-30 text-center">
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bold text-2xl mb-4">
            استكشف شبكتنا من المتاجر المذهلة التي تقدم مجموعة واسعة من المنتجات والخدمات
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col  justify-between items-center space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="relative flex justify-around gap-2 align-middle items-center w-full max-w-md mb-3">
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Filter className="text-gray-500 mx-2" size={20} />
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2 bg-gray-100 dark:bg-gray-950 w-auto  scroll-p-2  overflow-x-auto rounded-full p-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`
                    px-3 py-1 rounded-full text-sm transition-all
                    ${
                      selectedCategories.includes(category)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedStores.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))}
        </div>

        {/* No Results */}
        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
              No stores found
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-500">
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredStores.length > itemsPerPage && (
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                } hover:bg-blue-400 dark:hover:bg-blue-600`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreMain;