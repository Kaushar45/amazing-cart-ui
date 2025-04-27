"use client";
import { useGlobalContext } from "../../../context/GlobalContext";
import React from "react";

const loginPage = () => {
  const { setIsLogin } = useGlobalContext();
  const login = () => {
    console.log("You are Log in Now");
    setIsLogin(true);
  };
  return (
    <>
      <form
        className="grid items-center justify-center gap-5 bg-[url('https://images.unsplash.com/photo-1699462515761-90db271d77c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen "
        action="onSubmit"
      >
        <div className="grid items-center justify-center gap-5 px-6 py-6 rounded-xl  border-1 border-gray-500 bg-[#9595951d] shadow-2xl">
          <h1 className="text-2xl font-bold text-blue-950">User Login</h1>

          <input
            className="border-gray-800 rounded-2xl px-4 text-lg bg-[#03335f1d] "
            required
            placeholder="Username"
            name="Username"
          />
          <input
            className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
            required
            placeholder="Password"
            name="password"
            type="password"
          />
          <button
            className="rounded-2xl bg-[#03335f1d]  outline-neutral-50 px-4 text-lg"
            onClick={login}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default loginPage;
