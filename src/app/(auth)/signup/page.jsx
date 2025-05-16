"use client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../../context/GlobalContext";
import Link from "next/link";
import { useState } from "react";
import { apiClient, signup } from "../../../utils/apiClient";
import { validateEmail, validateName } from "../../../utils/validateFormField";

const signupPage = () => {
  const router = useRouter();
  const { setIsLogin } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    fullName: "",
  });
  const enableDisableBtn = () => {
    if (!email.length || !fullName.length) {
      return true;
    }
    return false;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationError({ email: "", fullName: "" });

    if (!validateEmail(email)) {
      setValidationError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    if (!validateName(fullName)) {
      setValidationError((prev) => ({
        ...prev,
        fullName: "Please provide a valid name",
      }));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.signup({
        email: email,
        full_name: fullName,
        reset_password_ui_url: "http://localhost:3000/reset_password",
      });
      console.log(data);
      if (data.error) {
        setIsLoading(false);
        setError(data.message);
        return;
      }
      setEmail("");
      setFullName("");
      setIsLoading(false);
      alert(data.message);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Something went Wrong");
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
          {error && (
            <p className="text-sm text-red-500 text-center mt-1">{error}</p>
          )}
          <input
            type="text"
            required
            placeholder="Your Name"
            value={fullName}
            className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
            onChange={(e) => setFullName(e.target.value)}
          />
          {validationError.fullName && (
            <p className="text-sm text-red-500">{validationError.fullName}</p>
          )}

          <input
            type="email"
            required
            placeholder="Email"
            className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationError.email && (
            <p className="text-sm text-red-500">{validationError.email}</p>
          )}
          <button
            type="submit"
            disabled={enableDisableBtn() ? true : false}
            className={`${
              enableDisableBtn()
                ? "bg-gray-300 text-gray-100 "
                : "bg-[#03335f1d] duration-200 hover:bg-[#13212f1d]"
            }rounded-2xl cursor-pointer outline-neutral-50 px-4 text-lg flex items-center justify-center`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Sign up"
            )}
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
