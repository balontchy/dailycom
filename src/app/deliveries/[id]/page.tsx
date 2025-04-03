"use client";
import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, Calendar, TrendingUp, Check, Heart, Globe, Truck, ShieldCheck, DollarSign, CreditCard, Award } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import companies from '@/components/data/companyt';

const DeliveryCompanyDetails = () => {
  const param = useParams();
  const router = useRouter();
  const companyDetails = companies.find(company => company.id === parseInt(param.id as string));
  const [isAdded, setIsAdded] = useState(false);

  // Toggle add/remove from main list
  const toggleAdd = () => {
    setIsAdded(!isAdded);
  };

  // Render stars for ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  // Handle back button (would normally use router navigation)
  const handleBack = () => {
    router.back();
    // In a real app: navigate(-1) or router.push('/dashboard')
  };

  if (!companyDetails) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Company details not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-stone-900">
      {/* Header with company branding */}
      <div className={`bg-gradient-to-r ${companyDetails.theme} pt-20 pb-10 px-6 dark:bg-stone-800`}>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center pt-10 text-white dark:text-stone-200 mb-6 hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to All Companies
          </button>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg mb-4 md:mb-0 md:mr-6 dark:bg-stone-700 dark:border-stone-600">
              <Image
                width={80}
                height={80}
                src={companyDetails.logo}
                alt={`${companyDetails.name} Logo`}
                className="h-16 w-16 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white dark:text-stone-200">{companyDetails.name}</h1>
              <p className="text-white text-opacity-90 mt-2 max-w-2xl dark:text-stone-300">{companyDetails.description}</p>
              <div className="flex items-center mt-3">
                <div className="flex mr-3">
                  {renderStars(companyDetails.rating)}
                </div>
                <span className="text-white font-medium dark:text-stone-200">{companyDetails.rating}</span>
                <span className="text-white text-opacity-75 ml-1 dark:text-stone-300">({companyDetails.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button
                onClick={toggleAdd}
                className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                  isAdded ? 'bg-white text-blue-700 dark:bg-stone-700 dark:text-blue-500' : 'bg-blue-500 text-white border border-white dark:border-stone-600'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Added to My List
                  </>
                ) : (
                  <>
                    <Heart size={18} className="mr-2" />
                    Add to My List
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Company Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-stone-800 dark:border-stone-700">
              <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-stone-200">Company Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Coverage Area</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.coverage}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Established</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.foundedYear}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Average Delivery Time</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.averageDeliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Company Size</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.employees} employees</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Insurance Coverage</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.insurance}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">International Shipping</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.internationalShipping ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-stone-600">
                <h3 className="text-lg font-medium text-gray-800 mb-3 dark:text-stone-200">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {companyDetails.serviceTypes.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm dark:bg-stone-700 dark:text-blue-500">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-stone-600">
                <h3 className="text-lg font-medium text-gray-800 mb-3 dark:text-stone-200">Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {companyDetails.paymentMethods.map((method, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-stone-700 dark:text-gray-300">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-stone-600">
                <h3 className="text-lg font-medium text-gray-800 mb-3 dark:text-stone-200">Certifications & Awards</h3>
                <div className="flex flex-wrap gap-2">
                  {companyDetails.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm dark:bg-stone-700 dark:text-green-500">
                      <Award size={14} className="mr-1" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-stone-800 dark:border-stone-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-stone-200">Pricing & Delivery Times</h2>
                <div className="text-sm text-blue-600 font-medium flex items-center dark:text-stone-300">
                  <DollarSign size={16} className="mr-1" />
                  Pricing Details
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-stone-600">
                      <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-stone-400">Destination</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-stone-400">Price</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-stone-400">Delivery Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(companyDetails.pricing).map(([city, info], index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-stone-600">
                        <td className="py-3 px-4 text-gray-800 dark:text-stone-200">{city}</td>
                        <td className="py-3 px-4 text-gray-800 font-medium dark:text-stone-200">{info.price}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-stone-300">{info.deliveryTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4 dark:text-stone-400">
                * Prices may vary based on package weight and dimensions. Additional fees may apply for special handling or express services.
              </p>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 dark:bg-stone-800 dark:border-stone-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-stone-200">Customer Reviews</h2>
                <div className="text-sm text-blue-600 font-medium dark:text-stone-300">View all {companyDetails.reviewCount} reviews</div>
              </div>
              <div className="space-y-5">
                {companyDetails.customerReviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0 dark:border-stone-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-stone-200">{review.name}</div>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-stone-400">{review.date}</div>
                    </div>
                    <p className="text-gray-600 mt-2 dark:text-stone-300">{review.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium dark:border-stone-600 dark:text-stone-300">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Contact & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-stone-800 dark:border-stone-700">
              <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-stone-200">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Phone</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Email</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Website</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.contact.website}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5 dark:text-stone-300" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-stone-400">Address</h3>
                    <p className="text-gray-800 dark:text-stone-200">{companyDetails.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 dark:bg-stone-800 dark:border-stone-700">
              <h2 className="text-lg font-bold text-gray-800 mb-4 dark:text-stone-200">Quick Actions</h2>
              <div className="space-y-3">
                <button className={`w-full py-3 ${companyDetails.buttonTheme} text-white font-medium rounded-lg transition-colors flex items-center justify-center dark:bg-stone-700 dark:text-blue-500`}>
                  <Truck className="mr-2" size={18} />
                  Track a Package
                </button>
                <button className="w-full py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center dark:border-stone-600 dark:text-stone-300">
                  <CreditCard className="mr-2" size={18} />
                  Get a Quote
                </button>
                <button className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center dark:bg-stone-700 dark:text-gray-300">
                  <Mail className="mr-2" size={18} />
                  Contact Support
                </button>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl shadow-md p-6 dark:bg-stone-800 dark:border-stone-700">
              <h2 className="text-lg font-medium text-blue-800 mb-2 dark:text-stone-200">Why Choose {companyDetails.name}?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 dark:text-stone-300" />
                  <span className="text-gray-700 dark:text-stone-300">Reliable delivery across Morocco</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 dark:text-stone-300" />
                  <span className="text-gray-700 dark:text-stone-300">Real-time package tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 dark:text-stone-300" />
                  <span className="text-gray-700 dark:text-stone-300">Insurance coverage included</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 dark:text-stone-300" />
                  <span className="text-gray-700 dark:text-stone-300">Multiple payment options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 dark:text-stone-300" />
                  <span className="text-gray-700 dark:text-stone-300">{companyDetails.foundedYear - new Date().getFullYear() + 2025}+ years of experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCompanyDetails;