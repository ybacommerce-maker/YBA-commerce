import { getAllProducts } from "@/lib/admin";
import ProdutosAdmin from "@/components/admin/ProdutosAdmin";

export default async function ProdutosAdminPage() {
  const products = await getAllProducts();
  return <ProdutosAdmin initialProducts={products} />;
}
