import { getOrders, getOrderItems } from "@/lib/admin";
import VendasAdmin from "@/components/admin/VendasAdmin";

export default async function VendasPage() {
  const [orders, items] = await Promise.all([getOrders(), getOrderItems()]);
  return <VendasAdmin initial={orders} items={items} />;
}
