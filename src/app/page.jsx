"use client";

import React, { useEffect, useState } from "react";
import { baseURL, getProducts } from "../utils/apiClient";
import ProductCard from "./components/Card";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetchMyProfile();
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      const data = await res.json();
      if (data.error) {
        alert(data.message);
        return;
      }

      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <button onClick={getProfile}> Get My Profile</button>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
