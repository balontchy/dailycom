import React from 'react';
import Image from 'next/image';
import { Clock, MapPin, Star } from 'lucide-react';
import { DeliveryCompany } from '@/app/deliveries/page';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar } from '@radix-ui/react-avatar';

const DeliveryCompanyCard = ({ company }: { company: DeliveryCompany }) => {
  return (
    <Card className='flex flex-col justify-between w-full h-full bg-white dark:bg-black border dark:border-neutral-700 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl'>
      <CardHeader className={`bg-gradient-to-r ${company.theme} p-5`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{company.name}</h2>
          <Avatar>
            <Image
              width={40}
              height={40}
              src="/next.svg"
              alt={`${company.name} Logo`}
              className="h-8 w-8 rounded-full"
            />
          </Avatar>
        </div>
        <p className="text-white text-opacity-90 mt-1 text-sm">
          {company.description}
        </p>
      </CardHeader>

      <CardContent className="">
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

        <Link
          className={` mt-5 flex items-center justify-center w-full py-2 ${company.buttonTheme} text-white text-sm font-medium rounded-lg transition-colors`}
          href={`/deliveries/${company.id}`}
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default DeliveryCompanyCard;