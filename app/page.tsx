import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="text-sm font-semibold tracking-tight">SB</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                조기 축구 작전판 스코어보드
              </h1>
              <p className="text-xs text-muted-foreground">
                두 팀의 포메이션, 선수, 쿼터별 포지션을 한눈에 관리하세요.
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 sm:flex">
            <Badge variant="secondary">기본 뼈대</Badge>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" size="sm" />}>
                경기 설정
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>경기 설정</DialogTitle>
                  <DialogDescription>
                    현재는 UI 뼈대이며, 이후 저장/불러오기 기능을 붙일 수 있습니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="matchName">경기 이름</Label>
                    <Input id="matchName" placeholder="예) 일요조기 A조 vs B조" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label>현재 쿼터</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1쿼터</SelectItem>
                          <SelectItem value="2">2쿼터</SelectItem>
                          <SelectItem value="3">3쿼터</SelectItem>
                          <SelectItem value="4">4쿼터</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">쿼터 시간(분)</Label>
                      <Input id="duration" inputMode="numeric" placeholder="예) 25" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">취소</Button>
                    <Button>저장(예정)</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:py-8">
        {/* 좌측: 팀/포메이션/선수 관리 패널 */}
        <section className="flex w-full flex-col gap-4 sm:w-80">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">팀 &amp; 포메이션</CardTitle>
              <CardDescription>
                가입한 사용자가 팀 구성과 전략을 저장/수정할 수 있도록 확장할 예정입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="home">홈 팀</TabsTrigger>
                  <TabsTrigger value="away">원정 팀</TabsTrigger>
                </TabsList>
                <TabsContent value="home" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>팀 이름</Label>
                    <Input placeholder="예) A조" />
                  </div>
                  <div className="grid gap-2">
                    <Label>포메이션</Label>
                    <Select defaultValue="4-4-2">
                      <SelectTrigger>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4-4-2">4-4-2</SelectItem>
                        <SelectItem value="4-3-3">4-3-3</SelectItem>
                        <SelectItem value="3-5-2">3-5-2</SelectItem>
                        <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>선수 명단(초안)</Label>
                    <Textarea
                      placeholder={"예)\n1. 김철수(GK)\n2. 박민수(CB)\n..."}
                      className="min-h-24"
                    />
                    <p className="text-xs text-muted-foreground">
                      이후 이 입력은 선발/교체 구분, 등번호, 기본 포지션을 갖는 테이블로 바뀔 예정입니다.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="away" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>팀 이름</Label>
                    <Input placeholder="예) B조" />
                  </div>
                  <div className="grid gap-2">
                    <Label>포메이션</Label>
                    <Select defaultValue="4-3-3">
                      <SelectTrigger>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4-4-2">4-4-2</SelectItem>
                        <SelectItem value="4-3-3">4-3-3</SelectItem>
                        <SelectItem value="3-5-2">3-5-2</SelectItem>
                        <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>선수 명단(초안)</Label>
                    <Textarea placeholder="예) ..." className="min-h-24" />
                  </div>
                </TabsContent>
              </Tabs>
              <Separator />
              <div className="flex items-center justify-between">
                <Badge variant="secondary">뼈대 상태</Badge>
                <Button size="sm">저장(예정)</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">쿼터 / 기록</CardTitle>
              <CardDescription>
                쿼터별 포지션 변경과 이벤트(득점/도움/카드 등)를 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>현재 쿼터</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1쿼터</SelectItem>
                      <SelectItem value="2">2쿼터</SelectItem>
                      <SelectItem value="3">3쿼터</SelectItem>
                      <SelectItem value="4">4쿼터</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>쿼터 시간(분)</Label>
                  <Input inputMode="numeric" placeholder="25" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">현재 스코어</span>{" "}
                  <span className="font-semibold">홈 0 : 0 원정</span>
                </div>
                <Button variant="outline" size="sm">
                  이벤트 추가(예정)
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 우측: 경기장 / 포지션 / 기록 패널 */}
        <section className="flex flex-1 flex-col gap-4">
          {/* 상단: 실제 비율에 가까운 경기장 */}
          <Card className="relative flex-1">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">작전판</CardTitle>
                  <Badge variant="secondary">실제 비율 뼈대</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    포메이션 불러오기(예정)
                  </Button>
                  <Button size="sm">저장(예정)</Button>
                </div>
              </div>
              <CardDescription>
                경기장 내부에 두 팀 포메이션이 표시됩니다. 이후 드래그로 포지션을 바꾸고 쿼터별로 저장할 수 있게 확장합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 105 x 68 비율을 의식한 컨테이너 (넓은 가로형) */}
              <div className="relative mx-auto h-[320px] w-full max-w-[760px] rounded-[28px] border bg-gradient-to-br from-emerald-950/60 via-emerald-950/40 to-background p-3 pitch-grid-bg shadow-[0_0_40px_rgba(16,185,129,0.18)]">
              {/* 중앙선 & 센터 서클 */}
              <div className="pointer-events-none absolute inset-3">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-emerald-200/70" />
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/60" />
              </div>

              {/* 페널티 박스 / 골대 영역 (양쪽) */}
              <div className="pointer-events-none absolute inset-y-10 left-3 w-20 rounded-l-[26px] border border-emerald-200/60 border-r-0" />
              <div className="pointer-events-none absolute inset-y-16 left-3 w-12 rounded-l-[24px] border border-emerald-200/60 border-r-0" />
              <div className="pointer-events-none absolute inset-y-10 right-3 w-20 rounded-r-[26px] border border-emerald-200/60 border-l-0" />
              <div className="pointer-events-none absolute inset-y-16 right-3 w-12 rounded-r-[24px] border border-emerald-200/60 border-l-0" />

              {/* 예시 포메이션 아이콘 (홈 / 원정) */}
              <div className="pointer-events-none absolute inset-5">
                {/* 홈 팀 (왼쪽, 초록) */}
                <div className="absolute inset-y-4 left-[18%] flex flex-col justify-between">
                  <div className="flex justify-center gap-6">
                    <PlayerDot color="emerald" />
                  </div>
                  <div className="flex justify-center gap-6">
                    <PlayerDot color="emerald" />
                    <PlayerDot color="emerald" />
                    <PlayerDot color="emerald" />
                  </div>
                  <div className="flex justify-center gap-4">
                    <PlayerDot color="emerald" />
                    <PlayerDot color="emerald" />
                  </div>
                  <div className="flex justify-center">
                    <PlayerDot color="emerald" />
                  </div>
                </div>

                {/* 원정 팀 (오른쪽, 파랑) */}
                <div className="absolute inset-y-4 right-[18%] flex flex-col justify-between">
                  <div className="flex justify-center">
                    <PlayerDot color="sky" />
                  </div>
                  <div className="flex justify-center gap-4">
                    <PlayerDot color="sky" />
                    <PlayerDot color="sky" />
                  </div>
                  <div className="flex justify-center gap-6">
                    <PlayerDot color="sky" />
                    <PlayerDot color="sky" />
                    <PlayerDot color="sky" />
                  </div>
                  <div className="flex justify-center gap-6">
                    <PlayerDot color="sky" />
                  </div>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>

          {/* 하단: 스코어 & 기록 요약 뼈대 */}
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">쿼터별 포지션 / 교체 계획</CardTitle>
                  <Badge variant="secondary">1쿼터</Badge>
                </div>
                <CardDescription>
                  각 쿼터마다 포지션 변경, 교체, 득점/실점 메모 등을 기록할 예정입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="no-scrollbar overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[72px]">쿼터</TableHead>
                      <TableHead className="w-[88px]">팀</TableHead>
                      <TableHead>주요 변경 포지션</TableHead>
                      <TableHead>메모</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1Q</TableCell>
                      <TableCell>홈</TableCell>
                      <TableCell>LW → ST 교체 예정</TableCell>
                      <TableCell>전방 압박 강화</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1Q</TableCell>
                      <TableCell>원정</TableCell>
                      <TableCell>DM 추가 배치</TableCell>
                      <TableCell>수비 안정 우선</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-base">스코어보드 개요</CardTitle>
                <CardDescription>
                  회원별 팀/전략 저장, 경기 단위 기록을 단계적으로 추가할 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">현재 스코어</span>
                    <Badge>홈 0 : 0 원정</Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    기록 보기(예정)
                  </Button>
                </div>
                <Separator />
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 회원 가입/로그인 후 내 팀 템플릿 저장</li>
                  <li>• 경기 생성 → 쿼터별 포지션 저장/불러오기</li>
                  <li>• 득점/도움/카드/교체 등 이벤트 타임라인</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

type PlayerDotProps = {
  color: "emerald" | "sky";
};

function PlayerDot({ color }: PlayerDotProps) {
  const base =
    "flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-semibold shadow-[0_0_10px_rgba(255,255,255,0.15)]";
  const palette =
    color === "emerald"
      ? "bg-emerald-400/80 border-emerald-100 text-emerald-950"
      : "bg-sky-400/80 border-sky-100 text-sky-950";

  return <div className={`${base} ${palette}`}>●</div>;
}
