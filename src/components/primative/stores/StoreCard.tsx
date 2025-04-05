import React from 'react'
import { Star, MapPin, Phone, Clock, Verified, Fingerprint } from 'lucide-react';
import Image from 'next/image';
import { StoreData } from './StoreMain';
import Link from 'next/link';
// Store Card Component
const StoreCard  = ({ store }: { store: StoreData }) => {
const [showVerfied, setShowVerified] = React.useState(false);

  return (
    <Link href={`stores/${store.id}`}
     className="bg-white dark:bg-black border dark:border-neutral-700 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Store Image */}
      <div className="relative h-48 w-full">
        <Image
          width={400}
          height={400}
          src={store.image}
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="text-sm dark:text-black font-semibold">
            {store.rating}
          </span>
        </div>
      </div>

      {/* Store Details */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {store.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {store.description}
        </p>
        {store.verified && (
          <div
            onMouseEnter={() => setShowVerified(true)}
            onMouseLeave={() => setShowVerified(false)}
            className="absolute bottom-3 right-3  w-auto px-3 py-2 text-center border shadow-md rounded-full  flex items-center aling-middle justify-center space-x-1"
          >
            <div className="flex jusitfy-center dark:text-white text-dark items-center align-middle space-x-1">
              <div className="text-sm italic w-full mt-1">
                Verifeid
              </div>
              {store.verified ? (
                <Verified className=" text-sm w-full h-full   " />
              ) : null}
            </div>
          </div>
        )}
        {showVerfied && (
          <div className="flex flex-col gap-1 align-middle  justify-center items-center text-sm text-green-800 dark:text-green-300 text-center  p-2 fixed  right-1  bottom-16 ">
            Verified by
            <div className="flex  justify-center items-center text-sm align-middle space-x-1 px-2 gap-1 p-1 border shadow-md rounded-full text-amber-600">
              <Fingerprint className="text-amber-500" />
              DailySafe
            </div>
          </div>
        )}

        {/* Store Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="text-gray-500" size={18} />
            <span className="text-sm">{store.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="text-gray-500" size={18} />
            <span className="text-sm">{store.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-500" size={18} />
            <span className="text-sm">
              {Object.entries(store.opening_hours)[0][1]}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap gap-2">
          {store.categories.map((category) => (
            <span
              key={category}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};


export default StoreCard