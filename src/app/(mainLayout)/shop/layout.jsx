import Link from "next/link";
import React from "react";

const ShopLayout = ({ children }) => {
  return (
    <div className="flex gap-2">
      <aside className="w-60 bg-blue-300 h-screen">
        <Link href={"/"}>Home</Link>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default ShopLayout;
