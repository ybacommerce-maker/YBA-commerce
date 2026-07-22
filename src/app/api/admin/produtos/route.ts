import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/db";

// CRUD de produtos usado pelo painel admin.
// Se o Supabase estiver configurado, grava de verdade no banco.
// Se nao, devolve os dados para o painel atualizar a tela (modo demo).

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Criar produto
export async function POST(req: NextRequest) {
  const body = await req.json();
  const produto = { ...body, slug: body.slug || slugify(body.name) };

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      demo: true,
      product: { ...produto, id: `demo-${Date.now()}` },
    });
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .insert(produto)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, product: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Editar produto
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, ...rest } = body;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, demo: true, product: body });
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .update(rest)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, product: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Apagar produto
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, demo: true });
  }
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
