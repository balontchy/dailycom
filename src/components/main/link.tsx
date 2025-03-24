import { Heart, Home, LayoutDashboardIcon, MessageSquare, ShoppingCart, Store, Truck } from "lucide-react";

export interface INav {
  nav: string;
  link: string;
  icon: React.ReactNode;
}

export const nav: INav[] = [
  {
    nav: "الرئيسية",
    link: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    nav: "المتاجر",
    link: "/stores",
    icon: <Store className="w-5 h-5" />,
  },
  {
    nav: "التوصيل",
    link: "/deliveries",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    nav: "المفضلة",
    link: "/favorites",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    nav: "السلة",
    link: "/cart",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    nav: "تواصل معنا",
    link: "/contact",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    nav: "لوحة القيادة",
    link: "/dashboard",
    icon: <LayoutDashboardIcon className="w-5 h-5" />,
  },
];