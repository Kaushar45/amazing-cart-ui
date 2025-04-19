"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center gap-2 px-6 h-15 bg-blue-400 text-blue-50">
      <h2 className="text-2xl font-bold">Amazing Cart</h2>
      <nav className="flex items-center gap-5">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>
    </header>
  );
};

export default Navbar;
