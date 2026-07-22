"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Shield,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { User, UserRole } from "@/lib/types";
import { formatBRL, formatDate } from "@/lib/format";
import StatCard from "./StatCard";

const ROLES: { key: UserRole; label: string }[] = [
  { key: "superadmin", label: "Superadmin" },
  { key: "admin", label: "Admin" },
  { key: "cliente", label: "Cliente" },
];

const ROLE_BADGE: Record<UserRole, string> = {
  superadmin: "bg-brick/10 text-brick",
  admin: "bg-mustard/20 text-mustard-600",
  cliente: "bg-olive/15 text-olive-600",
};
const ROLE_ICON: Record<UserRole, typeof Shield> = {
  superadmin: ShieldCheck,
  admin: Shield,
  cliente: UserRound,
};

const VAZIO: Partial<User> = {
  name: "",
  email: "",
  phone: "",
  city: "Salvador",
  role: "cliente",
  active: true,
  orders: 0,
  spent: 0,
};

export default function UsuariosAdmin({ initial }: { initial: User[] }) {
  const [users, setUsers] = useState<User[]>(initial);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<UserRole | "todos">("todos");
  const [editando, setEditando] = useState<Partial<User> | null>(null);
  const [salvando, setSalvando] = useState(false);

  const filtrados = useMemo(
    () =>
      users.filter((u) => {
        const okBusca =
          u.name.toLowerCase().includes(busca.toLowerCase()) ||
          u.email.toLowerCase().includes(busca.toLowerCase());
        const okFiltro = filtro === "todos" || u.role === filtro;
        return okBusca && okFiltro;
      }),
    [users, busca, filtro]
  );

  const clientes = users.filter((u) => u.role === "cliente").length;
  const equipe = users.filter((u) => u.role !== "cliente").length;
  const ativos = users.filter((u) => u.active).length;

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!editando) return;
    setSalvando(true);
    const isEdit = !!editando.id;
    const res = await fetch("/api/admin/usuarios", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editando),
    });
    const data = await res.json();
    setSalvando(false);
    if (!res.ok) {
      toast.error(data.error || "Erro ao salvar");
      return;
    }
    const saved: User = data.user;
    setUsers((prev) =>
      isEdit ? prev.map((u) => (u.id === saved.id ? saved : u)) : [saved, ...prev]
    );
    setEditando(null);
    toast.success(isEdit ? "Usuário atualizado" : "Usuário criado");
  }

  async function excluir(u: User) {
    if (u.role === "superadmin") {
      toast.error("O superadmin não pode ser removido.");
      return;
    }
    if (!confirm(`Excluir "${u.name}"?`)) return;
    const res = await fetch("/api/admin/usuarios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id }),
    });
    if (res.ok) {
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
      toast.success("Usuário removido");
    }
  }

  function set<K extends keyof User>(campo: K, valor: User[K]) {
    setEditando((e) => (e ? { ...e, [campo]: valor } : e));
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-bold text-earth">Usuários</h1>
          <p className="text-earth/60">
            Gerencie clientes e equipe (acesso do superadmin)
          </p>
        </div>
        <button
          onClick={() => setEditando({ ...VAZIO })}
          className="btn-brick"
        >
          <Plus className="h-4 w-4" /> Novo usuário
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total de usuários" count={users.length} accent="earth" icon={Users} />
        <StatCard label="Clientes" count={clientes} accent="olive" icon={UserRound} />
        <StatCard label="Equipe" count={equipe} accent="mustard" icon={Shield} />
        <StatCard label="Ativos" count={ativos} accent="olive" icon={ShieldCheck} />
      </div>

      {/* filtros */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="inp pl-9"
          />
        </div>
        <div className="flex gap-2">
          {(["todos", ...ROLES.map((r) => r.key)] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f as UserRole | "todos")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                filtro === f
                  ? "bg-brick text-cream"
                  : "bg-white text-earth hover:bg-cream-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* tabela */}
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-cream-200 text-earth/60">
            <tr>
              <th className="p-3">Usuário</th>
              <th className="p-3">Cidade</th>
              <th className="p-3">Papel</th>
              <th className="p-3">Pedidos</th>
              <th className="p-3">Gasto</th>
              <th className="p-3">Desde</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u) => {
              const RoleIcon = ROLE_ICON[u.role];
              return (
                <tr
                  key={u.id}
                  className="border-b border-cream-100 hover:bg-cream-50"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 text-sm font-bold text-earth">
                        {u.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-semibold text-earth">{u.name}</p>
                        <p className="text-xs text-earth/50">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-earth/70">{u.city}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${ROLE_BADGE[u.role]}`}
                    >
                      <RoleIcon className="h-3 w-3" />
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-earth/70">{u.orders}</td>
                  <td className="p-3 font-semibold text-brick">
                    {formatBRL(u.spent)}
                  </td>
                  <td className="p-3 text-earth/60">{formatDate(u.created_at)}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.active
                          ? "bg-olive/15 text-olive-600"
                          : "bg-earth/10 text-earth/60"
                      }`}
                    >
                      {u.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditando(u)}
                        className="rounded-lg p-1.5 text-brick transition hover:bg-brick/10"
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => excluir(u)}
                        className="rounded-lg p-1.5 text-earth/50 transition hover:bg-brick/10 hover:text-brick"
                        aria-label="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <p className="py-10 text-center text-sm text-earth/50">
            Nenhum usuário encontrado.
          </p>
        )}
      </div>

      {/* modal */}
      <AnimatePresence>
        {editando && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-earth/40 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditando(null)}
          >
            <motion.form
              onSubmit={salvar}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lift"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-earth">
                  {editando.id ? "Editar usuário" : "Novo usuário"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  className="rounded-full p-1.5 text-earth/50 hover:bg-earth/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Campo label="Nome" className="sm:col-span-2">
                  <input
                    required
                    value={editando.name || ""}
                    onChange={(e) => set("name", e.target.value)}
                    className="inp"
                  />
                </Campo>
                <Campo label="E-mail" className="sm:col-span-2">
                  <input
                    required
                    type="email"
                    value={editando.email || ""}
                    onChange={(e) => set("email", e.target.value)}
                    className="inp"
                  />
                </Campo>
                <Campo label="Telefone">
                  <input
                    value={editando.phone || ""}
                    onChange={(e) => set("phone", e.target.value)}
                    className="inp"
                  />
                </Campo>
                <Campo label="Cidade">
                  <input
                    value={editando.city || ""}
                    onChange={(e) => set("city", e.target.value)}
                    className="inp"
                  />
                </Campo>
                <Campo label="Papel">
                  <select
                    value={editando.role}
                    onChange={(e) => set("role", e.target.value as UserRole)}
                    className="inp capitalize"
                  >
                    {ROLES.map((r) => (
                      <option key={r.key} value={r.key}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </Campo>
                <Campo label="Pedidos">
                  <input
                    type="number"
                    value={editando.orders ?? 0}
                    onChange={(e) => set("orders", Number(e.target.value))}
                    className="inp"
                  />
                </Campo>
                <label className="mt-1 flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={!!editando.active}
                    onChange={(e) => set("active", e.target.checked)}
                    className="h-4 w-4 accent-brick"
                  />
                  Usuário ativo
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  className="btn-outline"
                >
                  Cancelar
                </button>
                <button disabled={salvando} className="btn-brick">
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Campo({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-earth">{label}</span>
      {children}
    </label>
  );
}
