"use client";
import { apiClient } from "../../../utils/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateEmail } from "../../../utils/validateFormField";
const ForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [error, setError] = useState("");
  const enableDisableBtn = () => {
    if (!email.length) {
      return true;
    }
    return false;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationError("");
    if (!validateEmail(email)) {
      setValidationError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiClient.forgotPassword({
        email: email,
        reset_password_ui_url: "http://localhost:3000/reset_password",
      });
      console.log(data);
      if (data.error) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setEmail("");
      setValidationError("");
      setError("");
      setIsLoading(false);
      alert(data.message);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Somthing Went Wrong");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="grid items-center justify-center gap-5 h-screen"
    >
      <div className="grid items-center justify-center gap-5 px-6 py-6 rounded-xl  border-1 border-gray-500 bg-[#9595951d] shadow-2xl">
        <h1 className="text-center mb-5 font-semibold text-3xl">
          Forgot Password
        </h1>
        {error && (
          <p className="text-sm text-red-500 text-center mt-1">{error}</p>
        )}
        <input
          type="email"
          required
          value={email}
          placeholder="Email"
          className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationError && (
          <p className="text-sm text-red-500">{validationError}</p>
        )}
        <button
          type="submit"
          disabled={enableDisableBtn() ? true : false}
          className={`${
            enableDisableBtn()
              ? "bg-gray-300 text-gray-100 "
              : "bg-[#03335f1d] duration-200 hover:bg-[#13212f1d]"
          }rounded-2xl cursor-pointer outline-neutral-50 px-4 text-lg flex justify-center items-center`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
