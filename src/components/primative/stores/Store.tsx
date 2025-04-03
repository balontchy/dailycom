"use client";
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { StoreData } from './StoreMain';
import { IProduct } from '../../../../type';
import ProductMain from '../Products/ProductMain';

export default function Store({ store,products }: { store: StoreData,products:IProduct[] }) {
  return (
    <div className="  w-full mx-auto px-4 mb-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Store Header */}
        <div className="relative h-130 w-full">
          <Image
            src={store.image}
            alt={store.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="p-6">
          {/* Store Title and Rating */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {store.name}
              </h1>
              {store.verified && (
                <span className="ml-2 bg-green-100  text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-lg font-medium">{store.rating}</span>
            </div>
          </div>

          {/* Store Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {store.description}
          </p>

          {/* Store Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
                Location
              </h2>
              <p className="text-gray-600 dark:text-gray-200">
                {store.address}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800  dark:text-gray-300 mb-2">
                Contact
              </h2>
              <p className="text-gray-600  dark:text-gray-200">
                <strong>Phone:</strong> {store.contact.phone}
              </p>
              <p className="text-gray-600  dark:text-gray-200">
                <strong>Email:</strong> {store.contact.email}
              </p>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800  dark:text-gray-300 mb-2">
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {store.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800  dark:text-gray-200 mb-2">
                Opening Hours
              </h2>
              <ul className="space-y-1">
                {Object.entries(store.opening_hours).map(
                  ([day, hours], index) => (
                    <li
                      key={index}
                      className="text-gray-600  dark:text-gray-100"
                    >
                      <strong>{day}:</strong> {hours}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link
              href={"/stores"}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to All Stores
            </Link>
          </div>
        </div>
        <div className="w-[80%] m-auto flex flex-col  justify-center  align-middle items-center ">
          <ProductMain filteredProduct={products} />
        </div>
      </div>
    </div>
  );
}
