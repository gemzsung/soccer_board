import { NextResponse } from "next/server";
import { listMatches } from "@/lib/mock-store";

export const runtime = "nodejs";

export async function GET() {
  const matches = listMatches();

  return NextResponse.json({
    data: matches,
    meta: {
      count: matches.length,
    },
  });
}

