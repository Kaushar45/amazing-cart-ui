"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { resetPassword } from "../../../../utils/apiClient";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  console.log(token);

  const enableDisableBtn = () => {
    if (
      !password.length ||
      !confirmPassword.length ||
      password !== confirmPassword
    ) {
      return true;
    }
    return false;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await resetPassword({ password }, decodeURIComponent(token));
      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert(data.message);
      }

      alert(data.message);
      router.push("/login");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
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
      <input
        type="password"
        required
        value={password}
        placeholder="New Password"
        className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        required
        value={confirmPassword}
        placeholder="Confirm New Password"
        className="rounded-2xl px-4 text-lg bg-[#03335f1d] "
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={enableDisableBtn() ? true : false}
        className={`${
          enableDisableBtn()
            ? "bg-gray-300 text-gray-100 "
            : "bg-[#03335f1d] text-gray-100 duration-200 hover:bg-[#141c241d]"
        }   rounded-2xl px-4 text-lg cursor-pointer`}
      >
        Save Password
      </button>
    </form>
  );
};

export default ResetPasswordPage;
