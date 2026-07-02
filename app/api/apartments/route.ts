import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminRequest } from "@/lib/adminAuth";
import type { ApartmentInput } from "@/lib/types";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apartments: data });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json()) as ApartmentInput;
  if (!body.name || !body.price_per_night) {
    return NextResponse.json(
      { error: "Le nom et le prix sont obligatoires." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const slug = slugify(body.name) + "-" + Math.random().toString(36).slice(2, 6);

  const { data, error } = await supabase
    .from("apartments")
    .insert([{ ...body, slug }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apartment: data }, { status: 201 });
}
