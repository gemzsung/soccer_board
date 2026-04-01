import type { Match, QuarterSnapshot } from "@/lib/domain";

const nowIso = () => new Date().toISOString();

const match1: Match = {
  id: "m_001",
  name: "대한민국 vs 레알 마드리드 (데모)",
  createdAt: nowIso(),
  teams: {
    home: {
      id: "t_home_001",
      name: "대한민국",
      side: "home",
      formation: "4-4-2",
      players: [
        { id: "p_h_01", name: "조현우", number: 1, defaultPosition: "GK" },
        { id: "p_h_02", name: "김민재", number: 4, defaultPosition: "CB" },
        { id: "p_h_03", name: "김영권", number: 19, defaultPosition: "CB" },
        { id: "p_h_04", name: "김진수", number: 3, defaultPosition: "LB" },
        { id: "p_h_05", name: "김태환", number: 23, defaultPosition: "RB" },
        { id: "p_h_06", name: "황인범", number: 6, defaultPosition: "CM" },
        { id: "p_h_07", name: "손흥민", number: 7, defaultPosition: "LW" },
        { id: "p_h_08", name: "이강인", number: 18, defaultPosition: "RW" },
        { id: "p_h_09", name: "조규성", number: 9, defaultPosition: "ST" },
        { id: "p_h_10", name: "황희찬", number: 11, defaultPosition: "ST" },
        { id: "p_h_11", name: "이재성", number: 10, defaultPosition: "AM" },
      ],
    },
    away: {
      id: "t_away_001",
      name: "레알 마드리드",
      side: "away",
      formation: "4-3-3",
      players: [
        { id: "p_a_01", name: "티보 쿠르투아", number: 1, defaultPosition: "GK" },
        { id: "p_a_02", name: "다니 카르바할", number: 2, defaultPosition: "RB" },
        { id: "p_a_03", name: "에데르 밀리탕", number: 3, defaultPosition: "CB" },
        { id: "p_a_04", name: "다비드 알라바", number: 4, defaultPosition: "CB" },
        { id: "p_a_05", name: "페를랑 멘디", number: 23, defaultPosition: "LB" },
        { id: "p_a_06", name: "오렐리앵 추아메니", number: 18, defaultPosition: "DM" },
        { id: "p_a_07", name: "페데리코 발베르데", number: 15, defaultPosition: "CM" },
        { id: "p_a_08", name: "주드 벨링엄", number: 5, defaultPosition: "AM" },
        { id: "p_a_09", name: "비니시우스 주니오르", number: 7, defaultPosition: "LW" },
        { id: "p_a_10", name: "킬리안 음바페", number: 9, defaultPosition: "ST" },
        { id: "p_a_11", name: "호드리구", number: 11, defaultPosition: "RW" },
      ],
    },
  },
  score: { home: 0, away: 0 },
};

const q1: QuarterSnapshot = {
  matchId: match1.id,
  quarter: 1,
  durationMinutes: 25,
  score: { home: 0, away: 0 },
  formations: { home: "4-4-2", away: "4-3-3" },
  positions: {
    home: [
      { playerId: "p_h_01", label: "GK", point: { x: 0.08, y: 0.5 } },
      { playerId: "p_h_02", label: "LCB", point: { x: 0.22, y: 0.42 } },
      { playerId: "p_h_03", label: "RCB", point: { x: 0.22, y: 0.58 } },
      { playerId: "p_h_04", label: "LB", point: { x: 0.22, y: 0.18 } },
      { playerId: "p_h_05", label: "RB", point: { x: 0.22, y: 0.82 } },
      { playerId: "p_h_06", label: "LCM", point: { x: 0.42, y: 0.44 } },
      { playerId: "p_h_11", label: "RCM", point: { x: 0.42, y: 0.56 } },
      { playerId: "p_h_07", label: "LM", point: { x: 0.42, y: 0.22 } },
      { playerId: "p_h_08", label: "RM", point: { x: 0.42, y: 0.78 } },
      { playerId: "p_h_09", label: "LST", point: { x: 0.62, y: 0.42 } },
      { playerId: "p_h_10", label: "RST", point: { x: 0.62, y: 0.58 } },
    ],
    away: [
      { playerId: "p_a_01", label: "GK", point: { x: 0.92, y: 0.5 } },
      { playerId: "p_a_02", label: "LCB", point: { x: 0.78, y: 0.42 } },
      { playerId: "p_a_03", label: "RCB", point: { x: 0.78, y: 0.58 } },
      { playerId: "p_a_04", label: "LB", point: { x: 0.78, y: 0.18 } },
      { playerId: "p_a_05", label: "RB", point: { x: 0.78, y: 0.82 } },
      { playerId: "p_a_06", label: "LCM", point: { x: 0.58, y: 0.42 } },
      { playerId: "p_a_07", label: "RCM", point: { x: 0.58, y: 0.58 } },
      { playerId: "p_a_08", label: "AM", point: { x: 0.52, y: 0.5 } },
      { playerId: "p_a_09", label: "LW", point: { x: 0.42, y: 0.22 } },
      { playerId: "p_a_10", label: "ST", point: { x: 0.38, y: 0.5 } },
      { playerId: "p_a_11", label: "RW", point: { x: 0.42, y: 0.78 } },
    ],
  },
  events: [
    { id: "e_001", type: "note", minute: 3, side: "home", note: "초반 전방 압박" },
    { id: "e_002", type: "card", minute: 11, side: "away", playerId: "p_a_06", card: "yellow", note: "늦은 태클" },
  ],
  updatedAt: nowIso(),
};

const q2: QuarterSnapshot = {
  ...q1,
  quarter: 2,
  score: { home: 1, away: 0 },
  events: [
    ...q1.events,
    { id: "e_003", type: "goal", minute: 33, side: "home", playerId: "p_h_09", assistPlayerId: "p_h_07" },
    { id: "e_004", type: "substitution", minute: 38, side: "away", outPlayerId: "p_a_08", inPlayerId: "p_a_07", note: "중원 강화" },
  ],
  updatedAt: nowIso(),
};

const matches = new Map<string, Match>([[match1.id, match1]]);
const quartersByMatchId = new Map<string, QuarterSnapshot[]>([
  [match1.id, [q1, q2]],
]);

export function listMatches(): Match[] {
  return Array.from(matches.values());
}

export function getMatch(matchId: string): Match | null {
  return matches.get(matchId) ?? null;
}

export function listQuarters(matchId: string): QuarterSnapshot[] {
  return quartersByMatchId.get(matchId) ?? [];
}

export function getQuarter(matchId: string, quarter: number): QuarterSnapshot | null {
  const list = quartersByMatchId.get(matchId) ?? [];
  return list.find((q) => q.quarter === quarter) ?? null;
}

