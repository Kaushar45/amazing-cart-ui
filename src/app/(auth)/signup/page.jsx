"use client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../../context/GlobalContext";
import Link from "next/link";
import { useState } from "react";
import { signup } from "../../../utils/apiClient";

const signupPage = () => {
  const router = useRouter();
  const { setIsLogin } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const enableDisableBtn = () => {
    if (!email.length || !fullName.length) {
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({
        email: email,
        full_name: fullName,
        reset_password_ui_url: "http://localhost:3000/reset_password",
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert(data.mesage);
        return;
      }
      setEmail("");
      setFullName("");
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSignup}
        className="grid items-center justify-center gap-5 bg-[url('https://images.unsplash.com/photo-1699462515761-90db271d77c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen "
      >
        <div className="grid items-center justify-center gap-5 px-6 py-6 rounded-xl  border-1 border-gray-500 bg-[#9595951d] shadow-2xl">
          <h1 className="text-2xl font-bold text-blue-950">Create Account</h1>

          <input
            type="text"
            required
            placeholder="Your Name"
            value={fullName}
            className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Email"
            className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={enableDisableBtn() ? true : false}
            className={`${
              enableDisableBtn()
                ? "bg-gray-300 text-gray-100 "
                : "bg-[#03335f1d] duration-200 hover:bg-[#13212f1d]"
            }rounded-2xl cursor-pointer outline-neutral-50 px-4 text-lg`}
          >
            Sign up
          </button>
          <p className="text-sm">
            Already have an account?
            <Link href="/login" className="text-blue-500">
              login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default signupPage;
