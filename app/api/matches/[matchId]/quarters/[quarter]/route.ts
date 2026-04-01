import { NextResponse } from "next/server";
import { getMatch, getQuarter } from "@/lib/mock-store";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  {
    params,
  }: { params: Promise<{ matchId: string; quarter: string }> }
) {
  const { matchId, quarter } = await params;
  const match = getMatch(matchId);

  if (!match) {
    return NextResponse.json(
      { error: { code: "MATCH_NOT_FOUND", message: "경기를 찾을 수 없습니다." } },
      { status: 404 }
    );
  }

  const quarterNumber = Number(quarter);
  if (!Number.isFinite(quarterNumber) || quarterNumber < 1) {
    return NextResponse.json(
      { error: { code: "INVALID_QUARTER", message: "quarter 값이 올바르지 않습니다." } },
      { status: 400 }
    );
  }

  const snapshot = getQuarter(matchId, quarterNumber);
  if (!snapshot) {
    return NextResponse.json(
      { error: { code: "QUARTER_NOT_FOUND", message: "쿼터 정보를 찾을 수 없습니다." } },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: snapshot });
}

