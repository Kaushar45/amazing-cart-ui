"use client";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.store.inflection.org.in/products/public?limit=20"
        );
        const data = await res.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4 p-5">
      {products.map((products) => (
        <div key={products.product_code}>
          <img src={products.thumbnail} />
          <h1>{products.product_name}</h1>
          <h3 className="font-bold"> ₹{products.price}</h3>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
