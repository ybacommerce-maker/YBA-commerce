-- ==========================================================
--  YBA - ESTRUTURA DO BANCO DE DADOS (Supabase / PostgreSQL)
--  COMO USAR:
--   1) Entre no seu projeto no Supabase
--   2) Menu lateral > SQL Editor > New query
--   3) Cole TODO este arquivo e clique em "Run"
--   4) Depois rode o arquivo seed.sql para popular com dados ficticios
-- ==========================================================

-- Extensao para gerar IDs unicos
create extension if not exists "pgcrypto";

-- ---------- PRODUTOS ----------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text default '',
  price numeric(10,2) not null default 0,
  cost numeric(10,2) not null default 0,
  unit text default 'un',
  category text not null default 'legumes',
  image text default '',
  stock integer not null default 0,
  active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz default now()
);

-- ---------- PEDIDOS ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text default '',
  address text default '',
  city text default '',
  total numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  status text not null default 'pendente',
  payment_method text default 'PIX',
  asaas_payment_id text,
  created_at timestamptz default now()
);

-- ---------- ITENS DO PEDIDO ----------
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  price numeric(10,2) not null,
  quantity integer not null default 1
);

-- ---------- DESPESAS ----------
create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  category text not null default 'Outros',
  amount numeric(10,2) not null default 0,
  date date not null default current_date,
  created_at timestamptz default now()
);

-- ---------- USUARIOS (clientes + equipe) ----------
-- Gerenciados pelo superadmin no painel. 'role' controla o nivel de acesso.
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text default '',
  city text default '',
  role text not null default 'cliente', -- 'superadmin' | 'admin' | 'cliente'
  active boolean not null default true,
  orders integer not null default 0,
  spent numeric(10,2) not null default 0,
  created_at date not null default current_date
);

-- ==========================================================
--  SEGURANCA (Row Level Security)
--  Regra simples para comecar:
--   - Qualquer visitante PODE LER os produtos (para a loja funcionar)
--   - Escrita (admin) usa a chave "service_role" no servidor,
--     que ignora estas regras. Por isso NAO criamos policy de escrita aqui.
--  Quando voce adicionar login de admin de verdade (Supabase Auth),
--  da pra deixar as regras mais rigorosas.
-- ==========================================================

alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table expenses enable row level security;
alter table users enable row level security;
-- (users fica sem policy publica: so o servidor com service_role acessa.)

-- Leitura publica de produtos ativos
drop policy if exists "produtos leitura publica" on products;
create policy "produtos leitura publica"
  on products for select
  using (true);

-- (orders, order_items e expenses ficam sem policy publica:
--  so o servidor com service_role acessa. Mais seguro.)
