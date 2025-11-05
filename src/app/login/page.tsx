"use client";

import LoginForm from "... @/app/login/(components)/login-form/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black/70 border-2 border-orange-500 rounded-xl shadow-lg p-8 w-[380px] text-center">
        <h2 className="text-4xl font-semibold text-orange-500">
          Login
        </h2>

        <LoginForm />
      </div>
    </div>
  );
}
