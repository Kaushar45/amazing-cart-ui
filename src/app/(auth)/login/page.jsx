"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useGlobalContext } from "../../../context/GlobalContext";
import React, { useState } from "react";
import Link from "next/link";
import { apiClient } from "../../../utils/apiClient";
import {
  validateEmail,
  validatePassword,
} from "../../../utils/validateFormField";

const loginPage = () => {
  const router = useState();
  const { setIsLogin } = useGlobalContext();
  const searchParams = useSearchParams();
  console.log(searchParams.get("ref"));
  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const enableDisableBtn = () => {
    if (!email.length || !password.length) {
      return true;
    }
    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationError({ email: "", password: "" });
    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }
    try {
      const data = await apiClient.login({
        email: email,
        password: password,
      });
      console.log(data);
      if (data.error) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
      setCookie("access_token", data.access_token);
      setCookie("refresh_token", data.refresh_token);
      const {
        access_token,
        refresh_token,
        refresh_token_expires_at,
        access_token_expires_at,
      } = data;

      const currentMilies = Date.now();
      const accesTokenExpiresAt = Date.parse(access_token_expires_at);
      const refreshTokenExpiresAt = Date.parse(refresh_token_expires_at);

      setCookie(
        "access_token",
        access_token,
        parseInt(`${(accesTokenExpiresAt - currentMilies) / 1000}`)
      );
      setCookie(
        "refresh_token",
        refresh_token,
        parseInt(`${(refreshTokenExpiresAt - currentMilies) / 1000}`)
      );
      setIsLogin(true);
      setEmail("");
      setPassword("");
      router.push("/");
      setValidationError({ email: "", password: "" });
      setError("");
      setIsLoading(false);
      if (searchParams.get("ref")) {
        router.push(searchParams.get("ref"), { replace: true });
      } else {
        router.push("/", { replace: true });
      }
    } catch (error) {
      console.log();
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
      setValidationError({ email: "", password: "" });
    }
  };

  return (
    <>
      <form
        className="grid items-center justify-center gap-5 bg-[url('https://images.unsplash.com/photo-1699462515761-90db271d77c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen "
        onSubmit={handleLogin}
      >
        <div className="grid items-center justify-center gap-5 px-6 py-6 rounded-xl  border-1 border-gray-500 bg-[#9595951d] shadow-2xl">
          <h1 className="text-2xl font-bold text-blue-950">User Login</h1>
          {error && (
            <p className="text-sm text-red-500 text-center mt-1">{error}</p>
          )}
          <input
            className="border-gray-800 rounded-2xl px-4 text-lg mt-5 bg-[#03335f1d] "
            required
            placeholder="Username"
            name="Username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationError.email && (
            <p className="text-sm text-red-500">{validationError.email}</p>
          )}
          <div className="relative">
            <input
              className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
              required
              placeholder="Password"
              name="password"
              value={password}
              type={isPassword ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPassword ? (
              <Eye
                className="absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer"
                onClick={() => setIsPassword(!isPassword)}
              />
            ) : (
              <EyeOff
                className="absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer"
                onClick={() => setIsPassword(!isPassword)}
              />
            )}
          </div>
          {validationError.password && (
            <p className="text-sm text-red-500">{validationError.password}</p>
          )}
          <Link
            href="/forgot_password"
            className="text-sm text-right text-blue-500"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            disabled={enableDisableBtn() ? true : false}
            className={`${
              enableDisableBtn()
                ? "bg-gray-300 text-gray-100 "
                : "bg-[#03335f1d] duration-200 hover:bg-[#13212f1d]"
            }rounded-2xl cursor-pointer outline-neutral-50 px-4 text-lg flex items-center justify-center`}
          >
            Login
            {isLoading ? (
              <svg
                className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-sm">
            Don't have an account?
            <Link href="/signup" className="text-blue-500">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default loginPage;
