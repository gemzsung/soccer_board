"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TeamKey = "home" | "away";
type Mode = "auto" | "manual";
type Formation = "3-2-4-1" | "4-2-4" | "4-4-2" | "4-3-3";
type PositionId = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "REF";
type PlayerRow = {
  id: string;
  order: number;
  name: string;
  preferred: string;
  assigned: PositionId | "";
};
type PositionSlot = {
  id: PositionId;
  role: string;
  numberLabel: string;
  x: number;
  y: number;
  inFormation: boolean;
};

const allPositionOptions: { value: PositionId; label: string }[] = [
  { value: "0", label: "0 (GK)" },
  { value: "1", label: "1 (WB)" },
  { value: "2", label: "2 (CB)" },
  { value: "3", label: "3 (CB)" },
  { value: "4", label: "4 (WB)" },
  { value: "5", label: "5 (DM)" },
  { value: "6", label: "6 (DM)" },
  { value: "7", label: "7 (LW)" },
  { value: "8", label: "8 (AM)" },
  { value: "9", label: "9 (ST)" },
  { value: "10", label: "10 (AM)" },
  { value: "11", label: "11 (RW)" },
  { value: "REF", label: "REF" },
];

const slotMeta: Record<PositionId, Omit<PositionSlot, "x" | "y" | "inFormation">> = {
  "0": { id: "0", role: "GK", numberLabel: "0" },
  "1": { id: "1", role: "WB", numberLabel: "1" },
  "2": { id: "2", role: "CB", numberLabel: "2" },
  "3": { id: "3", role: "CB", numberLabel: "3" },
  "4": { id: "4", role: "WB", numberLabel: "4" },
  "5": { id: "5", role: "DM", numberLabel: "5" },
  "6": { id: "6", role: "DM", numberLabel: "6" },
  "7": { id: "7", role: "LW", numberLabel: "7" },
  "8": { id: "8", role: "AM", numberLabel: "8" },
  "9": { id: "9", role: "ST", numberLabel: "9" },
  "10": { id: "10", role: "AM", numberLabel: "10" },
  "11": { id: "11", role: "RW", numberLabel: "11" },
  REF: { id: "REF", role: "REF", numberLabel: "R" },
};

const initialHomePlayers: PlayerRow[] = [
  { id: "h1", order: 1, name: "조현우", preferred: "GK", assigned: "0" },
  { id: "h2", order: 2, name: "김진수", preferred: "WB", assigned: "1" },
  { id: "h3", order: 3, name: "김민재", preferred: "CB", assigned: "2" },
  { id: "h4", order: 4, name: "김영권", preferred: "CB", assigned: "3" },
  { id: "h5", order: 5, name: "김태환", preferred: "WB", assigned: "4" },
  { id: "h6", order: 6, name: "황인범", preferred: "DM", assigned: "5" },
  { id: "h7", order: 7, name: "정우영", preferred: "DM", assigned: "6" },
  { id: "h8", order: 8, name: "손흥민", preferred: "LW", assigned: "7" },
  { id: "h9", order: 9, name: "이재성", preferred: "AM", assigned: "8" },
  { id: "h10", order: 10, name: "이강인", preferred: "AM", assigned: "10" },
  { id: "h11", order: 11, name: "조규성", preferred: "ST", assigned: "9" },
  { id: "h12", order: 12, name: "황희찬", preferred: "RW", assigned: "11" },
];

const initialAwayPlayers: PlayerRow[] = [
  { id: "a1", order: 1, name: "티보 쿠르투아", preferred: "GK", assigned: "0" },
  { id: "a2", order: 2, name: "멘디", preferred: "WB", assigned: "1" },
  { id: "a3", order: 3, name: "밀리탕", preferred: "CB", assigned: "2" },
  { id: "a4", order: 4, name: "알라바", preferred: "CB", assigned: "3" },
  { id: "a5", order: 5, name: "카르바할", preferred: "WB", assigned: "4" },
  { id: "a6", order: 6, name: "추아메니", preferred: "DM", assigned: "5" },
  { id: "a7", order: 7, name: "카마빙가", preferred: "DM", assigned: "6" },
  { id: "a8", order: 8, name: "비니시우스", preferred: "LW", assigned: "7" },
  { id: "a9", order: 9, name: "벨링엄", preferred: "AM", assigned: "8" },
  { id: "a10", order: 10, name: "발베르데", preferred: "AM", assigned: "10" },
  { id: "a11", order: 11, name: "음바페", preferred: "ST", assigned: "9" },
  { id: "a12", order: 12, name: "호드리구", preferred: "RW", assigned: "11" },
];

function formationLabelRows(value: Formation) {
  const parts = value.split("-").map(Number);
  const defense = parts[0] ?? 0;
  const attack = parts[parts.length - 1] ?? 0;
  const middle = Math.max(0, parts.slice(1, -1).reduce((sum, n) => sum + n, 0));
  return { attack, middle, defense };
}

function buildSlots(team: TeamKey, formation: Formation): PositionSlot[] {
  const formationRows: Record<Formation, PositionId[][]> = {
    "3-2-4-1": [
      ["2", "3", "4"],
      ["5", "6"],
      ["7", "8", "10", "11"],
      ["9"],
    ],
    "4-2-4": [
      ["1", "2", "3", "4"],
      ["5", "6"],
      ["7", "8", "10", "11"],
    ],
    "4-4-2": [
      ["1", "2", "3", "4"],
      ["5", "6", "8", "10"],
      ["9", "11"],
    ],
    "4-3-3": [
      ["1", "2", "3", "4"],
      ["5", "8", "10"],
      ["7", "9", "11"],
    ],
  };
  const rows = formationRows[formation];
  const lineCount = rows.length;
  const yTop = 20; // 더 압축된 높이: 상단 여백 증가
  const yBottom = 80; // 하단 여백 증가 (총 60% 높이로 압축)
  const yStep = lineCount > 1 ? (yBottom - yTop) / (lineCount - 1) : 0;
  const sideCenter = 50;

  const positionMap = new Map<PositionId, { x: number; y: number; inFormation: boolean }>();
  rows.forEach((row, rowIndex) => {
    const y = yBottom - yStep * rowIndex;
    row.forEach((id, idx) => {
      const laneWidth = row.length >= 4 ? 48 : row.length === 3 ? 40 : 30; // 간격 15-20% 축소
      const x = row.length === 1 ? sideCenter : sideCenter - laneWidth / 2 + (idx * laneWidth) / (row.length - 1);
      positionMap.set(id, { x, y, inFormation: true });
    });
  });

  const allIds: PositionId[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "REF"];
  const inactiveIds = allIds.filter((id) => id !== "0" && id !== "REF" && !positionMap.has(id));
  return allIds.map((id) => {
    if (id === "0") {
      return { ...slotMeta[id], x: sideCenter, y: 91, inFormation: true };
    }
    if (id === "REF") {
      return { ...slotMeta[id], x: 88, y: 7, inFormation: true };
    }
    const positioned = positionMap.get(id);
    if (positioned) {
      return { ...slotMeta[id], ...positioned };
    }
    const idx = inactiveIds.indexOf(id);
    return { ...slotMeta[id], x: 5 + idx * 8, y: 5, inFormation: false };
  });
}

function getIconClass(team: TeamKey, slot: PositionSlot, active: boolean) {
  if (slot.id === "0") {
    return active
      ? "border-amber-100/90 bg-[radial-gradient(circle_at_30%_30%,#fef9c3_0%,#f59e0b_45%,#b45309_100%)] text-amber-950"
      : "border-amber-200/30 bg-[radial-gradient(circle_at_30%_30%,rgba(254,249,195,0.3)_0%,rgba(180,83,9,0.55)_70%,rgba(120,53,15,0.8)_100%)] text-amber-100/70";
  }
  if (team === "home") {
    return active
      ? "border-emerald-100/80 bg-[radial-gradient(circle_at_30%_30%,#bbf7d0_0%,#34d399_38%,#059669_100%)] text-emerald-950"
      : slot.inFormation
        ? "border-emerald-300 border-dashed bg-[radial-gradient(circle_at_30%_30%,rgba(236,253,245,0.2)_0%,rgba(6,78,59,0.4)_65%,rgba(2,44,34,0.65)_100%)] text-emerald-200"
        : "border-emerald-50/15 bg-[radial-gradient(circle_at_30%_30%,rgba(236,253,245,0.2)_0%,rgba(6,78,59,0.45)_65%,rgba(2,44,34,0.7)_100%)] text-emerald-50/30";
  }
  return active
    ? "border-sky-100/80 bg-[radial-gradient(circle_at_30%_30%,#e0f2fe_0%,#38bdf8_40%,#0284c7_100%)] text-sky-950"
    : slot.inFormation
      ? "border-sky-300 border-dashed bg-[radial-gradient(circle_at_30%_30%,rgba(240,249,255,0.2)_0%,rgba(12,74,110,0.4)_65%,rgba(8,47,73,0.65)_100%)] text-sky-200"
      : "border-sky-50/15 bg-[radial-gradient(circle_at_30%_30%,rgba(240,249,255,0.2)_0%,rgba(12,74,110,0.45)_65%,rgba(8,47,73,0.7)_100%)] text-sky-50/30";
}

export default function Home() {
  const [homeFormation, setHomeFormation] = useState<Formation>("3-2-4-1");
  const [awayFormation, setAwayFormation] = useState<Formation>("4-2-4");
  const [mode, setMode] = useState<Mode>("auto");
  const [activeTab, setActiveTab] = useState<TeamKey>("home");
  const [homePlayers, setHomePlayers] = useState<PlayerRow[]>(initialHomePlayers);
  const [awayPlayers, setAwayPlayers] = useState<PlayerRow[]>(initialAwayPlayers);
  const [customPositions, setCustomPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [draggedSlot, setDraggedSlot] = useState<{ team: TeamKey; slotId: PositionId } | null>(null);
  const [homePitchRef, setHomePitchRef] = useState<HTMLDivElement | null>(null);
  const [awayPitchRef, setAwayPitchRef] = useState<HTMLDivElement | null>(null);

  const homeRows = formationLabelRows(homeFormation);
  const awayRows = formationLabelRows(awayFormation);
  const homeSlots = buildSlots("home", homeFormation);
  const awaySlots = buildSlots("away", awayFormation);

  const roleByPosition = (position: PositionId | "") => {
    if (!position) return "미배치";
    return slotMeta[position]?.role ?? position;
  };

  const handleDragStart = (team: TeamKey, slotId: PositionId, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedSlot({ team, slotId });
  };

  const updateDraggedSlot = (e: React.MouseEvent<HTMLDivElement>, team: TeamKey) => {
    if (!draggedSlot || draggedSlot.team !== team) return;
    const pitch = team === "home" ? homePitchRef : awayPitchRef;
    if (!pitch) return;

    const rect = pitch.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const key = `${draggedSlot.team}-${draggedSlot.slotId}`;
    const newPos = Math.max(0, Math.min(100, x));
    const newY = Math.max(0, Math.min(100, y));

    setCustomPositions((prev) => {
      const updated = new Map(prev);
      updated.set(key, { x: newPos, y: newY });
      return updated;
    });
  };

  useEffect(() => {
    const onMouseUp = () => setDraggedSlot(null);
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  const getSlotPosition = (team: TeamKey, slot: PositionSlot) => {
    const key = `${team}-${slot.id}`;
    const custom = customPositions.get(key);
    return custom ? { x: custom.x, y: custom.y } : { x: slot.x, y: slot.y };
  };

  const assignPosition = (team: TeamKey, playerId: string, nextPosition: string | null) => {
    const updater = (prev: PlayerRow[]): PlayerRow[] => {
      const validPosition: PlayerRow["assigned"] = !nextPosition ? "" : (nextPosition as PositionId);
      return prev.map((row) => {
        if (row.id === playerId) {
          return { ...row, assigned: validPosition };
        }
        if (validPosition !== "" && row.assigned === validPosition) {
          return { ...row, assigned: "" };
        }
        return row;
      });
    };
    if (team === "home") {
      setHomePlayers(updater);
      return;
    }
    setAwayPlayers(updater);
  };

  const roster = activeTab === "home" ? homePlayers : awayPlayers;
  const activeFormation = activeTab === "home" ? homeFormation : awayFormation;

  const playerByAssigned = (team: TeamKey, position: PositionId) => {
    const source = team === "home" ? homePlayers : awayPlayers;
    return source.find((p) => p.assigned === position) ?? null;
  };

  const handleFormationChange = (newFormation: Formation) => {
    if (activeTab === "home") {
      setHomeFormation(newFormation);
    } else {
      setAwayFormation(newFormation);
    }

    // 포메이션에 포함된 포지션들 추출
    const formationRows: Record<Formation, PositionId[][]> = {
      "3-2-4-1": [["2", "3", "4"], ["5", "6"], ["7", "8", "10", "11"], ["9"]],
      "4-2-4": [["1", "2", "3", "4"], ["5", "6"], ["7", "8", "10", "11"]],
      "4-4-2": [["1", "2", "3", "4"], ["5", "6", "8", "10"], ["9", "11"]],
      "4-3-3": [["1", "2", "3", "4"], ["5", "8", "10"], ["7", "9", "11"]],
    };
    const includedPositions = new Set<PositionId>(
      formationRows[newFormation].flat()
    );

    // 포메이션에 포함되지 않는 포지션의 선수는 미배치 상태로 변경
    const resetPlayers = (prev: PlayerRow[]): PlayerRow[] =>
      prev.map((p) => {
        if (p.assigned && !includedPositions.has(p.assigned as PositionId)) {
          return { ...p, assigned: "" as const };
        }
        return p;
      });

    setHomePlayers(resetPlayers);
    setAwayPlayers(resetPlayers);
    setCustomPositions(new Map()); // 드래그 위치도 초기화
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><span className="text-sm font-semibold">SB</span></div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">조기 축구 작전판 스코어보드</h1>
              <p className="text-xs text-muted-foreground">데모: 대한민국 vs 레알 마드리드</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">인터랙션 데모</Badge>
            <Badge className="bg-amber-500 text-amber-950">v2-coach-ui</Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-3 py-4 sm:px-6 lg:flex-row lg:gap-5 lg:py-7">
        <section className="order-2 flex w-full flex-col gap-4 lg:order-1 lg:w-[420px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">팀/포메이션 + 선수명단</CardTitle>
              <CardDescription>팀 탭에서 포메이션과 선수별 포지션 번호를 순차 운영합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TeamKey)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="home">홈팀 (대한민국)</TabsTrigger>
                  <TabsTrigger value="away">원정팀 (레알 마드리드)</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-3 space-y-3">
                  <div className="grid gap-2">
                    <Label>{activeTab === "home" ? "홈팀" : "원정팀"} 포메이션</Label>
                    <Select
                      value={activeFormation}
                      onValueChange={(v) => handleFormationChange(v as Formation)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(["3-2-4-1", "4-4-2", "4-3-3", "4-2-4"] as Formation[]).map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="max-h-[430px] overflow-auto rounded-md border">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/60 text-muted-foreground">
                        <tr>
                          <th className="px-2 py-2 text-left">순번</th>
                          <th className="px-2 py-2 text-left">이름</th>
                          <th className="px-2 py-2 text-left">선호</th>
                          <th className="px-2 py-2 text-left">포지션</th>
                          <th className="px-2 py-2 text-left">배치상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roster.map((player) => (
                          <tr key={player.id} className="border-t">
                            <td className="px-2 py-2">{player.order}</td>
                            <td className="px-2 py-2 font-medium">{player.name}</td>
                            <td className="px-2 py-2">{player.preferred}</td>
                            <td className="px-2 py-2">
                              <Select
                                value={player.assigned}
                                onValueChange={(value) => assignPosition(activeTab, player.id, value)}
                              >
                                <SelectTrigger className="h-8 w-[120px]">
                                  <SelectValue placeholder="미배치" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="">미배치</SelectItem>
                                  {allPositionOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-2 py-2">
                              <Badge variant={player.assigned ? "default" : "secondary"}>
                                {player.assigned ? `배치 (${roleByPosition(player.assigned)})` : "대기"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section className="order-1 flex flex-1 flex-col gap-4 lg:order-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">작전판</CardTitle>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground">포지션 배치 모드</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
                    <SelectTrigger className="h-8 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">자동 (기본)</SelectItem>
                      <SelectItem value="manual">수동</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>
                왼쪽 홈팀, 오른쪽 원정팀 기준으로 원형 포지션 아이콘과 번호를 표시합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-500/85 text-xs font-bold text-emerald-950">
                        {homeFormation}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">홈팀 포메이션</p>
                        <p className="text-xs text-muted-foreground">공격 {homeRows.attack} · 미들 {homeRows.middle} · 수비 {homeRows.defense}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pitch-vertical-home-bg relative mx-auto aspect-[9/14] w-full max-w-[440px] rounded-[24px] border border-emerald-200/35 p-2 sm:p-3 shadow-[0_0_90px_rgba(16,185,129,0.14)] select-none" ref={setHomePitchRef} onMouseMove={(e) => updateDraggedSlot(e, "home")}>
                    {homeSlots.map((slot) => {
                      const player = playerByAssigned("home", slot.id);
                      const active = Boolean(player) && slot.inFormation;
                      const pos = getSlotPosition("home", slot);
                      return (
                        <div key={`home-${slot.id}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 text-center cursor-move select-none" title={player?.name ?? "미배치"} onMouseDown={(e) => handleDragStart("home", slot.id, e)} onDragStart={(e) => e.preventDefault()}>
                          <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold shadow-[0_7px_14px_rgba(0,0,0,0.35)] ${
                            getIconClass("home", slot, active)
                          }`}>
                            {slot.numberLabel}
                          </div>
                          <p className={`mt-0.5 text-[9px] ${active ? "text-emerald-50" : "text-emerald-100/45"}`}>
                            {player ? `${player.name} (${slot.role})` : "none"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-sky-200 bg-sky-400/85 text-xs font-bold text-sky-950">
                        {awayFormation}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">원정팀 포메이션</p>
                        <p className="text-xs text-muted-foreground">공격 {awayRows.attack} · 미들 {awayRows.middle} · 수비 {awayRows.defense}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pitch-vertical-away-bg relative mx-auto aspect-[9/14] w-full max-w-[440px] rounded-[24px] border border-sky-200/35 p-2 sm:p-3 shadow-[0_0_90px_rgba(56,189,248,0.14)] select-none" ref={setAwayPitchRef} onMouseMove={(e) => updateDraggedSlot(e, "away")}>
                    <div className="absolute right-3 top-3 z-10">
                      <Badge variant="secondary">{mode === "auto" ? "자동 배치 기준" : "수동 배치 기준"}</Badge>
                    </div>
                    {awaySlots.map((slot) => {
                      const player = playerByAssigned("away", slot.id);
                      const active = Boolean(player) && slot.inFormation;
                      const pos = getSlotPosition("away", slot);
                      return (
                        <div key={`away-${slot.id}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 text-center cursor-move select-none" title={player?.name ?? "미배치"} onMouseDown={(e) => handleDragStart("away", slot.id, e)} onDragStart={(e) => e.preventDefault()}>
                          <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold shadow-[0_7px_14px_rgba(0,0,0,0.35)] ${
                            getIconClass("away", slot, active)
                          }`}>
                            {slot.numberLabel}
                          </div>
                          <p className={`mt-0.5 text-[9px] ${active ? "text-sky-50" : "text-sky-100/45"}`}>
                            {player ? `${player.name} (${slot.role})` : "none"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
