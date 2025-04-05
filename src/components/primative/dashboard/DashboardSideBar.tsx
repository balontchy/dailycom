"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingBag, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const menuItems = [
  { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
  { name: "Delivery", href: "/dashboard/delivery", icon: <Package size={20} /> },
  { name: "Store", href: "/dashboard/store", icon: <ShoppingBag size={20} /> },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <Card className="w-64 my-30 min-h-screen h-full  p-5 ml-5 rounded-lg">
      <Label  className="text-xl font-bold mb-5 flex items-center">
        <Home className="mr-2" /> Dashboard
      </Label>
      <nav>
        <ul className="space-y-2 flex flex-col gap-1">
          {menuItems.map(({ name, href, icon }) => (
              <Link key={name} href={href} >
                <div
                  className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                    pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                >
                  {icon}
                  <span className="ml-3">{name}</span>
                </div>
              </Link>
          ))}
        </ul>
      </nav>
    </Card>
  );
}
