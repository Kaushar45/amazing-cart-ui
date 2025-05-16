"use client";
import React from "react";
import Link from "next/link";
import { useGlobalContext } from "../../context/GlobalContext";

const Navbar = () => {
  const { isLogin, setIsLogin } = useGlobalContext();

  const handleLaogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center fixed top-0 left-0 right-0 z-10 gap-2 px-6 h-15 bg-blue-400 text-blue-50">
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
          <div className="flex gap-2 items-center">
            <button>Account</button>
            <button onClick={handleLaogout}>Log out</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
