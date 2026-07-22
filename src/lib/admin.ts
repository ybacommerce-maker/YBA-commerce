import { Order, Expense, Product, User, OrderItem } from "./types";
import {
  ORDERS,
  EXPENSES,
  PRODUCTS,
  CAPITAL_INICIAL,
  USERS,
  ORDER_ITEMS,
} from "./data";
import { isSupabaseConfigured } from "./db";
import { createAdminClient } from "./supabase/server";

// ==========================================================
//  DADOS DO PAINEL ADMIN
//  Busca do Supabase quando configurado; senao usa os ficticios.
// ==========================================================

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured()) return ORDERS;
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return ORDERS;
    return data as Order[];
  } catch {
    return ORDERS;
  }
}

export async function getExpenses(): Promise<Expense[]> {
  if (!isSupabaseConfigured()) return EXPENSES;
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });
    if (error || !data || data.length === 0) return EXPENSES;
    return data as Expense[];
  } catch {
    return EXPENSES;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return PRODUCTS;
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("products").select("*").order("name");
    if (error || !data || data.length === 0) return PRODUCTS;
    return data as Product[];
  } catch {
    return PRODUCTS;
  }
}

// Usuarios (clientes + equipe)
export async function getUsers(): Promise<User[]> {
  if (!isSupabaseConfigured()) return USERS;
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return USERS;
    return data as User[];
  } catch {
    return USERS;
  }
}

// Itens dos pedidos (para calcular produtos mais vendidos)
export async function getOrderItems(): Promise<OrderItem[]> {
  if (!isSupabaseConfigured()) return ORDER_ITEMS;
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("order_items").select("*");
    if (error || !data || data.length === 0) return ORDER_ITEMS;
    return data as OrderItem[];
  } catch {
    return ORDER_ITEMS;
  }
}

export interface DashboardStats {
  receita: number;
  despesasTotal: number;
  lucro: number;
  capital: number;
  ticketMedio: number;
  totalPedidos: number;
  pedidosPagos: number;
  margemLucro: number;
  vendasPorMes: { mes: string; receita: number; despesas: number }[];
  vendasPorCategoria: { categoria: string; valor: number }[];
  statusPedidos: { status: string; qtd: number }[];
  topProdutos: { nome: string; qtd: number; receita: number }[];
  estoqueBaixo: Product[];
}

const LIMITE_ESTOQUE_BAIXO = 20;

// Produtos mais vendidos (a partir dos itens de pedido)
export function calcularTopProdutos(
  items: OrderItem[],
  limite = 5
): { nome: string; qtd: number; receita: number }[] {
  const mapa: Record<string, { nome: string; qtd: number; receita: number }> = {};
  for (const it of items) {
    const k = it.product_name;
    mapa[k] = mapa[k] || { nome: k, qtd: 0, receita: 0 };
    mapa[k].qtd += it.quantity;
    mapa[k].receita += it.quantity * it.price;
  }
  return Object.values(mapa)
    .sort((a, b) => b.qtd - a.qtd)
    .slice(0, limite);
}

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function calcularStats(
  orders: Order[],
  expenses: Expense[],
  products: Product[],
  items: OrderItem[] = []
): DashboardStats {
  const pagos = orders.filter((o) =>
    ["pago", "enviado", "entregue"].includes(o.status)
  );
  const receita = pagos.reduce((s, o) => s + o.total, 0);
  const despesasTotal = expenses.reduce((s, e) => s + e.amount, 0);
  const lucro = receita - despesasTotal;
  const capital = CAPITAL_INICIAL + lucro;
  const ticketMedio = pagos.length ? receita / pagos.length : 0;

  // Receita e despesas agrupadas por mes
  const mapaMes: Record<string, { receita: number; despesas: number }> = {};
  for (const o of pagos) {
    const m = MESES[new Date(o.created_at).getMonth()];
    mapaMes[m] = mapaMes[m] || { receita: 0, despesas: 0 };
    mapaMes[m].receita += o.total;
  }
  for (const e of expenses) {
    const m = MESES[new Date(e.date).getMonth()];
    mapaMes[m] = mapaMes[m] || { receita: 0, despesas: 0 };
    mapaMes[m].despesas += e.amount;
  }
  const vendasPorMes = MESES.filter((m) => mapaMes[m]).map((mes) => ({
    mes,
    receita: Math.round(mapaMes[mes].receita),
    despesas: Math.round(mapaMes[mes].despesas),
  }));

  // Despesas por categoria (para o grafico de pizza)
  const mapaCat: Record<string, number> = {};
  for (const e of expenses) {
    mapaCat[e.category] = (mapaCat[e.category] || 0) + e.amount;
  }
  const vendasPorCategoria = Object.entries(mapaCat).map(([categoria, valor]) => ({
    categoria,
    valor: Math.round(valor),
  }));

  // Status dos pedidos
  const mapaStatus: Record<string, number> = {};
  for (const o of orders) {
    mapaStatus[o.status] = (mapaStatus[o.status] || 0) + 1;
  }
  const statusPedidos = Object.entries(mapaStatus).map(([status, qtd]) => ({
    status,
    qtd,
  }));

  const topProdutos = calcularTopProdutos(items, 5);
  const estoqueBaixo = products
    .filter((p) => p.active && p.stock <= LIMITE_ESTOQUE_BAIXO)
    .sort((a, b) => a.stock - b.stock);
  const margemLucro = receita ? (lucro / receita) * 100 : 0;

  return {
    receita,
    despesasTotal,
    lucro,
    capital,
    ticketMedio,
    totalPedidos: orders.length,
    pedidosPagos: pagos.length,
    margemLucro,
    vendasPorMes,
    vendasPorCategoria,
    statusPedidos,
    topProdutos,
    estoqueBaixo,
  };
}

// A paleta de cores dos graficos fica em src/lib/chart.ts
// (arquivo separado, seguro para uso no navegador).
export { CHART } from "./chart";
