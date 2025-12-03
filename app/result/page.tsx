"use client";

import { useSearchParams } from "next/navigation";
import { PriceBreakdownChart } from "@/components/PriceBreakdownChart";
import { VisionCostResult } from "@/types/visionCost";
import { evaluateDecision } from "@/lib/decision";

// =======================
// 헬퍼: base64로 인코딩된 JSON 디코딩
// (한글 깨지지 않도록 encodeURIComponent/escape 조합 사용)
// =======================
function decodeResult(encoded: string): VisionCostResult {
  const json = decodeURIComponent(escape(atob(encoded)));
  return JSON.parse(json);
}

// =======================
// MOCK RESULT (쿼리 없을 때 예시 데이터)
// =======================
const MOCK_RESULT: VisionCostResult = {
  meta: {
    brandName: "MEDICUBE",
    productName: "제로 선세럼",
    category: "선크림",
    price: 32000,
    currency: "KRW",
  },
  breakdown: [
    { name: "원가(제조)", percent: 0.22 },
    { name: "마케팅", percent: 0.28 },
    { name: "유통/플랫폼", percent: 0.25 },
    { name: "브랜드 프리미엄", percent: 0.25 },
  ],
  insight:
    "이 제품은 원가 대비 마케팅/브랜드 비중이 상당히 높은 편입니다. 성능보다는 브랜드/이미지에 비용이 많이 들어간 구조로 보입니다.",
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("data");

  // 1) 쿼리로 결과가 넘어오면 그걸 쓰고,
  // 2) 없으면 MOCK_RESULT 사용
  let result: VisionCostResult = MOCK_RESULT;

  if (encoded) {
    try {
      result = decodeResult(encoded);
    } catch (e) {
      console.error("Failed to decode VisionCost result:", e);
    }
  }

  const decision = evaluateDecision(result);
  const { meta, breakdown, insight } = result;

  // 퍼센트 합계 보정
  const totalPercent = breakdown.reduce((sum, item) => sum + item.percent, 0);
  const normalizedBreakdown =
    Math.abs(totalPercent - 1) < 0.001
      ? breakdown
      : breakdown.map((item) => ({
          ...item,
          percent: item.percent / totalPercent,
        }));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl space-y-6">
        {/* 헤더 */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              VisionCost Result
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">
              {meta.brandName && (
                <span className="text-slate-300 mr-2">{meta.brandName}</span>
              )}
              <span className="text-slate-50">{meta.productName}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {meta.category && `${meta.category} · `}
              {meta.price
                ? `${meta.price.toLocaleString()} ${meta.currency ?? "KRW"}`
                : "가격 미입력"}
            </p>
          </div>

          {/* 소비자 레벨 배지 자리 */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              소비자 레벨
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/40">
              Beta Tester
            </span>
          </div>
        </header>

        {/* 메인 영역 */}
        <section className="grid md:grid-cols-5 gap-6">
          {/* 왼쪽: 가격 구조 */}
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 md:p-5 shadow-[0_0_40px_rgba(15,23,42,0.6)]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-slate-100">
                  가격 구조 분석
                </h2>
                <span className="text-[10px] text-slate-500">
                  합계 100% 기준
                </span>
              </div>

              <PriceBreakdownChart breakdown={normalizedBreakdown} />

              <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
                {normalizedBreakdown.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between gap-2 border-b border-slate-800/50 pb-1 last:border-b-0 last:pb-0"
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="tabular-nums">
                      {(item.percent * 100).toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 오른쪽: 인사이트 + 한 줄 결론 */}
          <div className="md:col-span-2 space-y-4">
            {/* 인사이트 */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Vision Insight
              </p>
              <p className="text-sm leading-relaxed text-slate-100 whitespace-pre-line">
                {insight}
              </p>
            </div>

            {/* 한 줄 결론 */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                한 줄 결론
              </p>

              <p className="text-sm font-medium text-slate-50">
                {decision === "BUY" && (
                  <>
                    이 제품은{" "}
                    <span className="text-emerald-300">“구매 추천”</span>
                    입니다!
                  </>
                )}
                {decision === "CAUTION" && (
                  <>
                    이 제품은{" "}
                    <span className="text-yellow-300">“신중 구매”</span>
                    가 적절합니다.
                  </>
                )}
                {decision === "PASS" && (
                  <>
                    <span className="text-red-300">“패스”</span>
                    를 추천합니다. 세일을 기다리거나 대체 제품을 고려하세요.
                  </>
                )}
              </p>

              <p className="text-[11px] mt-2 text-slate-400">
                (원가·마케팅·브랜드 비중에 따라 자동 계산되며,
                앞으로 더 정교한 규칙 엔진으로 업그레이드 예정)
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
