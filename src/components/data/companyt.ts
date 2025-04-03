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
  }
];

export default companies;
