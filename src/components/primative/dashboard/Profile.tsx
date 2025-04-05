// ProfileForm.tsx
"use client";
import {  useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Avatar  } from "@/components/ui/avatar";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from 'sonner';
import Image from 'next/image';

export interface IAddress {
  id: number;
  street: string;
  city: string;
  country: string;
  zipcode: string;
}
export interface IProfile {
  id:string;
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
  id:``,
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

async function post(url: string, profile: IProfile) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile), // Use the `profile` state here
    });

    if (!response.ok) {
      throw new Error('Failed to save profile');
    }

    const data = await response.json();
    console.log('Profile saved successfully:', data);
    toast.success('ثمت حفظ الملف الشخصي بنجاح');
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to save profile');
  }
}
async function get(url: string, { params }: { params: { id: string } }): Promise<IProfile | undefined> {
  try {
    const response = await fetch(`${url}/${params.id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to fetch data');
    return undefined;
  }
}

async function put(url: string, profile: IProfile) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const data = await response.json();
    console.log('Profile updated successfully:', data);
    toast.success('ثمت تحديث الملف الشخصي بنجاح');
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to update profile');
  }
}

export default function ProfileForm() {
  const { user } = useKindeAuth(); // Assuming 'user' is the correct property in KindeState
  defaultProfile.id = user?.id || "";
  defaultProfile.firstname = user?.given_name || "";
  defaultProfile.lastname = user?.family_name || "";
  defaultProfile.email = user?.email || "";
  defaultProfile.image = user?.picture || "";
  defaultProfile.admin = false;
  const [profile, setProfile] = useState<IProfile>(defaultProfile);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUpdating, setIsUpdating] = useState(false);



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
  async function  handleSubmit (e: React.FormEvent) {
    e.preventDefault();
    // console.log('Profile submitted:', profile);
    await post('/api/profiles', profile)
    
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleUpdate (e: React.FormEvent) {
    e.preventDefault();
    // console.log('Profile submitted:', profile);
    await put(`/api/profiles/}`, profile)
  };
  async function handleProfile (){
 const profileData = await get(`/api/profiles/`, { params: { id: profile.id } });
      if (profileData) {
        setProfile(profileData);
        setIsUpdating(true);
      }
      setIsUpdating(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>معلوماتك الشخصية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <Image
                width={96}
                height={96}
                src={defaultProfile.image}
                alt="Profile Image"
              />
            </Avatar>
          </div>
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstname">اسم الشخصي</Label>
              <Input
                id="firstname"
                name="firstname"
                value={defaultProfile.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">إسم العائلي</Label>
              <Input
                id="lastname"
                name="lastname"
                value={defaultProfile.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">الإميل</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={defaultProfile.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Mobile">الهاتف</Label>
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
            <h3 className="text-lg font-medium">ماهي تطلعاتك المستقبلية يمكنك تركهما خاليتان و التعديل عليهم في المستقبل</h3>
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
                <Label htmlFor="store">متجر</Label>
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
                <Label htmlFor="delivery">خدمات التوصيل</Label>
              </div>
            
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>العناوين الخاصة بك يمكنك اضافة اكثر من عنوان عبر الضغط على الزر باليسار</CardTitle>
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
                  <Label htmlFor={`street-${index}`}>الشارع</Label>
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
                    <Label htmlFor={`city-${index}`}>المدينة</Label>
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
                  <Label htmlFor={`country-${index}`}>الدولة</Label>
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
        <Button type="button" variant="outline" size="lg" onClick={handleProfile}>
          تحديث البيانات
        </Button>
        <Button type="submit" size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
}
