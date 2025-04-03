import React from 'react';
import Image from 'next/image';
import { Clock, MapPin, Star } from 'lucide-react';
import { DeliveryCompany } from '@/app/deliveries/page';
import Link from 'next/link';

const DeliveryCompanyCard = ({ company }: { company: DeliveryCompany }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full">
      <div className={`bg-gradient-to-r ${company.theme} p-5`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{company.name}</h2>
          <div className="bg-white dark:bg-gray-700 p-2 rounded-full">
            <Image
              width={40}
              height={40}
              src="/api/placeholder/40/40"
              alt={`${company.name} Logo`}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
        <p className="text-white text-opacity-90 mt-1 text-sm">
          {company.description}
        </p>
      </div>

      <div className="p-5">
        <div className="space-y-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {company.coverage}
            </span>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {company.averageDeliveryTime}
            </span>
          </div>

          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {company.rating} ({company.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* {company.cities && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Popular Destinations
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.cities.map((city, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        )} */}

          <Link
            className={` mt-5 flex items-center justify-center w-full py-2 ${company.buttonTheme} text-white text-sm font-medium rounded-lg transition-colors`}
            href={`/deliveries/${company.id}`}
          >
            View Details
          </Link>
      </div>
    </div>
  );
};

export default DeliveryCompanyCard;