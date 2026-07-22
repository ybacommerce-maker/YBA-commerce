import { getUsers } from "@/lib/admin";
import UsuariosAdmin from "@/components/admin/UsuariosAdmin";

export default async function UsuariosPage() {
  const users = await getUsers();
  return <UsuariosAdmin initial={users} />;
}
