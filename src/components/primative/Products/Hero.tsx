"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search,  X, Smartphone, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
// Commented dropdown imports properly
/*
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
*/
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IProduct } from "../../../../type";
import { Slider } from "@/components/ui/slider";
import productsJson from '../../../../json/product.json';
import ProductMain from "./ProductMain";
import Link from "next/link";
import { Card } from "@/components/ui/card";
// import { Card } from "@/components/ui/card";

// نحدد الفئات بناءً على بيانات المنتجات المتاحة
const categories = [
  { id: "electronics", name: "إلكترونيات" },
  { id: "smartphones", name: "هواتف ذكية" },
  { id: "accessories", name: "اكسسوارات" },
  { id: "computers", name: "حواسيب" },
  { id: "tablets", name: "أجهزة لوحية" },
  { id: "books", name: "كتب" },
  { id: "toys", name: "ألعاب" },
  { id: "clothing", name: "ملابس" },
  { id: "home-decor", name: "ديكور المنزل" },
  { id: "groceries", name: "بقالة" },
  { id: "health", name: "الصحة" },
  { id: "beauty", name: "الجمال" },
  { id: "jewelry", name: "مجوهرات" },
  { id: "watches", name: "ساعات" },
  { id: "designer-clothing", name: "ملابس مصممين" },
  { id: "gadgets", name: "أدوات" },
  { id: "pet-supplies", name: "مستلزمات الحيوانات الأليفة" },
  { id: "pet-food", name: "طعام الحيوانات الأليفة" },
  { id: "plants", name: "نباتات" },
  { id: "tools", name: "أدوات" },
  { id: "outdoor-decor", name: "ديكور خارجي" },
  { id: "parts", name: "قطع غيار" },
  { id: "service", name: "خدمة" },
];

// نطاقات الأسعار
// Price ranges commented properly
/*
const priceRanges = [
  { id: 1, min: 0, max: 500, name: "أقل من 500 درهم" },
  { id: 2, min: 500, max: 1000, name: "500 - 1000 درهم" },
  { id: 3, min: 1000, max: 1500, name: "1000 - 1500 درهم" },
  { id: 4, min: 1500, max: 2000, name: "1500 - 2000 درهم" },
  { id: 5, min: 2000, max: 100000, name: "أكثر من 2000 درهم" },
];
*/

// Define interface for component props
interface HeroProps {
  onFilterChange?: (filteredProducts: IProduct[]) => void;
}

const Hero: React.FC<HeroProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(productsJson.products as IProduct[]);
  const [featuredProduct, setFeaturedProduct] = useState<IProduct | null>(null);

  // اختيار منتج مميز عشوائيًا للعرض في الهيرو
  useEffect(() => {
    if (productsJson.products && productsJson.products.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsJson.products?.length);
      setFeaturedProduct(productsJson.products[randomIndex]);
    }
  }, []);


  // تطبيق الفلاتر عند تغيير أي من معاييرها
  useEffect(() => {
    let result = [...productsJson.products];

    // تطبيق فلتر البحث
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // تطبيق فلتر الفئات
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        product.category && selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // تطبيق فلتر نطاق السعر
    if (priceRange) {
      result = result.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    setFilteredProducts(result);
    
    // استدعاء الدالة المرجعية إذا كانت موجودة
    if (onFilterChange) {
      onFilterChange(result);
    }
  }, [searchTerm, selectedCategories, priceRange, onFilterChange]);

  // وظائف التعامل مع الفلاتر
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    
    setPriceRange([0, 2000]);
    setSearchTerm("");
  };


  return (
    <>
      <div
        className="relative  w-[90%] m-auto bg-white/90 dark:bg-gray-800/80 rounded-2xl mt-10  text-white overflow-hidden"
        dir="rtl"
      >
        {/* صورة خلفية بتأثير تراكب */}
        <div className="absolute inset-0 bg-black/40">
          {featuredProduct && featuredProduct.image && (
            <Image
              src={featuredProduct.image as string}
              alt={featuredProduct.name}
              fill
              className="object-cover mix-blend-overlay opacity-40"
              quality={90}
            />
          )}
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center md:text-right md:max-w-2xl mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              اكتشف أفضل المنتجات
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-6">
              تسوق آلاف المنتجات بأفضل الأسعار واستمتع بتجربة تسوق فريدة من
              نوعها
            </p>

            {/* عرض المنتج المميز إذا كان متاحًا */}
            {featuredProduct && (
              <div className="hidden md:flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  {featuredProduct.image && (
                    <Image
                      src={featuredProduct.image as string}
                      alt={featuredProduct.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow text-right">
                  <p className="text-sm text-blue-200">المنتج المميز</p>
                  <h3 className="font-bold">{featuredProduct.name}</h3>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-yellow-400 font-bold">
                      {featuredProduct.price.toFixed(2)} درهم
                    </span>
                    {featuredProduct.originalPrice && (
                      <span className="text-gray-300 text-sm line-through">
                        {featuredProduct.originalPrice.toFixed(2)} درهم
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/products/${featuredProduct.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-2 rounded-lg font-semibold"
                >
                  تسوق الآن
                </Link>
              </div>
            )}
          </div>

          {/* مربع البحث الرئيسي */}
          <div className=" rounded-xl p-4 md:p-6 shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <Search
                  size={20}
                  className="ml-3"
                />
                <Input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span className="text-black dark:text-white">الفلاتر</span>
                  {(selectedCategories.length > 0 ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 2000) && (
                    <Badge className="bg-blue-600 hover:bg-blue-700  text-xs mr-1">
                      {selectedCategories.length +
                        (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
                <Button >
                  بحث
                </Button>
              </div>
            </div>

            {/* نتائج البحث المصغرة */}
            {searchTerm && filteredProducts.length > 0 && !showFilters && (
              <div className="mt-4 py-2 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">
                  تم العثور على {filteredProducts.length} منتج
                </p>
              </div>
            )}

            {/* قسم الفلاتر */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 bg-white text-black duration-200  dark:bg-black dark:text-white p-5 rounded-xl border dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium ">
                    الفلاتر المتقدمة
                  </h3>
                  {(selectedCategories.length > 0 ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 2000) && (
                    <Button
                      variant="ghost"
                      className="  text-sm flex items-center gap-1"
                      onClick={clearFilters}
                    >
                      <X size={14} />
                      مسح الكل
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  {/* فلتر الفئات */}
                  <div>
                    <label className="block mb-2 font-medium text-sm">
                      الفئات
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          className={`cursor-pointer px-3 py-1 ${
                            selectedCategories.includes(category.id)
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* فلتر نطاق السعر */}
                  <div>
                    <label className="block mb-2 font-medium text-sm">
                      نطاق السعر
                    </label>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 2000]}
                        max={2000}
                        step={100}
                        value={[priceRange[0], priceRange[1]]}
                        onValueChange={handlePriceRangeChange}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm">
                        <span>{priceRange[0]} درهم</span>
                        <span>{priceRange[1]} درهم</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* عرض نتائج البحث والفلترة */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                      تم العثور على {filteredProducts.length} منتج
                    </p>
                    {filteredProducts.length > 0 && (
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                        عرض النتائج
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* شارات المميزات - لتعزيز تجربة المستخدم */}
          <Card className="mt-8 grid grid-cols-2 md:grid-cols-4 border-none gap-4 text-center bg-blue-900/60 p-4 rounded-lg">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <ShoppingBag className="text-blue-300" size={24} />
              </div>
              <h3 className="font-bold text-white">توصيل سريع</h3>
              <p className="text-sm text-gray-200">خلال 24 ساعة</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <Star className="text-yellow-300" size={24} />
              </div>
              <h3 className="font-bold text-white">ضمان الجودة</h3>
              <p className="text-sm text-gray-200">منتجات أصلية 100%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <Smartphone className="text-green-300" size={24} />
              </div>
              <h3 className="font-bold text-white">دعم فني</h3>
              <p className="text-sm text-gray-200">متوفر على مدار الساعة</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <X className="text-red-300" size={24} />
              </div>
              <h3 className="font-bold text-white">استرجاع مجاني</h3>
              <p className="text-sm text-gray-200">خلال 30 يوم</p>
            </div>
          </Card>
        </div>
      </div>
      <ProductMain filteredProduct={filteredProducts} />
    </>
  );
};

export default Hero;