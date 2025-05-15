"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { apiClient, resetPassword } from "../../../../utils/apiClient";
import { validatePassword } from "../../../../utils/validateFormFields";
const ResetPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();

  console.log(token);

  const enableDisableBtn = () => {
    if (!password.length || !confirmPassword.length) {
      return true;
    }
    return false;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setValidationError({ password: "", confirmPassword: "" });

    if (!validatePassword(password)) {
      setValidationError((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }
    if (!validatePassword(confirmPassword)) {
      setValidationError((prev) => ({
        ...prev,
        confirmPassword:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }));
      setIsLoading(false);
      return;
    }
    try {
      const data = await apiClient.resetPassword(decodeURIComponent(token), {
        password,
      });
      console.log(data);
      if (data.error) {
        alert(data.message);
        setError(data.message);
        setIsLoading(false);
        return;
      }

      alert(data.message);
      setPassword("");
      setConfirmPassword("");
      setError("");
      setValidationError({ password: "", confirmPassword: "" });
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setError("Something Went Wrong");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="max-w-sm w-full rounded border border-gray-400 grid gap-2 p-4"
    >
      <h1 className="text-center mb-5 font-semibold text-3xl">
        Reset Password
      </h1>

      {error && (
        <p className="text-sm text-red-500 text-center mt-1">{error}</p>
      )}
      <input
        type="password"
        required
        value={password}
        placeholder="New Password"
        className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
        onChange={(e) => setPassword(e.target.value)}
      />
      {validationError.password && (
        <p className="text-sm text-red-500">{validationError.password}</p>
      )}
      <input
        type="password"
        required
        value={confirmPassword}
        placeholder="Confirm New Password"
        className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {validationError.confirmPassword && (
        <p className="text-sm text-red-500">
          {validationError.confirmPassword}
        </p>
      )}
      <button
        type="submit"
        disabled={enableDisableBtn() ? true : false}
        className={`${
          enableDisableBtn()
            ? "bg-gray-300 text-gray-100 "
            : "bg-[#03335f1d] text-gray-100 duration-200 hover:bg-[#141c241d]"
        }   rounded-2xl px-4 text-lg cursor-pointer flex justify-center items-center`}
      >
        Save Password
        {isLoading ? (
          <svg
            className="animate-spin h-8 w-8 border-t-transparent border-2 rounded-full"
            viewBox="0 0 24 24"
          ></svg>
        ) : (
          "Save Password"
        )}
      </button>
    </form>
  );
};

export default ResetPasswordPage;
