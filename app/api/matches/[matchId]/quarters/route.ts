import { NextResponse } from "next/server";
import { getMatch, listQuarters } from "@/lib/mock-store";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const { matchId } = await params;
  const match = getMatch(matchId);

  if (!match) {
    return NextResponse.json(
      { error: { code: "MATCH_NOT_FOUND", message: "경기를 찾을 수 없습니다." } },
      { status: 404 }
    );
  }

  const quarters = listQuarters(matchId);
  return NextResponse.json({
    data: quarters,
    meta: { count: quarters.length },
  });
}

