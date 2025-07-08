import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import MbtiResult from "@/models/MbtiResult";

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json();
    const { user_id, result } = body;

    if (!user_id || !result) {
      return NextResponse.json(
        { error: "Missing user_id or result" },
        { status: 400 }
      );
    }

    const existing = await MbtiResult.findOne({ user_id });

    if (existing) {
      existing.result = result;
      existing.updated_at = new Date();
      await existing.save();
      return NextResponse.json({ message: "Result updated." });
    } else {
      await MbtiResult.create({
        user_id,
        result,
        updated_at: new Date(),
      });
      return NextResponse.json({ message: "Result inserted." });
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectMongo();

    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const data = await MbtiResult.findOne({ user_id });

    return NextResponse.json({ result: data });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
