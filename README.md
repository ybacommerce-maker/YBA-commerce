# 🌱 YBÁ — E-commerce de Orgânicos

> Colheita comum, união que frutifica.

Loja virtual completa de produtos orgânicos, no estilo Bahia/agro, com **painel administrativo**, **pagamentos (Asaas)**, **banco de dados (Supabase)** e pronta para publicar na **Vercel**.

Este guia foi escrito para **quem está começando do zero**. Vá com calma, um passo de cada vez. Se travar em algum ponto, é só me chamar de novo e a gente resolve.

---

## 📚 Índice

1. [O que já está pronto](#1-o-que-já-está-pronto)
2. [Como funciona (visão geral)](#2-como-funciona-visão-geral)
3. [Passo 1 — Instalar as ferramentas](#3-passo-1--instalar-as-ferramentas)
4. [Passo 2 — Rodar o site no seu PC](#4-passo-2--rodar-o-site-no-seu-pc)
5. [Passo 3 — Criar o banco no Supabase](#5-passo-3--criar-o-banco-no-supabase)
6. [Passo 4 — Configurar o pagamento (Asaas)](#6-passo-4--configurar-o-pagamento-asaas)
7. [Passo 5 — Publicar na Vercel](#7-passo-5--publicar-na-vercel)
8. [O painel administrativo](#8-o-painel-administrativo)
9. [Estrutura das pastas](#9-estrutura-das-pastas)
10. [Perguntas frequentes](#10-perguntas-frequentes)
11. [Próximas melhorias](#11-próximas-melhorias)

---

## 1. O que já está pronto

✅ **Loja (frente da loja)**
- Página inicial com a marca YBÁ
- Catálogo com filtro por categoria e busca
- Página de cada produto
- Carrinho de compras (salvo no navegador)
- Checkout com cálculo de frete

✅ **Painel administrativo** (`/admin`)
- Login com senha
- Dashboard com gráficos (receita, despesas, lucro, capital)
- Cadastro de produtos (criar, editar, excluir) — **sem mexer em código**
- Lista de vendas
- Controle de despesas
- Simulador de vendas (projeção de faturamento e lucro)

✅ **Integrações**
- Banco de dados Supabase (com plano B: funciona mesmo sem configurar)
- Pagamento Asaas (PIX, boleto e cartão)
- 12 produtos fictícios + vendas e despesas de exemplo

> 💡 **Importante:** o site já funciona *antes* de você configurar o Supabase e o Asaas. Ele usa dados fictícios até você conectar as ferramentas de verdade. Isso é ótimo para apresentar ao seu lead rapidinho.

---

## 2. Como funciona (visão geral)

Pense no projeto como 3 peças que se conversam:

```
   [ SEU SITE (Next.js) ] ──── guarda produtos/pedidos em ──▶ [ SUPABASE (banco) ]
            │
            └──── cria cobranças em ──▶ [ ASAAS (pagamento) ]

   Tudo isso publicado na ──▶ [ VERCEL (hospedagem) ]
```

- **Next.js**: é o site em si (a parte que a pessoa vê + a lógica por trás). Front-end e back-end no mesmo projeto.
- **Supabase**: é o "arquivo" onde ficam guardados os produtos, pedidos e despesas.
- **Asaas**: gera o PIX/boleto e avisa o site quando o cliente paga.
- **Vercel**: coloca o site no ar, com um endereço `.vercel.app`.

---

## 3. Passo 1 — Instalar as ferramentas

Você só precisa instalar **uma** coisa: o **Node.js**. Ele é o motor que roda o site no seu computador.

1. Acesse **https://nodejs.org**
2. Baixe a versão **LTS** (o botão da esquerda)
3. Instale clicando "Avançar" até o fim
4. Para conferir se deu certo, abra o **Prompt de Comando** (aperte a tecla Windows, digite `cmd` e Enter) e digite:

   ```bash
   node -v
   ```

   Se aparecer algo como `v20.x.x`, está tudo certo. 🎉

> Recomendado (opcional): instale o **VS Code** (https://code.visualstudio.com) — é o programa onde você abre e edita o projeto com conforto.

---

## 4. Passo 2 — Rodar o site no seu PC

A pasta do projeto está em `D:\YBA`. Vamos ligá-la.

1. Abra o **Prompt de Comando** e entre na pasta:

   ```bash
   cd D:\YBA
   ```

2. Instale as dependências do projeto (só na primeira vez — pode demorar 1-2 min):

   ```bash
   npm install
   ```

3. Crie o arquivo de configuração. Copie o arquivo `.env.local.example` e renomeie a cópia para `.env.local`.
   (No Prompt de Comando dá pra fazer assim:)

   ```bash
   copy .env.local.example .env.local
   ```

   > Por enquanto **não precisa preencher nada** dentro dele — o site já roda com dados fictícios.

4. Ligue o site:

   ```bash
   npm run dev
   ```

5. Abra o navegador em **http://localhost:3000** 🚀

   - Loja: http://localhost:3000
   - Painel admin: http://localhost:3000/admin (senha: `yba-admin-2026`)

Para **desligar** o site, volte no Prompt de Comando e aperte `Ctrl + C`.

---

## 5. Passo 3 — Criar o banco no Supabase

Isso faz os produtos e pedidos ficarem salvos de verdade (não somem quando reinicia).

1. Acesse **https://supabase.com** e crie uma conta (pode entrar com o Google). É gratuito.
2. Clique em **New project**. Dê um nome (ex: `yba`), crie uma senha para o banco e escolha a região mais perto (ex: São Paulo). Aguarde ~2 min o projeto ficar pronto.
3. No menu lateral, vá em **SQL Editor** → **New query**.
4. Abra o arquivo `supabase/schema.sql` do projeto, **copie todo o conteúdo**, cole ali e clique em **Run**. Isso cria as tabelas.
5. Faça o mesmo com o arquivo `supabase/seed.sql` (cola e Run). Isso preenche com os produtos fictícios.
6. Agora pegue suas chaves: menu **Settings** (engrenagem) → **API**. Você vai ver:
   - **Project URL** → copie
   - **anon public** (em Project API keys) → copie
   - **service_role** (clique em "Reveal") → copie — **essa é secreta, cuidado!**
7. Abra o arquivo `.env.local` (na pasta do projeto) e preencha:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=cole-a-project-url-aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=cole-a-anon-key-aqui
   SUPABASE_SERVICE_ROLE_KEY=cole-a-service-role-aqui
   ```

8. Desligue o site (`Ctrl + C`) e ligue de novo (`npm run dev`). Pronto — agora ele lê do banco de verdade! Cadastre um produto no painel e veja aparecer no Supabase.

---

## 6. Passo 4 — Configurar o pagamento (Asaas)

Comece pelo **ambiente de testes (Sandbox)**, onde nada é cobrado de verdade.

1. Acesse **https://sandbox.asaas.com** e crie uma conta de testes.
2. No painel do Asaas, vá em **Integrações → API** e copie a sua **chave de API**.
3. No `.env.local`, preencha:

   ```env
   ASAAS_API_KEY=cole-a-chave-do-asaas
   ASAAS_API_URL=https://sandbox.asaas.com/api/v3
   ```

4. Reinicie o site. Agora, ao finalizar uma compra, o site gera uma cobrança PIX/boleto de verdade (de teste).

**Confirmação automática do pagamento (webhook):**
Quando publicar na Vercel (próximo passo), volte no Asaas em **Integrações → Notificações (Webhooks)** e cadastre a URL:

```
https://SEU-SITE.vercel.app/api/webhook/asaas
```

Assim, quando o cliente paga, o pedido vira "pago" sozinho no painel.

> Quando estiver tudo testado e você quiser cobrar de verdade, troque a chave pela da conta **de produção** e mude a `ASAAS_API_URL` para `https://api.asaas.com/v3`.

---

## 7. Passo 5 — Publicar na Vercel

1. Crie uma conta no **GitHub** (https://github.com) — é onde o código fica guardado.
2. Suba o projeto para o GitHub. O jeito mais fácil, na pasta `D:\YBA`:

   ```bash
   git init
   git add .
   git commit -m "primeira versao YBA"
   ```

   Depois crie um repositório novo no GitHub e siga as instruções de "push an existing repository" que ele mostra na tela.
3. Acesse **https://vercel.com** e entre com o GitHub.
4. Clique em **Add New → Project**, escolha o repositório `YBA` e clique em **Import**.
5. Antes de finalizar, abra **Environment Variables** e cole ali as MESMAS variáveis do seu `.env.local` (uma a uma). Isso é essencial — a Vercel não lê o arquivo `.env.local`.
6. Clique em **Deploy**. Em ~1 min seu site estará no ar num endereço `.vercel.app`. 🎉

> Toda vez que você fizer `git push`, a Vercel atualiza o site sozinha.

---

## 8. O painel administrativo

Acesse em `/admin`. Senha padrão: **`yba-admin-2026`** (troque em `ADMIN_PASSWORD` no `.env.local`).

| Página | O que faz |
|--------|-----------|
| **Dashboard** | Números do negócio + gráficos de receita, despesas, lucro e capital |
| **Produtos** | Adicionar, editar e excluir produtos (preço, custo, estoque, foto, destaque) |
| **Vendas** | Lista de todos os pedidos e seus status |
| **Despesas** | Lançar e acompanhar os gastos |
| **Simulador** | Projeção de faturamento/lucro para planejar e apresentar |

> Com o Supabase configurado, tudo que você cadastra aqui é salvo de verdade e aparece na loja na hora.

---

## 9. Estrutura das pastas

```
D:\YBA
├── src/
│   ├── app/
│   │   ├── (loja)/            → páginas da LOJA (home, produtos, carrinho, checkout)
│   │   ├── admin/             → páginas do PAINEL
│   │   └── api/               → o "back-end" (checkout, webhook, login, CRUD)
│   ├── components/            → peças reutilizáveis (botões, cards, gráficos...)
│   ├── context/              → carrinho de compras
│   └── lib/                   → regras e integrações (Supabase, Asaas, cálculos)
├── supabase/
│   ├── schema.sql            → cria as tabelas
│   └── seed.sql              → dados fictícios
├── .env.local.example        → modelo das configurações (copie para .env.local)
└── README.md                 → este guia
```

Os arquivos têm **comentários em português** explicando o que cada parte faz. Abra e leia com calma — é a melhor forma de aprender.

---

## 10. Perguntas frequentes

**O site não abre / dá erro no `npm install`.**
Confirme que instalou o Node.js (passo 1) e que está dentro da pasta certa (`cd D:\YBA`).

**Mudei o `.env.local` e nada mudou.**
Você precisa desligar (`Ctrl + C`) e ligar o site de novo (`npm run dev`). As configurações só são lidas ao iniciar.

**As fotos dos produtos são de um site externo?**
Sim, por enquanto usam imagens de demonstração (Unsplash). Depois você troca pela URL das suas próprias fotos no cadastro do produto.

**É seguro subir para o GitHub?**
Sim — o arquivo `.env.local` (com suas chaves secretas) **não** vai junto, pois está no `.gitignore`. Nunca compartilhe suas chaves.

**Perdi a senha do admin.**
Ela está na variável `ADMIN_PASSWORD` do `.env.local`. Mude para o que quiser.

---

## 11. Próximas melhorias

Ideias para evoluir depois (posso te ajudar com cada uma):

- 🔐 Login de admin com Supabase Auth (mais seguro que a senha única)
- 📦 Salvar os itens de cada pedido (tabela `order_items`) e ver o detalhe da venda
- 🚚 Cálculo de frete por CEP (Correios ou Melhor Envio)
- 📧 E-mail automático de confirmação de pedido
- ⭐ Avaliações de produtos
- 🔍 Melhorias de SEO para aparecer no Google
- 📱 App/PWA para instalar no celular

---

Feito com 🌱 para a **YBÁ**. Qualquer dúvida, é só chamar!
