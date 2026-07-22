import { getExpenses } from "@/lib/admin";
import DespesasAdmin from "@/components/admin/DespesasAdmin";

export default async function DespesasPage() {
  const expenses = await getExpenses();
  return <DespesasAdmin initial={expenses} />;
}
