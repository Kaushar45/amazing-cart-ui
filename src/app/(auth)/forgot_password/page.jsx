"use client";
import { apiClient, forgotPassword } from "../../../utils/apiClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const enableDisableBtn = () => {
    if (!email.length) {
      return true;
    }
    return false;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const data = await apiClient.forgotPassword({
        email: email,
        reset_password_ui_url: "http://localhost:3000/reset_password",
      });
      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }

      alert(data.message);
      setEmail("");
      router.push("/");
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
        Forgot Password
      </h1>
      <input
        type="email"
        required
        value={email}
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
        submit
      </button>
    </form>
  );
};

export default ForgotPassword;
