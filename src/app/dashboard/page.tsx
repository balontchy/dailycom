"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Store,
  Star,
  Clock,
  Phone,
  Mail,
  MapPin,
  Truck,
  Globe,
  Shield,
  CreditCard,
  Award,
  Timer,
  Plus,
} from "lucide-react";
import { mockDeliveryCompany, mockProducts, mockStore } from "@/components/data/mock";
import { IProduct } from "../../../type";
import { DeliveryCompany } from "../deliveries/page";
import Image from 'next/image';
export default function Dashboard() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  
  const productForm = useForm<IProduct>();
  const deliveryForm = useForm<DeliveryCompany>();

  const onProductSubmit = (data: IProduct) => {
    console.log("New product data:", data);
    setIsProductDialogOpen(false);
  };

  const onDeliverySubmit = (data: DeliveryCompany) => {
    console.log("New delivery data:", data);
    setIsDeliveryDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="shopping" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shopping">Shopping Company</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Company</TabsTrigger>
        </TabsList>

        <TabsContent value="shopping" className="space-y-4">
          {/* Add Product Button */}
          <div className="flex justify-end">
            <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      {...productForm.register("name")}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      {...productForm.register("description")}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        {...productForm.register("price")}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        {...productForm.register("quantity")}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      {...productForm.register("category")}
                      placeholder="Enter category"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      {...productForm.register("image")}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Product</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Store Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Store Information</CardTitle>
              {mockStore.verified && (
                <Badge variant="default" className="bg-green-500">
                  Verified
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Image
                    width={500}
                    height={300}
                    src={mockStore.image}
                    alt={mockStore.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="flex items-center space-x-2">
                    <Store className="h-4 w-4" />
                    <span className="font-medium">{mockStore.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{mockStore.rating} Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{mockStore.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{mockStore.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{mockStore.contact.email}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(mockStore.opening_hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}</span>
                        <span>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          width={50}
                          height={50}
                          src={product.image as string}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {product.rating}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          {/* Add Delivery Company Button */}
          <div className="flex justify-end">
            <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Delivery Company
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Delivery Company</DialogTitle>
                </DialogHeader>
                <form onSubmit={deliveryForm.handleSubmit(onDeliverySubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      {...deliveryForm.register("name")}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      {...deliveryForm.register("description")}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverage">Coverage Area</Label>
                    <Input
                      id="coverage"
                      {...deliveryForm.register("coverage")}
                      placeholder="Enter coverage area"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        {...deliveryForm.register("foundedYear")}
                        placeholder="YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employees">Employees</Label>
                      <Input
                        id="employees"
                        {...deliveryForm.register("employees")}
                        placeholder="Number of employees"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance Coverage</Label>
                    <Input
                      id="insurance"
                      {...deliveryForm.register("insurance")}
                      placeholder="Enter insurance details"
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Company</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Delivery Company Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Image 
                  width={100}
                  height={100}
                  src={mockDeliveryCompany.logo}
                  alt={mockDeliveryCompany.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-2xl">{mockDeliveryCompany.name}</CardTitle>
                  <p className="text-muted-foreground">{mockDeliveryCompany.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{mockDeliveryCompany.rating} Rating ({mockDeliveryCompany.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4" />
                    <span>Founded: {mockDeliveryCompany.foundedYear}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>{mockDeliveryCompany.coverage}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>International Shipping: {mockDeliveryCompany.internationalShipping ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Insurance: {mockDeliveryCompany.insurance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>{mockDeliveryCompany.paymentMethods.join(", ")}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>Certifications: {mockDeliveryCompany.certifications.join(", ")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Avg. Delivery: {mockDeliveryCompany.averageDeliveryTime}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing by City</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>City</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Delivery Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(mockDeliveryCompany.pricing).map(([city, details]) => (
                    <TableRow key={city}>
                      <TableCell className="font-medium">{city}</TableCell>
                      <TableCell>{details.price}</TableCell>
                      <TableCell>{details.deliveryTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Customer Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {mockDeliveryCompany.customerReviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}