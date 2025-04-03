"use client";
import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import DeliveryCompanyCard from '@/components/primative/delivries/DeliverCard';
import companies from '@/components/data/companyt';
export interface DeliveryCompany {
  id: number
  name: string
  description: string
  logo: string
  coverImage: string
  contact: Contact
  rating: number
  reviewCount: number
  foundedYear: number
  employees: string
  coverage: string
  internationalShipping: boolean
  trackingAvailable: boolean
  insurance: string
  paymentMethods: string[]
  serviceTypes: string[]
  certifications: string[]
  averageDeliveryTime: string
  theme: string
  buttonTheme: string
  pricing: Pricing
  customerReviews: CustomerReview[]
}
export interface Contact {
  phone: string
  email: string
  website: string
  address: string
}
export interface CustomerReview {
  name: string
  rating: number
  date: string
  comment: string
}
export interface Pricing {
  [city: string]: {
    price: string
    deliveryTime: string
  }
}
// Delivery Company Card Component

// Main Dashboard Component
const DeliveryCompaniesDashboard = () => {
  // Sample delivery companies data
 

  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [coverageFilter, setCoverageFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  
  const itemsPerPage = 4;
  
  // Filter the data based on search and filter criteria
  const filteredData = companies.filter(company => {
    return (
      (company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       company.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (coverageFilter === "" || company.coverage.includes(coverageFilter)) &&
      (ratingFilter === "" || company.rating >= parseFloat(ratingFilter))
    );
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setCoverageFilter("");
    setRatingFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-30 bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-200 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Delivery Companies in Morocco</h1>
              <p className="text-stone-500 dark:text-stone-400 mt-1">Find the right delivery service for your needs</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center">
                <Globe className="mr-2" size={16} />
                Compare Services
              </button>
            </div>
          </div>
          
          {/* Search and Filter Section */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500" size={18} />
                <input
                  type="text"
                  placeholder="Search by company name or description..."
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <select
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={coverageFilter}
                onChange={(e) => setCoverageFilter(e.target.value)}
              >
                <option value="">All Coverage Areas</option>
                <option value="Morocco">Domestic (Morocco)</option>
                <option value="international">International</option>
              </select>
            </div>
            
            <div>
              <select
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={resetFilters}
              className="flex items-center px-4 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-lg text-stone-700 dark:text-stone-200 text-sm"
            >
              <Filter className="mr-2" size={16} />
              Reset Filters
            </button>
          </div>
        </header>
        
        {/* Delivery Companies Grid */}
        {currentItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            {currentItems.map((company) => (
              <DeliveryCompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-10 text-center">
            <p className="text-stone-500 dark:text-stone-400 text-lg">No delivery companies match your filters</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Pagination Controls */}
        {filteredData.length > 0 && (
          <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-4 flex items-center justify-between">
            <div className="text-sm text-stone-600 dark:text-stone-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} companies
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? 'text-stone-400 dark:text-stone-600 cursor-not-allowed' : 'text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="text-sm font-medium text-stone-700 dark:text-stone-200">
                Page {currentPage} of {totalPages}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'text-stone-400 dark:text-stone-600 cursor-not-allowed' : 'text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryCompaniesDashboard;