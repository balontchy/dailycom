"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';

// Define the interfaces
export interface Contact {
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface CustomerReview {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Pricing {
  [city: string]: {
    price: string;
    deliveryTime: string;
  };
}

export interface DeliveryCompany {
  id: number;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  contact: Contact;
  rating: number;
  reviewCount: number;
  foundedYear: number;
  employees: string;
  coverage: string;
  internationalShipping: boolean;
  trackingAvailable: boolean;
  insurance: string;
  paymentMethods: string[];
  serviceTypes: string[];
  certifications: string[];
  averageDeliveryTime: string;
  theme: string;
  buttonTheme: string;
  pricing: Pricing;
  customerReviews: CustomerReview[];
}

// Default delivery company data for initialization
const defaultDeliveryCompany: DeliveryCompany = {
  id: 0,
  name: '',
  description: '',
  logo: '',
  coverImage: '',
  contact: {
    phone: '',
    email: '',
    website: '',
    address: ''
  },
  rating: 0,
  reviewCount: 0,
  foundedYear: new Date().getFullYear(),
  employees: '',
  coverage: '',
  internationalShipping: false,
  trackingAvailable: false,
  insurance: '',
  paymentMethods: [],
  serviceTypes: [],
  certifications: [],
  averageDeliveryTime: '',
  theme: '#3B82F6', // Default blue theme
  buttonTheme: '#2563EB',
  pricing: {},
  customerReviews: []
};

interface DeliveryCompanyFormProps {
  initialCompany?: DeliveryCompany;
  onSubmit: (company: DeliveryCompany) => void;
}

export default function DeliveryCompanyForm({ initialCompany = defaultDeliveryCompany, onSubmit }: DeliveryCompanyFormProps) {
  const [company, setCompany] = useState<DeliveryCompany>(initialCompany);
  const [logoPreview, setLogoPreview] = useState<string>(initialCompany.logo || '');
  const [coverPreview, setCoverPreview] = useState<string>(initialCompany.coverImage || '');
  
  // Form state for new items
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>('');
  const [newServiceType, setNewServiceType] = useState<string>('');
  const [newCertification, setNewCertification] = useState<string>('');
  
  // Form state for pricing
  const [newCity, setNewCity] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newDeliveryTime, setNewDeliveryTime] = useState<string>('');

  // Handle basic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompany(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle number input changes
  const handleNumberChange = (name: string, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      setCompany(prev => ({
        ...prev,
        [name]: numValue
      }));
    }
  };

  // Handle contact information changes
  const handleContactChange = (field: keyof Contact, value: string) => {
    setCompany(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result.toString();
        setLogoPreview(imageUrl);
        setCompany(prev => ({
          ...prev,
          logo: imageUrl
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result.toString();
        setCoverPreview(imageUrl);
        setCompany(prev => ({
          ...prev,
          coverImage: imageUrl
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Toggle boolean values
  const handleToggle = (field: 'internationalShipping' | 'trackingAvailable', value: boolean) => {
    setCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add a new payment method
  const addPaymentMethod = () => {
    if (!newPaymentMethod.trim()) return;
    
    if (company.paymentMethods.includes(newPaymentMethod.trim())) {
      return;
    }
    
    setCompany(prev => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, newPaymentMethod.trim()]
    }));
    setNewPaymentMethod('');
  };

  // Remove a payment method
  const removePaymentMethod = (method: string) => {
    setCompany(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(m => m !== method)
    }));
  };

  // Add a new service type
  const addServiceType = () => {
    if (!newServiceType.trim()) return;
    
    if (company.serviceTypes.includes(newServiceType.trim())) {
      return;
    }
    
    setCompany(prev => ({
      ...prev,
      serviceTypes: [...prev.serviceTypes, newServiceType.trim()]
    }));
    setNewServiceType('');
  };

  // Remove a service type
  const removeServiceType = (serviceType: string) => {
    setCompany(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.filter(s => s !== serviceType)
    }));
  };

  // Add a new certification
  const addCertification = () => {
    if (!newCertification.trim()) return;
    
    if (company.certifications.includes(newCertification.trim())) {
      return;
    }
    
    setCompany(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification.trim()]
    }));
    setNewCertification('');
  };

  // Remove a certification
  const removeCertification = (certification: string) => {
    setCompany(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }));
  };

  // Add new pricing for a city
  const addPricing = () => {
    if (!newCity.trim() || !newPrice.trim() || !newDeliveryTime.trim()) return;
    
    setCompany(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [newCity.trim()]: {
          price: newPrice.trim(),
          deliveryTime: newDeliveryTime.trim()
        }
      }
    }));
    
    setNewCity('');
    setNewPrice('');
    setNewDeliveryTime('');
  };

  // Remove pricing for a city
  const removePricing = (city: string) => {
    const updatedPricing = { ...company.pricing };
    delete updatedPricing[city];
    
    setCompany(prev => ({
      ...prev,
      pricing: updatedPricing
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(company);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Logo */}
          <div>
            <Label className="block mb-2">Company Logo</Label>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="w-24 h-24 relative rounded-md overflow-hidden">
                  <Image
                    width={96}
                    height={96}
                    src={logoPreview} 
                    alt="Company logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="max-w-xs"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <Label className="block mb-2">Cover Image</Label>
            <div className="flex flex-col gap-4">
              {coverPreview && (
                <div className="w-full h-48 relative rounded-md overflow-hidden">
                  <Image
                  width={500}
                  height={200}
                    src={coverPreview} 
                    alt="Cover image" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="max-w-xs"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              value={company.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={company.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Founded Year & Employees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                type="number"
                value={company.foundedYear}
                onChange={(e) => handleNumberChange('foundedYear', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                name="employees"
                value={company.employees}
                onChange={handleChange}
                placeholder="e.g. 100-500"
              />
            </div>
          </div>

          {/* Coverage & Average Delivery Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="coverage">Coverage Area</Label>
              <Input
                id="coverage"
                name="coverage"
                value={company.coverage}
                onChange={handleChange}
                placeholder="e.g. Nationwide"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="averageDeliveryTime">Average Delivery Time</Label>
              <Input
                id="averageDeliveryTime"
                name="averageDeliveryTime"
                value={company.averageDeliveryTime}
                onChange={handleChange}
                placeholder="e.g. 2-3 business days"
                required
              />
            </div>
          </div>

          {/* Insurance */}
          <div className="space-y-2">
            <Label htmlFor="insurance">Insurance Information</Label>
            <Input
              id="insurance"
              name="insurance"
              value={company.insurance}
              onChange={handleChange}
              placeholder="e.g. Up to $1000 for all shipments"
            />
          </div>

          {/* Toggle Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="internationalShipping">International Shipping</Label>
              <Switch
                id="internationalShipping"
                checked={company.internationalShipping}
                onCheckedChange={(checked) => handleToggle('internationalShipping', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="trackingAvailable">Tracking Available</Label>
              <Switch
                id="trackingAvailable"
                checked={company.trackingAvailable}
                onCheckedChange={(checked) => handleToggle('trackingAvailable', checked)}
              />
            </div>
          </div>

          {/* Theme Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme Color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="theme"
                  name="theme"
                  type="color"
                  value={company.theme}
                  onChange={handleChange}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={company.theme}
                  onChange={(e) => setCompany(prev => ({ ...prev, theme: e.target.value }))}
                  placeholder="#HEX"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonTheme">Button Color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="buttonTheme"
                  name="buttonTheme"
                  type="color"
                  value={company.buttonTheme}
                  onChange={handleChange}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={company.buttonTheme}
                  onChange={(e) => setCompany(prev => ({ ...prev, buttonTheme: e.target.value }))}
                  placeholder="#HEX"
                />
              </div>
            </div>
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
                value={company.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={company.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={company.contact.website}
                onChange={(e) => handleContactChange('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={company.contact.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Types */}
      <Card>
        <CardHeader>
          <CardTitle>Service Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a service type"
              value={newServiceType}
              onChange={(e) => setNewServiceType(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={addServiceType}
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {company.serviceTypes.length === 0 && 
              <p className="text-muted-foreground text-sm">No service types added yet.</p>
            }
            
            {company.serviceTypes.map((serviceType, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {serviceType}
                <button
                  type="button"
                  onClick={() => removeServiceType(serviceType)}
                  className="ml-1 rounded-full hover:bg-muted p-1"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a payment method"
              value={newPaymentMethod}
              onChange={(e) => setNewPaymentMethod(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={addPaymentMethod}
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {company.paymentMethods.length === 0 && 
              <p className="text-muted-foreground text-sm">No payment methods added yet.</p>
            }
            
            {company.paymentMethods.map((method, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {method}
                <button
                  type="button"
                  onClick={() => removePaymentMethod(method)}
                  className="ml-1 rounded-full hover:bg-muted p-1"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a certification"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={addCertification}
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {company.certifications.length === 0 && 
              <p className="text-muted-foreground text-sm">No certifications added yet.</p>
            }
            
            {company.certifications.map((certification, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {certification}
                <button
                  type="button"
                  onClick={() => removeCertification(certification)}
                  className="ml-1 rounded-full hover:bg-muted p-1"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing by City</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="newCity" className="mb-2 block">City</Label>
              <Input
                id="newCity"
                placeholder="City name"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="newPrice" className="mb-2 block">Price</Label>
              <Input
                id="newPrice"
                placeholder="e.g. $15.99"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="newDeliveryTime" className="mb-2 block">Delivery Time</Label>
              <div className="flex gap-2">
                <Input
                  id="newDeliveryTime"
                  placeholder="e.g. 1-2 days"
                  value={newDeliveryTime}
                  onChange={(e) => setNewDeliveryTime(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addPricing}
                  className="flex items-center"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>

          {Object.keys(company.pricing).length === 0 ? (
            <p className="text-muted-foreground text-sm mt-4">No pricing information added yet.</p>
          ) : (
            <div className="mt-4 border rounded-md">
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted font-medium text-sm">
                <div>City</div>
                <div>Price</div>
                <div>Delivery Time</div>
              </div>
              <Separator />
              {Object.entries(company.pricing).map(([city, details], index) => (
                <div key={city} className="grid grid-cols-3 gap-4 p-3 text-sm items-center relative">
                  <div>{city}</div>
                  <div>{details.price}</div>
                  <div className="flex justify-between items-center">
                    {details.deliveryTime}
                    <button
                      type="button"
                      onClick={() => removePricing(city)}
                      className="hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {index < Object.keys(company.pricing).length - 1 && <Separator className="absolute bottom-0 left-0 right-0" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Company Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0.0 - 5.0)</Label>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">0</span>
                <span className="text-sm text-muted-foreground">5</span>
              </div>
              <Slider
                id="rating"
                min={0}
                max={5}
                step={0.1}
                value={[company.rating]}
                onValueChange={(value) => setCompany(prev => ({ ...prev, rating: value[0] }))}
                className="py-4"
              />
              <div className="text-center font-medium">{company.rating.toFixed(1)}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewCount">Number of Reviews</Label>
              <Input
                id="reviewCount"
                type="number"
                min="0"
                value={company.reviewCount}
                onChange={(e) => handleNumberChange('reviewCount', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">Save Company</Button>
      </div>
    </form>
  );
}