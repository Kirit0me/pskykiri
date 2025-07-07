import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const body = await req.json();
  const { user_id, result } = body;

  if (!user_id || !result) {
    return NextResponse.json({ error: "Missing user_id or result" }, { status: 400 });
  }

  const { data: existing, error: checkError } = await supabase
    .from("mbti_results")
    .select("*")
    .eq("user_id", user_id)
    .maybeSingle();

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("mbti_results")
      .update({
        ...result,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Result updated." });
  } else {
    const { error: insertError } = await supabase
      .from("mbti_results")
      .insert({
        user_id,
        ...result,
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Result inserted." });
  }
}

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("mbti_results")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ result: data });
}
