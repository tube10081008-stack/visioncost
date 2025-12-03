"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col gap-10 md:gap-14">
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-emerald-300">
                VC
              </span>
            </div>
            <span className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-300">
              VisionCost
            </span>
          </div>

          <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-400 bg-slate-900/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5" />
            Beta 0.1 · Mock 모드
          </span>
        </header>

        {/* 메인 히어로 영역 */}
        <section className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* 왼쪽: 카피 */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
              이미지 한 장으로 보는 가격의 진짜 구조
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              제품 사진을 올리면,
              <br />
              <span className="text-emerald-300">
                가격이 어디에 쓰였는지
              </span>{" "}
              보여주는
              <br />
              비주얼 가격 해체 리포트.
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              VisionCost는 제품 패키지와 디자인, 브랜드 스타일을 바탕으로
              <br className="hidden md:block" />
              <span className="text-slate-100">
                원가 · 마케팅 · 유통 · 브랜드 프리미엄
              </span>
              을 추정하고,
              <br className="hidden md:block" />
              <span className="text-slate-100">
                “이 제품, 사야 할까?”에 대한 한 줄 결론
              </span>
              까지 제안합니다.
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
              >
                제품 이미지로 바로 분석하기
                <span className="ml-2 text-[11px] bg-slate-950/20 px-2 py-[2px] rounded-full">
                  Beta
                </span>
              </Link>

              <Link
                href="/result"
                className="text-sm text-slate-400 hover:text-slate-200 underline underline-offset-4 decoration-slate-600"
              >
                데모 결과 화면 먼저 보기
              </Link>
            </div>

            {/* 한 줄 설명 */}
            <p className="text-[11px] text-slate-500">
              현재는 OpenAI Vision API 쿼터 문제로{" "}
              <span className="text-slate-200">mock 데이터</span>를 사용 중입니다.
              구조와 경험을 먼저 완성한 뒤, 쿼터가 열리면 실제 분석 엔진으로
              전환됩니다.
            </p>
          </div>

          {/* 오른쪽: 미니 리포트 프리뷰 카드 */}
          <div className="relative">
            {/* 뒤 배경 블러 카드 */}
            <div className="absolute -inset-2 rounded-3xl bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800/80 p-5 md:p-6 shadow-[0_0_60px_rgba(15,23,42,0.9)] space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                    Sample Report
                  </p>
                  <p className="text-sm font-medium text-slate-100 mt-1">
                    MEDICUBE 제로 선세럼
                  </p>
                  <p className="text-[11px] text-slate-500">
                    선크림 · 32,000 KRW
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-emerald-400/50 px-2.5 py-1 text-[10px] text-emerald-300 bg-emerald-950/40">
                  현명한 소비자 Lv.1
                </span>
              </div>

              {/* 미니 그래프 느낌 바 */}
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>가격 구조</span>
                  <span>합계 100%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden flex">
                  <div className="h-full bg-emerald-400/90" style={{ width: "22%" }} />
                  <div className="h-full bg-sky-400/80" style={{ width: "28%" }} />
                  <div className="h-full bg-indigo-400/80" style={{ width: "25%" }} />
                  <div className="h-full bg-fuchsia-400/80" style={{ width: "25%" }} />
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400/90" />
                    원가(제조) · 22%
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400/90" />
                    마케팅 · 28%
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400/90" />
                    유통/플랫폼 · 25%
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400/90" />
                    브랜드 프리미엄 · 25%
                  </div>
                </div>
              </div>

              {/* 한 줄 인사이트 */}
              <div className="mt-3 rounded-2xl bg-slate-950/70 border border-slate-800/90 p-3 space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                  Vision Insight
                </p>
                <p className="text-xs text-slate-100">
                  원가 대비 마케팅·브랜드 프리미엄 비중이 높은 편입니다. 기능
                  자체보다{" "}
                  <span className="text-emerald-300">
                    이미지와 브랜드 스토리에 비용을 지불
                  </span>
                  하는 구조에 가깝습니다.
                </p>
              </div>

              {/* 한 줄 결론 */}
              <div className="mt-1 rounded-2xl bg-slate-900 border border-slate-800 p-3">
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-1">
                  한 줄 결론
                </p>
                <p className="text-xs text-slate-100">
                  이 제품은 <span className="text-yellow-300">“신중 구매”</span>가
                  적절합니다. 세일가 또는 번들 구성일 때 구매하는 전략이
                  좋아보입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 하단 설명 */}
        <section className="border-t border-slate-800 pt-6 text-[11px] text-slate-500 space-y-1">
          <p>
            VisionCost는 현재{" "}
            <span className="text-slate-200">내부 베타</span> 단계입니다. 실제
            Vision 모델 연결 전까지는 mock 데이터를 사용해
            <span className="text-slate-200">
              {" "}
              구조 · 경험 · 의사결정 로직
            </span>
            을 먼저 다듬습니다.
          </p>
          <p>
            이 페이지에서 시작하기 → <span className="text-emerald-300">/analyze</span>{" "}
            → <span className="text-emerald-300">/result</span> 까지 한 번
            흘려보내며 전체 플로우를 점검해보세요.
          </p>
        </section>
      </div>
    </main>
  );
}
