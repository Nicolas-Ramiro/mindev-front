"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/;`;

      router.push("/dashboard"); // depois criamos essa página
    } catch (err: unknown) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("Falha no login.");
        }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-left"
    >
      <div>
        <label htmlFor="email" className="text-sm text-neutral-300">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu email"
          value={values.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm text-neutral-300">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          minLength={6}
          value={values.password}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition disabled:opacity-60"
      >
        {loading ? "Carregando..." : "Entrar"}
      </button>
    </form>
  );
}
