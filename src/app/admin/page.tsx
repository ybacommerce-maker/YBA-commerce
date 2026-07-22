import DashboardClient from "@/components/admin/DashboardClient";
import {
  getOrders,
  getExpenses,
  getAllProducts,
  getUsers,
  getOrderItems,
  calcularStats,
} from "@/lib/admin";
import { isSupabaseConfigured } from "@/lib/db";

export default async function AdminDashboard() {
  const [orders, expenses, products, users, items] = await Promise.all([
    getOrders(),
    getExpenses(),
    getAllProducts(),
    getUsers(),
    getOrderItems(),
  ]);
  const stats = calcularStats(orders, expenses, products, items);

  // Passamos apenas dados "serializaveis" para o componente client
  const recentOrders = orders.slice(0, 6).map((o) => ({
    id: o.id,
    customer_name: o.customer_name,
    city: o.city,
    total: o.total,
    status: o.status,
  }));

  return (
    <DashboardClient
      stats={stats}
      recentOrders={recentOrders}
      produtosAtivos={products.filter((p) => p.active).length}
      produtosTotal={products.length}
      clientes={users.filter((u) => u.role === "cliente").length}
      usuariosTotal={users.length}
      isDemo={!isSupabaseConfigured()}
    />
  );
}
