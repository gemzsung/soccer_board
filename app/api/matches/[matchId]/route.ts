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
  const lastQuarterScore =
    quarters.length > 0 ? quarters[quarters.length - 1]?.score : null;

  return NextResponse.json({
    data: {
      ...match,
      score: lastQuarterScore ?? match.score,
      quarters: quarters.map((q) => ({
        quarter: q.quarter,
        durationMinutes: q.durationMinutes,
        updatedAt: q.updatedAt,
        score: q.score,
      })),
    },
  });
}

