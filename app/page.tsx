export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-800/70 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/40">
              <span className="text-lg font-semibold text-emerald-300">SB</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-50">
                조기 축구 작전판 스코어보드
              </h1>
              <p className="text-xs text-slate-400">
                두 팀의 포메이션, 선수, 쿼터별 포지션을 한눈에 관리하세요.
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-4 text-sm text-slate-300 sm:flex">
            <span className="rounded-full border border-slate-700/70 px-3 py-1 text-xs">
              기본 뼈대 화면
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:py-8">
        {/* 좌측: 팀/포메이션/선수 관리 패널 */}
        <section className="flex w-full flex-col gap-4 sm:w-80">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/40">
            <h2 className="mb-2 text-sm font-semibold text-slate-100">
              경기 / 쿼터 설정
            </h2>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wide text-slate-400">
                  경기 이름
                </label>
                <div className="h-8 rounded-md border border-slate-700/70 bg-slate-900/70 px-2 text-slate-400">
                  {/* TODO: 인풋으로 변경 예정 */}
                  예) 일요조기 A조 vs B조
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[11px] uppercase tracking-wide text-slate-400">
                    현재 쿼터
                  </label>
                  <div className="mt-1 flex h-8 items-center justify-between rounded-md border border-slate-700/70 bg-slate-900/70 px-2 text-slate-200">
                    <span>1쿼터</span>
                    <span className="text-[10px] text-slate-400">+ 변경 예정</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-[11px] uppercase tracking-wide text-slate-400">
                    경기 시간
                  </label>
                  <div className="mt-1 flex h-8 items-center justify-between rounded-md border border-slate-700/70 bg-slate-900/70 px-2 text-slate-200">
                    <span>25분</span>
                    <span className="text-[10px] text-slate-400">설정 예정</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/40">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                팀 &amp; 포메이션 관리
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                뼈대 상태
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-3">
                <p className="text-[11px] font-semibold text-emerald-300">
                  홈 팀
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  포메이션과 선수 명단을 여기에 구성할 예정입니다.
                </p>
                <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
                  <li>• 포메이션 선택 (예: 4-4-2)</li>
                  <li>• 선발 / 교체 선수 등록</li>
                  <li>• 등번호 / 포지션 기본값</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-3">
                <p className="text-[11px] font-semibold text-sky-300">
                  원정 팀
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  홈 팀과 동일한 방식으로 관리됩니다.
                </p>
                <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
                  <li>• 포메이션 프리셋 저장</li>
                  <li>• 선수 닉네임/실명 관리</li>
                  <li>• 시즌별 로스터 계획</li>
                </ul>
              </div>
            </div>

            <div className="mt-1 rounded-xl border border-dashed border-slate-700/70 bg-slate-900/70 p-3 text-[11px] text-slate-400">
              이후 이 영역에는 팀 생성/수정 폼, 선수 명단 테이블, 포메이션 프리셋 저장 기능 등이 들어갈 예정입니다.
            </div>
          </div>
        </section>

        {/* 우측: 경기장 / 포지션 / 기록 패널 */}
        <section className="flex flex-1 flex-col gap-4">
          {/* 상단: 실제 비율에 가까운 경기장 */}
          <div className="relative flex-1 min-h-[260px] rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-900/60 via-emerald-950/80 to-slate-950/90 p-4 shadow-[0_0_60px_rgba(16,185,129,0.18)]">
            <div className="mb-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-100">
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium">
                  작전판
                </span>
                <span className="text-[11px] text-emerald-100/80">
                  실제 규격 비율에 맞춘 축구장 뼈대
                </span>
              </div>
              <span className="text-[10px] text-emerald-100/60">
                포지션 드래그 &amp; 쿼터별 저장 기능 예정
              </span>
            </div>

            {/* 105 x 68 비율을 의식한 컨테이너 (넓은 가로형) */}
            <div className="relative mx-auto h-[260px] w-full max-w-[620px] rounded-[30px] border border-emerald-300/60 bg-emerald-900/40 p-3 pitch-grid-bg">
              {/* 중앙선 & 센터 서클 */}
              <div className="pointer-events-none absolute inset-3">
                <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-emerald-200/70" />
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/60" />
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
          </div>

          {/* 하단: 스코어 & 기록 요약 뼈대 */}
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/80 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-100">
                  쿼터별 포지션 / 교체 계획
                </h2>
                <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                  1쿼터 기준 뼈대
                </span>
              </div>
              <p className="mb-3 text-[11px] text-slate-400">
                각 쿼터마다 포지션 변경, 교체, 득점/실점 메모 등을 기록할 예정입니다.
                아래 테이블은 향후 데이터 테이블로 교체될 자리입니다.
              </p>
              <div className="no-scrollbar overflow-x-auto rounded-xl border border-slate-800/70 bg-slate-950/60">
                <table className="min-w-full divide-y divide-slate-800 text-[11px]">
                  <thead className="bg-slate-900/80">
                    <tr className="text-slate-300">
                      <th className="px-3 py-2 text-left font-medium">쿼터</th>
                      <th className="px-3 py-2 text-left font-medium">팀</th>
                      <th className="px-3 py-2 text-left font-medium">
                        주요 변경 포지션
                      </th>
                      <th className="px-3 py-2 text-left font-medium">메모</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    <tr>
                      <td className="px-3 py-2">1Q</td>
                      <td className="px-3 py-2">홈 팀</td>
                      <td className="px-3 py-2">LW → ST 교체 예정</td>
                      <td className="px-3 py-2">전방 압박 강화</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">1Q</td>
                      <td className="px-3 py-2">원정 팀</td>
                      <td className="px-3 py-2">DM 추가 배치</td>
                      <td className="px-3 py-2">수비 안정 우선</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/80 p-4">
              <h2 className="text-sm font-semibold text-slate-100">
                스코어보드 개요
              </h2>
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="text-xs text-slate-400">현재 스코어</span>
                  <span className="rounded-full bg-slate-800/70 px-2 py-0.5 text-xs text-slate-100">
                    홈 0 : 0 원정
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">
                  득점/도움/카드 등 이벤트 기록 기능 예정
                </span>
              </div>
              <div className="mt-1 space-y-2 text-[11px] text-slate-400">
                <p>
                  지금은 UI 뼈대만 구성된 상태이며, 이후 로그인/가입, 팀/포메이션
                  CRUD, 쿼터별 포지션 저장, 상세 기록 입력 기능을 단계적으로
                  추가할 수 있습니다.
                </p>
                <ul className="space-y-1">
                  <li>• 회원별 팀/전략 보드 저장</li>
                  <li>• 경기 단위 스코어/이벤트 기록</li>
                  <li>• 포메이션 프리셋 불러오기 / 복사</li>
                </ul>
              </div>
            </div>
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
