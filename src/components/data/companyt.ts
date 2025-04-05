const companies = [
  {
    id: 1,
    name: "Amana Maroc",
    description: "Reliable and secure delivery across Morocco with decades of service excellence.",
    logo: "/api/placeholder/80/80",
    coverImage: "/api/placeholder/800/200",
    contact: {
      phone: "+212522437000",
      email: "contact@amana.ma",
      website: "www.amana.ma",
      address: "123 Mohammed V Boulevard, Casablanca, Morocco"
    },
    rating: 4.7,
    reviewCount: 2354,
    foundedYear: 1985,
    employees: "1,000+",
    coverage: "All cities in Morocco",
    internationalShipping: true,
    trackingAvailable: true,
    insurance: "Up to 5,000 MAD included",
    paymentMethods: ["Cash on Delivery", "Credit Card", "Bank Transfer", "Mobile Payment"],
    serviceTypes: ["Standard Delivery", "Express Delivery", "Bulky Items", "Document Delivery"],
    certifications: ["ISO 9001", "AFAQ Certification", "Logistics Excellence Award 2023"],
    averageDeliveryTime: "24-36 hours",
    theme: "from-blue-600 to-blue-800",
    buttonTheme: "bg-blue-600 hover:bg-blue-700",
    pricing: {
      Casablanca: { price: "30 MAD", deliveryTime: "24 hours" },
      Rabat: { price: "35 MAD", deliveryTime: "24 hours" },
      Marrakech: { price: "40 MAD", deliveryTime: "36 hours" },
      Tangier: { price: "45 MAD", deliveryTime: "36 hours" },
      Fes: { price: "35 MAD", deliveryTime: "30 hours" }
    },
    customerReviews: [
      {
        name: "Mohammed A.",
        rating: 5,
        date: "March 15, 2025",
        comment: "Excellent service! My package arrived earlier than expected and in perfect condition."
      },
      {
        name: "Fatima L.",
        rating: 4,
        date: "February 28, 2025",
        comment: "Good service overall. The tracking was accurate and helpful."
      },
      {
        name: "Yousef K.",
        rating: 5,
        date: "March 22, 2025",
        comment: "Very professional delivery personnel. Will use again!"
      }
    ]
  },
  {
    id: 2,
    name: "Barid Al-Maghrib",
    description: "Morocco's national postal service providing domestic and international shipping solutions.",
    logo: "/api/placeholder/80/80",
    coverImage: "/api/placeholder/800/200",
    contact: {
      phone: "+212537213000",
      email: "info@barid.ma",
      website: "www.barid.ma",
      address: "Avenue Ibn Sina, Rabat, Morocco"
    },
    rating: 4.3,
    reviewCount: 1987,
    foundedYear: 1892,
    employees: "10,000+",
    coverage: "Nationwide with international partnerships",
    internationalShipping: true,
    trackingAvailable: true,
    insurance: "Up to 10,000 MAD included",
    paymentMethods: ["Cash on Delivery", "Bank Transfer", "Postal Money Order"],
    serviceTypes: ["Parcel Delivery", "Letter Mailing", "Express Post", "Money Transfer"],
    certifications: ["ISO 27001", "Quality Service Award 2022"],
    averageDeliveryTime: "24-72 hours",
    theme: "from-yellow-500 to-yellow-700",
    buttonTheme: "bg-yellow-500 hover:bg-yellow-600",
    pricing: {
      Casablanca: { price: "25 MAD", deliveryTime: "24 hours" },
      Rabat: { price: "30 MAD", deliveryTime: "24 hours" },
      Marrakech: { price: "35 MAD", deliveryTime: "48 hours" },
      Tangier: { price: "40 MAD", deliveryTime: "48 hours" },
      Fes: { price: "30 MAD", deliveryTime: "36 hours" }
    },
    customerReviews: [
      {
        name: "Khalid M.",
        rating: 4,
        date: "March 10, 2025",
        comment: "Reliable and cost-effective postal service."
      },
      {
        name: "Layla S.",
        rating: 3,
        date: "February 25, 2025",
        comment: "Delivery was a bit slow, but everything arrived safely."
      }
    ]
  },
  {
    id: 3,
    name: "Chrono Maroc",
    description: "Express delivery service with guaranteed on-time delivery.",
    logo: "/api/placeholder/80/80",
    coverImage: "/api/placeholder/800/200",
    contact: {
      phone: "+212522123456",
      email: "contact@chronomaroc.ma",
      website: "www.chronomaroc.ma",
      address: "Rue de Paris, Casablanca, Morocco"
    },
    rating: 4.8,
    reviewCount: 1450,
    foundedYear: 2005,
    employees: "500+",
    coverage: "Major Moroccan cities",
    internationalShipping: false,
    trackingAvailable: true,
    insurance: "Up to 7,000 MAD included",
    paymentMethods: ["Cash on Delivery", "Credit Card"],
    serviceTypes: ["Express Delivery", "Same-Day Delivery", "Overnight Shipping"],
    certifications: ["ISO 14001", "Fast Delivery Award 2024"],
    averageDeliveryTime: "6-12 hours",
    theme: "from-red-500 to-red-700",
    buttonTheme: "bg-red-500 hover:bg-red-600",
    pricing: {
      Casablanca: { price: "50 MAD", deliveryTime: "6 hours" },
      Rabat: { price: "55 MAD", deliveryTime: "8 hours" },
      Marrakech: { price: "60 MAD", deliveryTime: "10 hours" },
      Tangier: { price: "65 MAD", deliveryTime: "12 hours" },
      Fes: { price: "58 MAD", deliveryTime: "10 hours" }
    },
    customerReviews: [
      {
        name: "Amina T.",
        rating: 5,
        date: "March 5, 2025",
        comment: "Super fast delivery! Highly recommend Chrono Maroc."
      },
      {
        name: "Rachid B.",
        rating: 4,
        date: "March 12, 2025",
        comment: "Great service, but a bit expensive for smaller packages."
      }
    ]
  },
  {
    id: 4,
    name: "FastGo",
    description: "Affordable and fast delivery services for businesses and individuals.",
    logo: "/api/placeholder/80/80",
    coverImage: "/api/placeholder/800/200",
    contact: {
      phone: "+212600987654",
      email: "support@fastgo.ma",
      website: "www.fastgo.ma",
      address: "Boulevard Zerktouni, Casablanca, Morocco"
    },
    rating: 4.5,
    reviewCount: 1200,
    foundedYear: 2010,
    employees: "300+",
    coverage: "All cities in Morocco",
    internationalShipping: false,
    trackingAvailable: true,
    insurance: "Up to 3,000 MAD included",
    paymentMethods: ["Cash on Delivery", "Mobile Payment"],
    serviceTypes: ["Standard Delivery", "Express Delivery"],
    certifications: ["Customer Satisfaction Award 2023"],
    averageDeliveryTime: "12-24 hours",
    theme: "from-green-500 to-green-700",
    buttonTheme: "bg-green-500 hover:bg-green-600",
    pricing: {
      Casablanca: { price: "22 MAD", deliveryTime: "12 hours" },
      Rabat: { price: "28 MAD", deliveryTime: "12 hours" },
      Agadir: { price: "35 MAD", deliveryTime: "18 hours" },
      Marrakech: { price: "30 MAD", deliveryTime: "18 hours" },
      Tangier: { price: "40 MAD", deliveryTime: "24 hours" }
    },
    customerReviews: [
      {
        name: "Hassan J.",
        rating: 5,
        date: "March 8, 2025",
        comment: "Affordable and reliable. Perfect for small businesses."
      },
      {
        name: "Nadia F.",
        rating: 4,
        date: "March 18, 2025",
        comment: "Good service, but tracking could be improved."
      }
    ]
  }
];

export default companies;
