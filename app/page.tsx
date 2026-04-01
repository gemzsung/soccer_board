"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TeamKey = "home" | "away";
type Mode = "auto" | "manual";
type Formation = "3-2-4-1" | "4-2-4" | "4-4-2" | "4-3-3";
type Player = { id: string; name: string; number: number };
type Slot = { id: string; x: number; y: number };
type DragState = { playerId: string; fromSlotId?: string } | null;
type SelectedSlot = { team: TeamKey; slotId: string } | null;

const homePlayers: Player[] = [
  { id: "h1", name: "조현우", number: 1 }, { id: "h4", name: "김민재", number: 4 },
  { id: "h19", name: "김영권", number: 19 }, { id: "h3", name: "김진수", number: 3 },
  { id: "h23", name: "김태환", number: 23 }, { id: "h6", name: "황인범", number: 6 },
  { id: "h10", name: "이재성", number: 10 }, { id: "h7", name: "손흥민", number: 7 },
  { id: "h18", name: "이강인", number: 18 }, { id: "h11", name: "황희찬", number: 11 },
  { id: "h9", name: "조규성", number: 9 },
];

const awayPlayers: Player[] = [
  { id: "a1", name: "티보 쿠르투아", number: 1 }, { id: "a2", name: "다니 카르바할", number: 2 },
  { id: "a3", name: "에데르 밀리탕", number: 3 }, { id: "a4", name: "다비드 알라바", number: 4 },
  { id: "a23", name: "페를랑 멘디", number: 23 }, { id: "a18", name: "오렐리앵 추아메니", number: 18 },
  { id: "a15", name: "페데리코 발베르데", number: 15 }, { id: "a5", name: "주드 벨링엄", number: 5 },
  { id: "a7", name: "비니시우스 주니오르", number: 7 }, { id: "a9", name: "킬리안 음바페", number: 9 },
  { id: "a11", name: "호드리구", number: 11 },
];

const formationRows: Record<Formation, number[]> = {
  "3-2-4-1": [1, 3, 2, 4, 1],
  "4-2-4": [1, 4, 2, 4],
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
};

function makeSlots(side: TeamKey, formation: Formation): Slot[] {
  const rows = formationRows[formation];
  const xBase = side === "home" ? [16, 26, 36, 46, 56, 66] : [84, 74, 64, 54, 44, 34];
  const pitchRows = rows.map((count, idx) => ({ count, x: xBase[idx] ?? (side === "home" ? 66 : 34) }));
  return pitchRows.flatMap((row, rowIndex) => {
    const gap = 72 / (row.count + 1);
    return Array.from({ length: row.count }, (_, i) => ({
      id: `${side}-${rowIndex}-${i}`,
      x: row.x,
      y: 14 + gap * (i + 1),
    }));
  });
}

function seedLineup(slots: Slot[], players: Player[]) {
  return Object.fromEntries(slots.map((slot, idx) => [slot.id, players[idx]?.id ?? null])) as Record<string, string | null>;
}

export default function Home() {
  const [quarter, setQuarter] = useState("2");
  const [homeFormation, setHomeFormation] = useState<Formation>("3-2-4-1");
  const [awayFormation, setAwayFormation] = useState<Formation>("4-2-4");
  const [mode, setMode] = useState<Mode>("auto");
  const [homeScore, setHomeScore] = useState(1);
  const [awayScore, setAwayScore] = useState(0);
  const [activeTab, setActiveTab] = useState<TeamKey>("home");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState>(null);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(null);

  const homeSlots = useMemo(() => makeSlots("home", homeFormation), [homeFormation]);
  const awaySlots = useMemo(() => makeSlots("away", awayFormation), [awayFormation]);
  const [homeLineup, setHomeLineup] = useState<Record<string, string | null>>(() => seedLineup(makeSlots("home", "3-2-4-1"), homePlayers));
  const [awayLineup, setAwayLineup] = useState<Record<string, string | null>>(() => seedLineup(makeSlots("away", "4-2-4"), awayPlayers));

  const playerMap = useMemo(() => new Map([...homePlayers, ...awayPlayers].map((p) => [p.id, p])), []);
  const homeUsed = useMemo(() => new Set(Object.values(homeLineup).filter(Boolean) as string[]), [homeLineup]);
  const awayUsed = useMemo(() => new Set(Object.values(awayLineup).filter(Boolean) as string[]), [awayLineup]);

  const changeFormation = (team: TeamKey, value: Formation) => {
    if (team === "home") {
      const slots = makeSlots("home", value);
      setHomeFormation(value);
      setHomeLineup(seedLineup(slots, homePlayers));
    } else {
      const slots = makeSlots("away", value);
      setAwayFormation(value);
      setAwayLineup(seedLineup(slots, awayPlayers));
    }
  };

  const assignToSlot = (team: TeamKey, slotId: string, playerId: string, fromSlotId?: string) => {
    const setLineup = team === "home" ? setHomeLineup : setAwayLineup;
    setLineup((prev) => {
      const next = { ...prev };
      const targetCurrent = next[slotId];
      if (fromSlotId && fromSlotId in next) {
        next[fromSlotId] = targetCurrent ?? null;
      }
      next[slotId] = playerId;
      return next;
    });
  };

  const swapOrMoveWithinTeam = (team: TeamKey, fromSlotId: string, toSlotId: string) => {
    const lineup = team === "home" ? homeLineup : awayLineup;
    const fromPlayerId = lineup[fromSlotId];
    if (!fromPlayerId) return;
    assignToSlot(team, toSlotId, fromPlayerId, fromSlotId);
  };

  const rosterFor = activeTab === "home" ? homePlayers : awayPlayers;
  const usedFor = activeTab === "home" ? homeUsed : awayUsed;

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
          <Badge variant="secondary" className="hidden sm:inline-flex">인터랙션 데모</Badge>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-3 py-4 sm:px-6 lg:flex-row lg:gap-5 lg:py-7">
        <section className="order-2 flex w-full flex-col gap-4 lg:order-1 lg:w-[340px] xl:w-[360px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">팀 / 포메이션</CardTitle>
              <CardDescription>포메이션 풀다운 변경 시 작전판이 바로 반영됩니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label>홈팀 (대한민국) 포메이션</Label>
                  <Select value={homeFormation} onValueChange={(v) => changeFormation("home", v as Formation)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{(["3-2-4-1","4-4-2","4-3-3","4-2-4"] as Formation[]).map((f)=><SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>원정팀 (레알 마드리드) 포메이션</Label>
                  <Select value={awayFormation} onValueChange={(v) => changeFormation("away", v as Formation)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{(["4-2-4","4-3-3","4-4-2","3-2-4-1"] as Formation[]).map((f)=><SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>포지션 배치 모드</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">자동 (기본)</SelectItem>
                      <SelectItem value="manual">수동</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">선수 명단 (드래그/선택)</CardTitle>
              <CardDescription>선수를 클릭 후 작전판 슬롯 클릭 또는 드래그앤드랍으로 배치/교체</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TeamKey)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="home">홈팀</TabsTrigger>
                  <TabsTrigger value="away">원정팀</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
                  {rosterFor.map((p) => (
                    <button
                      key={p.id}
                      draggable
                      onDragStart={() => setDragState({ playerId: p.id })}
                      onClick={() => setSelectedPlayerId(p.id)}
                      className={`flex w-full items-center justify-between rounded-md border px-2 py-1.5 text-left text-sm ${selectedPlayerId === p.id ? "border-primary bg-primary/10" : "border-border"} ${usedFor.has(p.id) ? "opacity-70" : ""}`}
                    >
                      <span>{p.number}번 {p.name}</span>
                      <Badge variant="outline" className="text-[10px]">{usedFor.has(p.id) ? "배치됨" : "대기"}</Badge>
                    </button>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">현재쿼터 / 스코어</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <Label>현재쿼터</Label>
                <Select value={quarter} onValueChange={(v) => setQuarter(v ?? "2")}>
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem><SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-xl border bg-card/70 p-3">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold leading-none tracking-tight text-emerald-500 sm:text-4xl">
                      {homeScore}
                    </span>
                    <div className="flex flex-col gap-1">
                      <button
                        className="h-7 w-7 rounded border text-sm font-bold sm:h-6 sm:w-6 sm:text-xs"
                        onClick={() => setHomeScore((v) => v + 1)}
                      >
                        +
                      </button>
                      <button
                        className="h-7 w-7 rounded border text-sm font-bold sm:h-6 sm:w-6 sm:text-xs"
                        onClick={() => setHomeScore((v) => Math.max(0, v - 1))}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <span className="text-base font-semibold text-muted-foreground sm:text-lg">
                    vs
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold leading-none tracking-tight text-sky-500 sm:text-4xl">
                      {awayScore}
                    </span>
                    <div className="flex flex-col gap-1">
                      <button
                        className="h-7 w-7 rounded border text-sm font-bold sm:h-6 sm:w-6 sm:text-xs"
                        onClick={() => setAwayScore((v) => v + 1)}
                      >
                        +
                      </button>
                      <button
                        className="h-7 w-7 rounded border text-sm font-bold sm:h-6 sm:w-6 sm:text-xs"
                        onClick={() => setAwayScore((v) => Math.max(0, v - 1))}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <p className="text-sm font-medium">전체 결과: 홈 0승 2패 | 원정 2승</p>
            </CardContent>
          </Card>
        </section>

        <section className="order-1 flex flex-1 flex-col gap-4 lg:order-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">작전판</CardTitle>
                <Badge variant="outline">포지션: {mode === "auto" ? "자동" : "수동"}</Badge>
              </div>
              <CardDescription>
                데스크톱: 드래그해서 슬롯 위에 놓으면 배치/교체됩니다. 모바일: 슬롯을 한 번 탭해 선택 후 다른 슬롯을 탭하면 교차됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pitch-stadium-bg relative mx-auto h-[62vh] min-h-[360px] w-full rounded-[22px] border border-emerald-200/35 p-2 sm:h-[560px] sm:rounded-[28px] sm:p-3 pitch-grid-bg shadow-[0_0_90px_rgba(16,185,129,0.14)]">
                <div className="absolute left-2 top-2 z-10 flex items-center gap-1 sm:left-4 sm:top-4 sm:gap-2">
                  <Badge className="bg-emerald-500/80 text-emerald-950">홈 {homeFormation}</Badge>
                  <Badge className="bg-sky-400/80 text-sky-950">원정 {awayFormation}</Badge>
                </div>
                <div className="absolute right-2 top-2 z-10 sm:right-4 sm:top-4">
                  <Badge variant="secondary">Q{quarter} | 홈 {homeScore} : {awayScore} 원정</Badge>
                </div>
                <div className="pointer-events-none absolute inset-3">
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-emerald-200/70" />
                  <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/60" />
                  <div className="absolute left-3 top-1/2 h-48 w-20 -translate-y-1/2 rounded-l-2xl border border-r-0 border-emerald-200/55" />
                  <div className="absolute right-3 top-1/2 h-48 w-20 -translate-y-1/2 rounded-r-2xl border border-l-0 border-emerald-200/55" />
                  <div className="absolute left-3 top-1/2 h-28 w-11 -translate-y-1/2 rounded-l-xl border border-r-0 border-emerald-200/55" />
                  <div className="absolute right-3 top-1/2 h-28 w-11 -translate-y-1/2 rounded-r-xl border border-l-0 border-emerald-200/55" />
                </div>

                {[...homeSlots, ...awaySlots].map((slot) => {
                  const team = slot.id.startsWith("home") ? "home" : "away";
                  const lineup = team === "home" ? homeLineup : awayLineup;
                  const playerId = lineup[slot.id];
                  const player = playerId ? playerMap.get(playerId) : null;
                  const isSelected = selectedSlot?.team === team && selectedSlot?.slotId === slot.id;
                  return (
                    <button
                      key={slot.id}
                      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-1.5 py-1 text-[10px] sm:px-2 ${team === "home" ? "border-emerald-100 bg-emerald-400/80 text-emerald-950" : "border-sky-100 bg-sky-400/80 text-sky-950"} ${isSelected ? "ring-2 ring-white/90 ring-offset-2 ring-offset-emerald-950" : ""}`}
                      draggable={Boolean(player)}
                      onDragStart={() => player && setDragState({ playerId: player.id, fromSlotId: slot.id })}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (!dragState) return;
                        assignToSlot(team, slot.id, dragState.playerId, dragState.fromSlotId);
                        setDragState(null);
                        setSelectedPlayerId(null);
                        setSelectedSlot(null);
                      }}
                      onClick={() => {
                        // 1) "선수 선택 → 슬롯 클릭" 배치
                        if (selectedPlayerId) {
                          assignToSlot(team, slot.id, selectedPlayerId);
                          setSelectedPlayerId(null);
                          setSelectedSlot(null);
                          return;
                        }

                        // 2) 모바일 친화: "슬롯 선택 → 슬롯 선택" 교차/이동
                        if (!selectedSlot) {
                          if (!playerId) return;
                          setSelectedSlot({ team, slotId: slot.id });
                          return;
                        }

                        // 같은 슬롯 다시 누르면 해제
                        if (selectedSlot.team === team && selectedSlot.slotId === slot.id) {
                          setSelectedSlot(null);
                          return;
                        }

                        // 팀이 다르면(홈↔원정) 교차 불가: 선택만 해제
                        if (selectedSlot.team !== team) {
                          setSelectedSlot(null);
                          return;
                        }

                        swapOrMoveWithinTeam(team, selectedSlot.slotId, slot.id);
                        setSelectedSlot(null);
                      }}
                    >
                      {player ? (
                        <>
                          <span className="sm:hidden">{player.number}</span>
                          <span className="hidden sm:inline">{player.number} {player.name}</span>
                        </>
                      ) : "빈 슬롯"}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">작전판 사용 팁</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>• 선수 클릭 후 슬롯 클릭으로 빠르게 배치</p>
                <p>• 슬롯 간 드래그로 즉시 교차 변경</p>
                <p>• 포메이션 변경 시 기본 배치 자동 재정렬</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">전체 결과</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-medium">
                홈 0승 2패
                <br />
                원정 2승
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
