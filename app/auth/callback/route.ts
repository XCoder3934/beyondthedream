import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/";
  const nextUrl = new URL(requestedNext, origin);
  const next = nextUrl.origin === origin ? nextUrl.href : `${origin}/`;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(next);
    }
  }

  return NextResponse.redirect(`${origin}/?auth=error`);
}
