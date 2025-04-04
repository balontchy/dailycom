// ProfileForm.tsx
"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Avatar  } from "@/components/ui/avatar";

import { toast } from 'sonner';
import Image from 'next/image';

// Define the interfaces

export interface IAddress {
  id: number;
  street: string;
  city: string;
  country: string;
  zipcode: string;
}
export interface IProfile {
  id: string;
  firstname: string;
  lastname: string;
  mobile:string;
  email: string;      
  image: string;
  address: IAddress[];
  store: boolean;
  delivery: boolean;
  admin: boolean;
}





// Empty address object for initialization
const emptyAddress: IAddress = {
  id: Date.now(), // Use timestamp as temporary ID
  street: '',
  city: '',
  country: '',
  zipcode: '',
};

// Default profile for initialization
const defaultProfile: IProfile = {
  id: "",
  firstname: "",
  lastname: "",
  mobile: "",
  email: "",
  image: "",
  address: [{ ...emptyAddress }],
  store: false,
  delivery: false,
  admin: false,
};

export interface ProfileFormProps {
  initialProfile?: IProfile;
  onSubmit: (profile: IProfile) => void;
}

export default function ProfileForm({ initialProfile = defaultProfile, onSubmit }: ProfileFormProps) {
  const [profile, setProfile] = useState<IProfile>(initialProfile);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle address changes
  const handleAddressChange = (index: number, field: keyof IAddress, value: string) => {
    const updatedAddresses = [...profile.address];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value
    };
    
    setProfile(prev => ({
      ...prev,
      address: updatedAddresses
    }));
  };

  // Add a new address
  const addAddress = () => {
    setProfile(prev => ({
      ...prev,
      address: [...prev.address, { ...emptyAddress, id: Date.now() }]
    }));
  };

  // Remove an address
  const removeAddress = (index: number) => {
    if (profile.address.length <= 1) {
      toast.error("Cannot remove. You must have at least one address.");
      return;
    }

    const updatedAddresses = [...profile.address];
    updatedAddresses.splice(index, 1);

    setProfile((prev) => ({
      ...prev,
      address: updatedAddresses,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <Image
                width={96}
                height={96}
                src={initialProfile.image}
                alt="Profile Image"
              />
            </Avatar>
          </div>
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                value={initialProfile.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                value={initialProfile.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={initialProfile.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Mobile">Mobile</Label>
            <Input
              id="mobile"
              name="mobile"
              type="mobile"
              value={profile.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Roles</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="store"
                  name="store"
                  checked={profile.store}
                  onCheckedChange={(checked) =>
                    setProfile((prev) => ({ ...prev, store: checked === true }))
                  }
                />
                <Label htmlFor="store">Store</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="delivery"
                  name="delivery"
                  checked={profile.delivery}
                  onCheckedChange={(checked) =>
                    setProfile((prev) => ({
                      ...prev,
                      delivery: checked === true,
                    }))
                  }
                />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="admin"
                  name="admin"
                  checked={profile.admin}
                  onCheckedChange={(checked) =>
                    setProfile((prev) => ({ ...prev, admin: checked === true }))
                  }
                />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Addresses</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAddress}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Add Address
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile.address.map((address, index) => (
            <div key={address.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Address {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAddress(index)}
                  className="text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`street-${index}`}>Street</Label>
                  <Input
                    id={`street-${index}`}
                    value={address.street}
                    onChange={(e) =>
                      handleAddressChange(index, "street", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`city-${index}`}>City</Label>
                    <Input
                      id={`city-${index}`}
                      value={address.city}
                      onChange={(e) =>
                        handleAddressChange(index, "city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`zipcode-${index}`}>Zip Code</Label>
                    <Input
                      id={`zipcode-${index}`}
                      value={address.zipcode}
                      onChange={(e) =>
                        handleAddressChange(index, "zipcode", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`country-${index}`}>Country</Label>
                  <Input
                    id={`country-${index}`}
                    value={address.country}
                    onChange={(e) =>
                      handleAddressChange(index, "country", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
}
