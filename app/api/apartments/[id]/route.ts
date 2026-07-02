import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminRequest } from "@/lib/adminAuth";
import type { ApartmentInput } from "@/lib/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = (await request.json()) as Partial<ApartmentInput>;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("apartments")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apartment: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("apartments").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
