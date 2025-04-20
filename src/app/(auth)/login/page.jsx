import React from "react";

const loginPage = () => {
  return (
    <>
      <form
        className="grid items-center justify-center gap-5 "
        action="onSubmit"
      >
        <h1 className="text-2xl font-bold text-blue-950">User Login</h1>

        <input
          className="border rounded-2xl px-2 text-xl"
          required
          placeholder="Username"
          name="Username"
        />
        <input
          className="border rounded-2xl px-2 text-xl"
          required
          placeholder="Password"
          name="password"
          type="password"
        />
        <button className="border rounded-2xl px-2 text-xl" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default loginPage;
