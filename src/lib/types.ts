// Tipos usados no projeto inteiro.
// Se voce mudar as colunas no Supabase, atualize aqui tambem.

export type Category =
  | "verduras"
  | "legumes"
  | "frutas"
  | "temperos"
  | "graos"
  | "cestas";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // preco de venda (R$)
  cost: number; // custo (usado no simulador/lucro)
  unit: string; // ex: "maço", "kg", "bandeja"
  category: Category;
  image: string;
  stock: number;
  active: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "pendente"
  | "pago"
  | "enviado"
  | "entregue"
  | "cancelado";

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  total: number;
  shipping: number;
  status: OrderStatus;
  payment_method: string;
  created_at: string;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

// ---------- USUARIOS (clientes e equipe) ----------
export type UserRole = "superadmin" | "admin" | "cliente";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  active: boolean;
  orders: number; // qtd de pedidos feitos
  spent: number; // total gasto (R$)
  created_at: string;
}

// ---------- ITENS DO PEDIDO (para top produtos / detalhe) ----------
export interface OrderItem {
  order_id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}
