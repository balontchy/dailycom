// StoreForm.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Image from 'next/image';

// Predefined categories
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

// Define the modified interface without opening_hours, rating and verified fields
export interface StoreData {
  id: number;
  name: string;
  image: string;
  description: string;
  address: string;
  contact: {
    phone: string;
    email: string;
  };
  categories: string[];
}

// Default store data for initialization
const defaultStoreData: StoreData = {
  id: 0,
  name: '',
  image: '',
  description: '',
  address: '',
  contact: {
    phone: '',
    email: '',
  },
  categories: [],
};

interface StoreFormProps {
  initialStore?: StoreData;
  onSubmit: (store: StoreData) => void;
}

export default function StoreForm({ initialStore = defaultStoreData, onSubmit }: StoreFormProps) {
  const [store, setStore] = useState<StoreData>(initialStore);
  const [imagePreview, setImagePreview] = useState<string>(initialStore.image || '');
  const [open, setOpen] = useState(false);
  
  // Handle basic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStore(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact information changes
  const handleContactChange = (field: 'phone' | 'email', value: string) => {
    setStore(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the selected image
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result.toString();
        setImagePreview(imageUrl);
        setStore(prev => ({
          ...prev,
          image: imageUrl
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Add a category
  const addCategory = (categoryId: string) => {
    if (store.categories.includes(categoryId)) return;
    
    setStore(prev => ({
      ...prev,
      categories: [...prev.categories, categoryId]
    }));
  };

  // Remove a category
  const removeCategory = (categoryId: string) => {
    setStore(prev => ({
      ...prev,
      categories: prev.categories.filter(id => id !== categoryId)
    }));
  };

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(store);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Store Image */}
          <div className="flex flex-col items-center gap-4">
            {imagePreview && (
              <div className="w-48 h-48 relative rounded-md overflow-hidden">
                <Image
                width={1920}
                height={1080}
                  src={imagePreview} 
                  alt="Store preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="max-w-xs"
              />
            </div>
          </div>

          {/* Basic Store Information */}
          <div className="space-y-2">
            <Label htmlFor="name">Store Name</Label>
            <Input
              id="name"
              name="name"
              value={store.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={store.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={store.address}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={store.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={store.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories with Combobox */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="categories" className="mb-2 block">Select Categories</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  Select a category
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search category..." className="h-9" />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.id}
                        onSelect={() => {
                          addCategory(category.id);
                          setOpen(false);
                        }}
                      >
                        {category.name}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            store.categories.includes(category.id) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {store.categories.length === 0 && 
              <p className="text-muted-foreground text-sm">No categories selected yet.</p>
            }
            
            {store.categories.map((categoryId) => (
              <Badge key={categoryId} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                {getCategoryName(categoryId)}
                <button
                  type="button"
                  onClick={() => removeCategory(categoryId)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">Save Store</Button>
      </div>
    </form>
  );
}