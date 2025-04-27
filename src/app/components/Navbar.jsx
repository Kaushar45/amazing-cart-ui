"use client";
import React from "react";
import Link from "next/link";
import { useGlobalContext } from "../../context/GlobalContext";

const Navbar = () => {
  const { isLogin } = useGlobalContext();

  return (
    <header className="flex justify-between items-center gap-2 px-6 h-15 bg-blue-400 text-blue-50">
      <h2 className="text-2xl font-bold">Amazing Cart</h2>
      <nav className="flex items-center gap-5">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/shop">Shop</Link>
        {!isLogin ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        ) : (
          <button>Account</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
