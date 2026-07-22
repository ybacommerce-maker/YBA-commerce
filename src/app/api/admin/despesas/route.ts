import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/db";

// Criar despesa
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      demo: true,
      expense: { ...body, id: `demo-${Date.now()}` },
    });
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("expenses")
      .insert(body)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, expense: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Apagar despesa
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, demo: true });
  }
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
