"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import ProductCard from "./components/Card";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const data = await apiClient.fetchMyProfile();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getProducts();
      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }

      console.log(data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Somthing went wrong");
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await apiClient.fetchCategories();
      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }
      console.log(data);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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
