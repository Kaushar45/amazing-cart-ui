"use client";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";

const ProtectedRoutes = ({ children }) => {
  const { isLogin } = useGlobalContext();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLogin) {
      router.push(`/login?ref=${pathname}`);
    }
  }, []);

  return (
    <>
      {!isLogin ? null : (
        <div>
          <h1>Protected Route</h1>
          <div>{children}</div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoutes;
