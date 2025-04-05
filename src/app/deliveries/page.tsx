"use client";
import React, { useState } from 'react';
import { Filter, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import DeliveryCompanyCard from "@/components/primative/delivries/DeliverCard";
import companies from "@/components/data/companyt";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export interface DeliveryCompany {
  id: number;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  contact: Contact;
  rating: number;
  reviewCount: number;
  foundedYear: number;
  employees: string;
  coverage: string;
  internationalShipping: boolean;
  trackingAvailable: boolean;
  insurance: string;
  paymentMethods: string[];
  serviceTypes: string[];
  certifications: string[];
  averageDeliveryTime: string;
  theme: string;
  buttonTheme: string;
  pricing: Pricing;
  customerReviews: CustomerReview[];
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
    <Card className="min-h-screen h-full p-4">
      <div className="max-w-6xl mx-auto my-30 border p-10 rounded-md">
        <header className=" rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
                Delivery Companies in Morocco
              </h1>
              <p className="text-stone-500 dark:text-stone-400 mt-1">
                Find the right delivery service for your needs
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <Globe className="mr-2" size={16} />
                Compare Services
              </Button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="البحث عن شركات التوصيل بالاسم او وصف الشركة ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Select value={coverageFilter} onValueChange={setCoverageFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر جهة التوصيل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel></SelectLabel>
                    <SelectItem value="Morocco">المغرب</SelectItem>
                    <SelectItem value="international">كل العالم</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
             
            </div>

            <div>
              <Select
                value={ratingFilter}
                onValueChange={(value) => setRatingFilter(value)}
              >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectGroup>
              </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={resetFilters}
            >
              <Filter className="mr-2" size={16} />
              Reset Filters
            </Button>
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
            <p className="text-stone-500 dark:text-stone-400 text-lg">
              No delivery companies match your filters
            </p>
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} companies
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-stone-400 dark:text-stone-600 cursor-not-allowed"
                    : "text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="text-sm font-medium text-stone-700 dark:text-stone-200">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-stone-400 dark:text-stone-600 cursor-not-allowed"
                    : "text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DeliveryCompaniesDashboard;