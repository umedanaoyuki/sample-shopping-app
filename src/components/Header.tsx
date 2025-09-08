"use client";
import Link from "next/link";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  return (
    <header className="flex fixed top-0 w-full items-center p-4 bg-gray-800 text-white z-50">
         
      <Link href="/" className="hover:underline flex-1">
           <h1 className="text-xl font-bold">TorasTech</h1>   
      </Link>
         <AccountCircleIcon fontSize="large" />   
      <p className="mx-4">ゲスト さん</p>
         <AddShoppingCartIcon fontSize="large" />   
    </header>
  );
}
