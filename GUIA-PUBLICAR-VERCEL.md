# 🚀 Guia YBÁ — Publicar o site na internet (Vercel)

> Feito para **total iniciante**. Um passo de cada vez, sem pressa.
> Se travar em qualquer ponto, é só me chamar de novo e a gente resolve juntos.

Ao final, seu site estará no ar num endereço tipo `https://yba.vercel.app`, que você pode mandar pro seu lead pelo WhatsApp. 🎉

**Tempo estimado:** 20 a 30 minutos na primeira vez.

---

## 🗺️ O caminho, em 3 grandes etapas

Pra colocar um site na internet, o código precisa primeiro ir pra um "cofre online" chamado **GitHub**. Depois a **Vercel** pega esse código do GitHub e coloca no ar. Pense assim:

```
   Seu PC (pasta D:\YBA)  ──▶  GitHub (guarda o código)  ──▶  Vercel (coloca no ar)
```

Então nossa jornada é:
1. **Etapa A** — Criar uma conta no GitHub e mandar seu projeto pra lá (usando um programa fácil, o GitHub Desktop).
2. **Etapa B** — Criar conta na Vercel e publicar.
3. **Etapa C** (opcional, depois) — Ligar o banco e o pagamento no site já publicado.

> 💡 Você **não precisa** ter configurado o Supabase nem o Asaas pra fazer a Etapa A e B. O site vai ao ar com os dados de exemplo. Perfeito pra apresentar.

---

## ✅ Antes de começar

Confirme que você já consegue rodar o site no seu PC (o passo anterior do README: `npm install` e `npm run dev` funcionando
 em http://localhost:3000). Se ainda não fez isso, faça primeiro — assim garantimos que está tudo certo antes de publicar. Se precisar, me chama que te ajudo com essa parte.

---

# Etapa A — Mandar o projeto pro GitHub

## A1. Criar sua conta no GitHub

1. Acesse **https://github.com**
2. Clique em **Sign up** (cadastrar).
3. Coloque seu e-mail, crie uma senha e um nome de usuário (ex: `guilhermeyba`). Anote o usuário e a senha num lugar seguro.
4. Confirme o e-mail que o GitHub enviar.

Pronto, seu "cofre online" está criado. É gratuito.

## A2. Instalar o GitHub Desktop (o jeito fácil, com botões)

Em vez de digitar comandos, vamos usar um programa visual.

1. Acesse **https://desktop.github.com**
2. Clique em **Download for Windows** e instale (é só ir clicando "avançar").
3. Ao abrir, ele vai pedir pra você **entrar (Sign in)** com a conta do GitHub que você acabou de criar. Faça login.
4. Se ele perguntar seu nome e e-mail (pra "assinar" as alterações), pode confirmar os dados da sua conta.

## A3. Adicionar a pasta do projeto

1. No GitHub Desktop, clique no menu **File → Add local repository** (Adicionar repositório local).
2. Clique em **Choose...** e navegue até a pasta **`D:\YBA`**. Selecione-a.
3. Clique em **Add repository**.

> Se aparecer um aviso "This directory does not appear to be a Git repository" com um botão azul **create a repository**, clique nesse botão e depois em **Create repository**. Isso só prepara a pasta — não muda seus arquivos.

## A4. Publicar (enviar pro GitHub)

1. Na parte de baixo à esquerda, onde diz **Summary**, escreva algo curto, ex: `primeira versao YBA`.
2. Clique no botão azul **Commit to main** (isso "empacota" suas alterações).
3. No topo, clique em **Publish repository** (Publicar repositório).
4. Vai abrir uma janelinha:
   - **Name:** deixe `YBA` (ou o que quiser).
   - ⚠️ **Deixe MARCADA a opção "Keep this code private"** (manter privado). Assim ninguém vê seu código.
   - Clique em **Publish repository**.

Esperar uns segundos... e pronto! Seu código está no GitHub. ✅

> 🔒 **Fique tranquilo:** o arquivo com suas senhas (`.env.local`) **não** foi enviado — o projeto já está configurado pra proteger ele. Eu conferi isso pra você.

---

# Etapa B — Publicar na Vercel

## B1. Criar conta na Vercel

1. Acesse **https://vercel.com**
2. Clique em **Sign Up** e escolha **Continue with GitHub** (Continuar com GitHub).
3. Ele vai pedir permissão pra conectar com sua conta do GitHub — clique em **Authorize** (Autorizar).
4. Pode escolher o plano **Hobby** (gratuito) quando perguntar. Se pedir seu nome, preencha e siga.

## B2. Importar o projeto

1. No painel da Vercel, clique em **Add New...** → **Project**.
2. Vai aparecer a lista dos seus repositórios do GitHub. Ache o **YBA** e clique em **Import**.
   - Se não aparecer, clique em **Adjust GitHub App Permissions** / **Configure**, autorize o acesso ao repositório YBA, e volte.
3. A Vercel reconhece sozinha que é um projeto **Next.js** — não precisa mudar nada nas configurações de build.

## B3. (Opcional, mas recomendado) Definir a senha do admin

Antes de clicar em Deploy, dá pra já configurar uma variável simples:

1. Ainda na tela de importação, procure a seção **Environment Variables** (Variáveis de Ambiente) e clique pra expandir.
2. Adicione uma variável:
   - **Key (nome):** `ADMIN_PASSWORD`
   - **Value (valor):** uma senha forte à sua escolha (ex: `yba@2026forte`) — é a senha pra entrar no painel `/admin` do site publicado.
3. Clique em **Add**.

> Se pular esta parte, a senha do painel será a padrão `yba-admin-2026`. Dá pra adicionar/mudar depois (veja a seção "Depois de publicar").

## B4. Deploy!

1. Clique no botão **Deploy**.
2. Aguarde ~1 a 2 minutos enquanto a Vercel "monta" o site (vai aparecer uma animação e uns logs correndo — é normal).
3. Quando terminar, aparece um **🎉 Congratulations** e uma imagem do seu site. Clique em **Continue to Dashboard** ou **Visit** pra abrir.

Seu endereço vai ser algo como **`https://yba.vercel.app`**. Esse link você já pode mandar pro seu lead. 🥳

- Loja: `https://SEU-SITE.vercel.app`
- Painel: `https://SEU-SITE.vercel.app/admin`

---

## 🔁 Como atualizar o site depois

Toda vez que você mexer no projeto no seu PC e quiser que a mudança apareça no site publicado, é só:

1. Abrir o **GitHub Desktop**.
2. Escrever um resumo curto em **Summary** (ex: `ajustei os precos`).
3. Clicar em **Commit to main**.
4. Clicar em **Push origin** (no topo).

A Vercel percebe sozinha e atualiza o site no ar em ~1 minuto. Você não precisa fazer mais nada. Mágico. ✨

---

# Etapa C — Ligar banco e pagamento (quando quiser, depois)

Seu site já está no ar com dados de exemplo. Quando você configurar o **Supabase** (banco) e o **Asaas** (pagamento) — seguindo os Passos 3 e 4 do `README.md` — você precisa avisar a **Vercel** dessas chaves também. Motivo: a Vercel não lê o arquivo `.env.local` do seu PC; ela tem o próprio lugar pra guardar isso.

**Como adicionar as variáveis na Vercel:**

1. No painel da Vercel, abra seu projeto **YBA**.
2. Vá em **Settings** (Configurações) → **Environment Variables**.
3. Adicione, uma por uma (as MESMAS do seu `.env.local`):

   | Key (nome) | Value (o que colar) |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | a Project URL do Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | a anon key do Supabase |
   | `SUPABASE_SERVICE_ROLE_KEY` | a service_role do Supabase (secreta!) |
   | `ASAAS_API_KEY` | sua chave do Asaas |
   | `ASAAS_API_URL` | `https://sandbox.asaas.com/api/v3` (testes) |
   | `ADMIN_PASSWORD` | sua senha do painel |
   | `NEXT_PUBLIC_SITE_URL` | `https://SEU-SITE.vercel.app` |

4. Depois de adicionar, vá em **Deployments**, clique nos três pontinhos do deploy mais recente e escolha **Redeploy** — pra o site recarregar já com as chaves.

**Webhook do Asaas (confirmação automática de pagamento):** no painel do Asaas, em **Integrações → Notificações (Webhooks)**, cadastre a URL:
```
https://SEU-SITE.vercel.app/api/webhook/asaas
```
Assim, quando o cliente paga, o pedido vira "pago" sozinho no seu painel.

---

## 🆘 Perguntas comuns

**O deploy deu erro (aparece um "Failed" vermelho).**
Clique no deploy pra ver os "Build Logs". Copie a mensagem de erro e me manda aqui — eu te ajudo a decifrar. Quase sempre é algo pequeno.

**Meu repositório não aparece na Vercel.**
Na hora de importar, clique em **Adjust GitHub App Permissions** e dê acesso ao repositório `YBA`.

**Preciso pagar alguma coisa?**
Não. GitHub, Vercel (plano Hobby), Supabase e Asaas (sandbox) têm níveis gratuitos que dão conta de sobra pra começar e apresentar pro lead.

**Cadastrei um produto no painel do site publicado e ele sumiu depois.**
Isso acontece enquanto o **Supabase não está configurado** — sem banco, os cadastros não ficam salvos de verdade (a Vercel "zera" a memória). Assim que você fizer a Etapa C, tudo passa a ser salvo permanentemente.

**É seguro deixar o repositório privado?**
Sim, e é o recomendado. A Vercel consegue publicar mesmo com o código privado.

---

Feito com 🌱 pra você tocar a **YBÁ**. Quando terminar cada etapa (ou se empacar), me chama que sigo com você!
