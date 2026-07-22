// ==========================================================
//  INTEGRACAO COM O ASAAS (pagamentos)
//  Documentacao: https://docs.asaas.com
//  Fluxo simples: 1) cria/acha o cliente  2) cria a cobranca.
//  Rode SEMPRE no servidor (a chave e secreta).
// ==========================================================

const API_URL = process.env.ASAAS_API_URL || "https://sandbox.asaas.com/api/v3";
const API_KEY = process.env.ASAAS_API_KEY || "";

export function isAsaasConfigured(): boolean {
  return !!API_KEY && !API_KEY.includes("sua-chave");
}

async function asaasFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      access_token: API_KEY,
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data?.errors?.[0]?.description || `Erro Asaas (${res.status})`
    );
  }
  return data;
}

interface CustomerInput {
  name: string;
  email: string;
  phone: string;
  cpfCnpj?: string;
}

export async function createCustomer(input: CustomerInput) {
  return asaasFetch("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      mobilePhone: input.phone,
      cpfCnpj: input.cpfCnpj || undefined,
    }),
  });
}

interface PaymentInput {
  customerId: string;
  value: number;
  billingType: "PIX" | "BOLETO" | "CREDIT_CARD" | "UNDEFINED";
  description: string;
  dueDate: string; // YYYY-MM-DD
}

export async function createPayment(input: PaymentInput) {
  return asaasFetch("/payments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// Gera o QR Code do PIX de uma cobranca ja criada.
export async function getPixQrCode(paymentId: string) {
  return asaasFetch(`/payments/${paymentId}/pixQrCode`, { method: "GET" });
}
