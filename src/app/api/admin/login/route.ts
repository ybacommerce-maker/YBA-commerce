import { NextRequest, NextResponse } from "next/server";

// POST: recebe a senha e, se bater, cria o cookie de login.
export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const senhaCorreta = process.env.ADMIN_PASSWORD || "yba-admin-2026";

  if (password !== senhaCorreta) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("yba_admin", "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });
  return res;
}

// DELETE: logout (apaga o cookie)
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("yba_admin", "", { path: "/", maxAge: 0 });
  return res;
}
