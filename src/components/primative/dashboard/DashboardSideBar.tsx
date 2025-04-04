"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingBag, User } from "lucide-react";

const menuItems = [
  { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
  { name: "Delivery", href: "/dashboard/delivery", icon: <Package size={20} /> },
  { name: "Store", href: "/dashboard/store", icon: <ShoppingBag size={20} /> },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 my-30 h-screen bg-gray-900 text-white p-5 ml-5 rounded-lg">
      <h2 className="text-xl font-bold mb-5 flex items-center">
        <Home className="mr-2" /> Dashboard
      </h2>
      <nav>
        <ul>
          {menuItems.map(({ name, href, icon }) => (
            <li key={href} className="mb-3">
              <Link href={href}>
                <div
                  className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                    pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                >
                  {icon}
                  <span className="ml-3">{name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
