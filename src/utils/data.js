import { 
  LuLayoutDashboard, 
  LuWalletMinimal, 
  LuHandCoins,
  LuLogOut ,
} from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { Home } from "lucide-react"; // Import the Home icon

export const MENU_ITEMS = [
  {
    id: "1",
    label: "Dashboard",
    path: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    id: "2",
    label: "Income",
    path: "/income",
    icon: LuWalletMinimal, // Minimal look as you requested
  },
  {
    id: "3",
    label: "Expenses",
    path: "/expense",
    icon: LuHandCoins, // Minimal and relevant
  },
  {
    id: "4",
    label: "Logout",
    path: "/logout", // Standard logout path
    icon: LuLogOut,
  },
];

export const cardsData=(stats)=>{

  return  [
    {
      label: "Total Balance",
      value: stats?.totalBalance || 0,
      icon:IoMdCard,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Total Income",
      value: stats?.totalIncome || 0,
      icon: IoMdCard,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Total Expenses",
      value: stats?.totalExpenses || 0, // Note: backend se totalExpenses aa raha hai (s ke sath)
      icon:IoMdCard,
      color: "text-rose-600",
      bg: "bg-rose-50"
    }
  ];
}


import { 
  LuUtensils, 
  LuFuel, 
  LuFileText, 
  LuWifi, 
  LuWallet, 
  LuLaptop, 
  LuTrendingUp, 
  LuTrendingDown,
  LuShoppingBag,
  LuGlobe
} from "react-icons/lu";

export const ICONS_MAP = {
  // Expense Icons (Backend names mapping)
  utensils: LuUtensils,
  food: LuUtensils,
  fuel: LuFuel,
  petrol: LuFuel,
  home: Home, 
  rent:Home,
  "file-invoice": LuFileText,
  bills: LuFileText,
  wifi: LuWifi,
  internet: LuGlobe,
  shopping: LuShoppingBag,
  
  // Income Icons
  wallet: LuWallet,
  salary: LuWallet,
  laptop: LuLaptop,
  freelance: LuLaptop,
  "trending-up": LuTrendingUp,
  stocks: LuTrendingUp,
  
  // Defaults
  income: LuTrendingUp,
  expense: LuTrendingDown
};