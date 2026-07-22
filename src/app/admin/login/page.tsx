"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setErro("Senha incorreta. Tente novamente.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form onSubmit={entrar} className="card w-full max-w-sm p-8">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="mb-1 text-center text-xl font-bold text-earth">
          Painel administrativo
        </h1>
        <p className="mb-6 text-center text-sm text-earth/60">
          Entre para gerenciar a loja
        </p>
        <label className="mb-1 block text-sm font-medium text-earth">
          Senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-cream-200 bg-white px-3 py-2 outline-none focus:border-brick"
          placeholder="Sua senha de admin"
          autoFocus
        />
        {erro && <p className="mt-2 text-sm text-brick">{erro}</p>}
        <button disabled={loading} className="btn-brick mt-6 w-full">
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p className="mt-4 text-center text-xs text-earth/40">
          Senha padrão da demo: yba-admin-2026
        </p>
      </form>
    </div>
  );
}
