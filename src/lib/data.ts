import { Product, Order, Expense, User, OrderItem } from "./types";

// ==========================================================
//  DADOS FICTICIOS DA YBA
//  Servem para 2 coisas:
//  1) O site FUNCIONA mesmo antes de voce configurar o Supabase
//     (otimo para ver tudo rodando de primeira).
//  2) Sao os mesmos dados do arquivo supabase/seed.sql, para quando
//     voce conectar o banco de verdade.
// ==========================================================

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "alface-crespa-organica",
    name: "Alface Crespa Orgânica",
    description:
      "Colhida no dia, folhas crocantes e sem agrotóxicos. Direto da roça baiana para sua mesa.",
    price: 4.5,
    cost: 1.8,
    unit: "maço",
    category: "verduras",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80",
    stock: 40,
    active: true,
    featured: true,
  },
  {
    id: "2",
    slug: "cenoura-organica",
    name: "Cenoura Orgânica",
    description:
      "Doce, firme e cheia de sabor. Cultivada em solo vivo, sem adubo químico.",
    price: 6.9,
    cost: 2.5,
    unit: "kg",
    category: "legumes",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80",
    stock: 60,
    active: true,
    featured: true,
  },
  {
    id: "3",
    slug: "tomate-italiano-organico",
    name: "Tomate Italiano Orgânico",
    description:
      "Ideal para molhos e saladas. Maturação natural, colhido no ponto certo.",
    price: 8.9,
    cost: 3.4,
    unit: "kg",
    category: "legumes",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    stock: 35,
    active: true,
    featured: true,
  },
  {
    id: "4",
    slug: "banana-da-terra-organica",
    name: "Banana da Terra Orgânica",
    description:
      "Clássica da Bahia. Perfeita para fritar, assar ou fazer aquela farofa.",
    price: 7.5,
    cost: 2.9,
    unit: "kg",
    category: "frutas",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80",
    stock: 50,
    active: true,
    featured: true,
  },
  {
    id: "5",
    slug: "coentro-organico",
    name: "Coentro Orgânico",
    description:
      "Não tem comida baiana sem coentro. Aroma intenso, folhas fresquinhas.",
    price: 3.0,
    cost: 1.0,
    unit: "maço",
    category: "temperos",
    image:
      "",
    stock: 45,
    active: true,
    featured: false,
  },
  {
    id: "6",
    slug: "pimenta-de-cheiro-organica",
    name: "Pimenta de Cheiro Orgânica",
    description:
      "O tempero que perfuma o dendê. Suave no ardor, forte no aroma.",
    price: 5.5,
    cost: 1.9,
    unit: "bandeja",
    category: "temperos",
    image:
      "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&q=80",
    stock: 30,
    active: true,
    featured: false,
  },
  {
    id: "7",
    slug: "beterraba-organica",
    name: "Beterraba Orgânica",
    description:
      "Raiz doce e nutritiva, ótima em sucos, saladas e assados.",
    price: 5.9,
    cost: 2.2,
    unit: "kg",
    category: "legumes",
    image:
      "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=800&q=80",
    stock: 38,
    active: true,
    featured: false,
  },
  {
    id: "8",
    slug: "couve-manteiga-organica",
    name: "Couve Manteiga Orgânica",
    description:
      "Folhas macias para o acarajé, o caruru e o suco verde de todo dia.",
    price: 4.0,
    cost: 1.4,
    unit: "maço",
    category: "verduras",
    image:
      "",
    stock: 42,
    active: true,
    featured: false,
  },
  {
    id: "9",
    slug: "manga-rosa-organica",
    name: "Manga Rosa Orgânica",
    description:
      "Doce, suculenta e perfumada. A cara do verão baiano.",
    price: 9.9,
    cost: 3.8,
    unit: "kg",
    category: "frutas",
    image:
      "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=80",
    stock: 25,
    active: true,
    featured: true,
  },
  {
    id: "10",
    slug: "feijao-de-corda-organico",
    name: "Feijão de Corda Orgânico",
    description:
      "Base do acarajé e do baião. Grão selecionado, cultivo agroecológico.",
    price: 12.9,
    cost: 6.5,
    unit: "kg",
    category: "graos",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    stock: 55,
    active: true,
    featured: false,
  },
  {
    id: "11",
    slug: "cesta-organica-semana",
    name: "Cesta Orgânica da Semana",
    description:
      "Seleção do agricultor com 8 a 10 itens da estação. Colheita comum, união que frutifica.",
    price: 59.9,
    cost: 28.0,
    unit: "cesta",
    category: "cestas",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    stock: 20,
    active: true,
    featured: true,
  },
  {
    id: "12",
    slug: "cebola-roxa-organica",
    name: "Cebola Roxa Orgânica",
    description:
      "Sabor marcante para vinagretes e refogados. Sem conservantes.",
    price: 6.5,
    cost: 2.3,
    unit: "kg",
    category: "legumes",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80",
    stock: 48,
    active: true,
    featured: false,
  },
];

// Vendas ficticias (para os graficos do painel funcionarem sem banco)
export const ORDERS: Order[] = [
  { id: "1001", customer_name: "Ana Souza", customer_email: "ana@email.com", customer_phone: "71999990001", address: "Rua das Flores, 12", city: "Salvador", total: 74.3, shipping: 10, status: "entregue", payment_method: "PIX", created_at: "2026-06-02" },
  { id: "1002", customer_name: "Carlos Lima", customer_email: "carlos@email.com", customer_phone: "71999990002", address: "Av. Oceânica, 500", city: "Salvador", total: 59.9, shipping: 0, status: "entregue", payment_method: "PIX", created_at: "2026-06-05" },
  { id: "1003", customer_name: "Beatriz Rocha", customer_email: "bia@email.com", customer_phone: "71999990003", address: "Rua da Praia, 88", city: "Lauro de Freitas", total: 121.4, shipping: 15, status: "entregue", payment_method: "Cartão", created_at: "2026-06-11" },
  { id: "1004", customer_name: "Diego Nunes", customer_email: "diego@email.com", customer_phone: "71999990004", address: "Rua do Sol, 3", city: "Salvador", total: 42.5, shipping: 10, status: "pago", payment_method: "Boleto", created_at: "2026-06-18" },
  { id: "1005", customer_name: "Elaine Dias", customer_email: "elaine@email.com", customer_phone: "71999990005", address: "Av. Paralela, 1000", city: "Salvador", total: 89.7, shipping: 0, status: "enviado", payment_method: "PIX", created_at: "2026-06-24" },
  { id: "1006", customer_name: "Fábio Alves", customer_email: "fabio@email.com", customer_phone: "71999990006", address: "Rua Nova, 45", city: "Camaçari", total: 67.8, shipping: 18, status: "pago", payment_method: "PIX", created_at: "2026-07-01" },
  { id: "1007", customer_name: "Gabi Martins", customer_email: "gabi@email.com", customer_phone: "71999990007", address: "Rua Verde, 9", city: "Salvador", total: 154.2, shipping: 0, status: "pago", payment_method: "Cartão", created_at: "2026-07-08" },
  { id: "1008", customer_name: "Heitor Pires", customer_email: "heitor@email.com", customer_phone: "71999990008", address: "Av. ACM, 200", city: "Salvador", total: 33.4, shipping: 10, status: "pendente", payment_method: "PIX", created_at: "2026-07-15" },
];

// Despesas ficticias
export const EXPENSES: Expense[] = [
  { id: "1", description: "Compra de sementes orgânicas", category: "Insumos", amount: 320, date: "2026-06-03" },
  { id: "2", description: "Combustível entregas", category: "Logística", amount: 210, date: "2026-06-10" },
  { id: "3", description: "Embalagens ecológicas", category: "Embalagem", amount: 180, date: "2026-06-15" },
  { id: "4", description: "Feira do produtor", category: "Compras", amount: 640, date: "2026-06-20" },
  { id: "5", description: "Anúncios Instagram", category: "Marketing", amount: 150, date: "2026-07-02" },
  { id: "6", description: "Combustível entregas", category: "Logística", amount: 190, date: "2026-07-12" },
];

// Capital inicial investido no negocio (para o painel)
export const CAPITAL_INICIAL = 5000;

// ==========================================================
//  USUARIOS FICTICIOS (clientes + equipe)
//  O superadmin gerencia todos aqui no painel.
// ==========================================================
export const USERS: User[] = [
  { id: "u1", name: "Guilherme Pereira", email: "guilhermepereira0207@gmail.com", phone: "71999990000", city: "Salvador", role: "superadmin", active: true, orders: 0, spent: 0, created_at: "2026-01-10" },
  { id: "u2", name: "Marina Costa", email: "marina@yba.com", phone: "71999990010", city: "Salvador", role: "admin", active: true, orders: 0, spent: 0, created_at: "2026-02-01" },
  { id: "u3", name: "Ana Souza", email: "ana@email.com", phone: "71999990001", city: "Salvador", role: "cliente", active: true, orders: 4, spent: 312.4, created_at: "2026-03-12" },
  { id: "u4", name: "Carlos Lima", email: "carlos@email.com", phone: "71999990002", city: "Salvador", role: "cliente", active: true, orders: 3, spent: 198.7, created_at: "2026-03-20" },
  { id: "u5", name: "Beatriz Rocha", email: "bia@email.com", phone: "71999990003", city: "Lauro de Freitas", role: "cliente", active: true, orders: 5, spent: 421.9, created_at: "2026-04-02" },
  { id: "u6", name: "Diego Nunes", email: "diego@email.com", phone: "71999990004", city: "Salvador", role: "cliente", active: true, orders: 2, spent: 89.5, created_at: "2026-04-18" },
  { id: "u7", name: "Elaine Dias", email: "elaine@email.com", phone: "71999990005", city: "Salvador", role: "cliente", active: false, orders: 1, spent: 89.7, created_at: "2026-05-05" },
  { id: "u8", name: "Fábio Alves", email: "fabio@email.com", phone: "71999990006", city: "Camaçari", role: "cliente", active: true, orders: 2, spent: 145.6, created_at: "2026-05-22" },
  { id: "u9", name: "Gabi Martins", email: "gabi@email.com", phone: "71999990007", city: "Salvador", role: "cliente", active: true, orders: 6, spent: 612.3, created_at: "2026-06-01" },
  { id: "u10", name: "Heitor Pires", email: "heitor@email.com", phone: "71999990008", city: "Salvador", role: "cliente", active: true, orders: 1, spent: 33.4, created_at: "2026-07-10" },
];

// ==========================================================
//  ITENS DOS PEDIDOS (para calcular produtos mais vendidos)
//  Referenciam PRODUCTS por id.
// ==========================================================
export const ORDER_ITEMS: OrderItem[] = [
  { order_id: "1001", product_id: "1", product_name: "Alface Crespa Orgânica", price: 4.5, quantity: 6 },
  { order_id: "1001", product_id: "2", product_name: "Cenoura Orgânica", price: 6.9, quantity: 3 },
  { order_id: "1002", product_id: "3", product_name: "Tomate Italiano Orgânico", price: 8.9, quantity: 4 },
  { order_id: "1002", product_id: "1", product_name: "Alface Crespa Orgânica", price: 4.5, quantity: 5 },
  { order_id: "1003", product_id: "4", product_name: "Banana da Terra Orgânica", price: 7.5, quantity: 8 },
  { order_id: "1003", product_id: "2", product_name: "Cenoura Orgânica", price: 6.9, quantity: 6 },
  { order_id: "1004", product_id: "1", product_name: "Alface Crespa Orgânica", price: 4.5, quantity: 4 },
  { order_id: "1005", product_id: "3", product_name: "Tomate Italiano Orgânico", price: 8.9, quantity: 5 },
  { order_id: "1005", product_id: "2", product_name: "Cenoura Orgânica", price: 6.9, quantity: 4 },
  { order_id: "1006", product_id: "4", product_name: "Banana da Terra Orgânica", price: 7.5, quantity: 3 },
  { order_id: "1006", product_id: "1", product_name: "Alface Crespa Orgânica", price: 4.5, quantity: 7 },
  { order_id: "1007", product_id: "3", product_name: "Tomate Italiano Orgânico", price: 8.9, quantity: 9 },
  { order_id: "1007", product_id: "2", product_name: "Cenoura Orgânica", price: 6.9, quantity: 5 },
  { order_id: "1008", product_id: "1", product_name: "Alface Crespa Orgânica", price: 4.5, quantity: 3 },
];
