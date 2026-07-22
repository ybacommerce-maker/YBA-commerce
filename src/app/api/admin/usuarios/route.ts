import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/db";

// CRUD de usuarios (clientes + equipe) usado pelo painel do superadmin.
// Se o Supabase estiver configurado, grava de verdade no banco.
// Se nao, devolve os dados para o painel atualizar a tela (modo demo).

// Criar usuario
export async function POST(req: NextRequest) {
  const body = await req.json();
  const usuario = {
    name: body.name,
    email: body.email,
    phone: body.phone || "",
    city: body.city || "",
    role: body.role || "cliente",
    active: body.active ?? true,
    orders: body.orders || 0,
    spent: body.spent || 0,
  };

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      demo: true,
      user: {
        ...usuario,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString().slice(0, 10),
      },
    });
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("users")
      .insert(usuario)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, user: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Editar usuario
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, created_at, ...rest } = body;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, demo: true, user: body });
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("users")
      .update(rest)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, user: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Apagar usuario
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, demo: true });
  }
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
