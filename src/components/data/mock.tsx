import { DeliveryCompany } from "@/app/deliveries/page";
import { IProduct } from "../../../type";
import { StoreData } from "../primative/stores/StoreMain";

export const mockStore: StoreData = {
  id: 1,
  name: "Fashion Hub",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  description: "Premium fashion store with latest trends",
  address: "123 Fashion Street, Style City",
  rating: 4.8,
  contact: {
    phone: "+1 234 567 890",
    email: "contact@fashionhub.com"
  },
  categories: ["Men", "Women", "Accessories", "Footwear"],
  opening_hours: {
    Monday: "9:00 AM - 9:00 PM",
    Tuesday: "9:00 AM - 9:00 PM",
    Wednesday: "9:00 AM - 9:00 PM",
    Thursday: "9:00 AM - 9:00 PM",
    Friday: "9:00 AM - 10:00 PM",
    Saturday: "10:00 AM - 10:00 PM",
    Sunday: "11:00 AM - 7:00 PM"
  },
  verified: true
};

export const mockProducts: IProduct[] = [
  {
    id: "1",
    store: 1,
    name: "Classic T-Shirt",
    description: "Premium cotton t-shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Men",
    rating: 4.5,
    reviews: 128,
    quantity: 50,
    sizes: [
      { name: "S", price: 29.99, inStock: true },
      { name: "M", price: 29.99, inStock: true },
      { name: "L", price: 29.99, inStock: false }
    ],
    colors: ["White", "Black", "Gray"]
  },
  {
    id: "2",
    store: 1,
    name: "Denim Jeans",
    description: "Slim fit denim jeans",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a",
    category: "Men",
    rating: 4.8,
    reviews: 256,
    quantity: 30,
    sizes: [
      { name: "30", price: 79.99, inStock: true },
      { name: "32", price: 79.99, inStock: true },
      { name: "34", price: 79.99, inStock: true }
    ],
    colors: ["Blue", "Black"]
  }
];

export const mockDeliveryCompany: DeliveryCompany = {
  id: 1,
  name: "Swift Delivery Solutions",
  description: "Fast and reliable delivery services nationwide",
  logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
  coverImage: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0",
  contact: {
    phone: "+1 234 567 890",
    email: "contact@swiftdelivery.com",
    website: "www.swiftdelivery.com",
    address: "456 Logistics Ave, Transport City"
  },
  rating: 4.7,
  reviewCount: 1250,
  foundedYear: 2010,
  employees: "500+",
  coverage: "Nationwide",
  internationalShipping: true,
  trackingAvailable: true,
  insurance: "Up to $10,000",
  paymentMethods: ["Credit Card", "PayPal", "Bank Transfer"],
  serviceTypes: ["Standard", "Express", "Same Day", "International"],
  certifications: ["ISO 9001", "Green Logistics", "Safety First"],
  averageDeliveryTime: "2-3 business days",
  theme: "#FF6B6B",
  buttonTheme: "#4ECDC4",
  pricing: {
    "New York": {
      price: "$10.99",
      deliveryTime: "1-2 days"
    },
    "Los Angeles": {
      price: "$12.99",
      deliveryTime: "2-3 days"
    },
    "Chicago": {
      price: "$11.99",
      deliveryTime: "1-2 days"
    }
  },
  customerReviews: [
    {
      name: "John Smith",
      rating: 5,
      date: "2024-03-15",
      comment: "Excellent service and fast delivery!"
    },
    {
      name: "Sarah Johnson",
      rating: 4,
      date: "2024-03-14",
      comment: "Good service, but packaging could be better"
    }
  ]
};