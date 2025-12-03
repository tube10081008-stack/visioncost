// lib/decision.ts

import { VisionCostResult } from "@/types/visionCost";

// 반환 타입: BUY | CAUTION | PASS
export type Decision = "BUY" | "CAUTION" | "PASS";

/**
 * VisionCost 구매 판단 엔진 v0.1
 * - 입력: VisionCostResult
 * - 출력: "BUY" | "CAUTION" | "PASS"
 */
export function evaluateDecision(result: VisionCostResult): Decision {
  const breakdown = result.breakdown;

  const find = (name: string) =>
    breakdown.find((b) => b.name.includes(name))?.percent ?? 0;

  const manufacturing = find("원가"); // 제조비
  const marketing = find("마케팅");
  const brand = find("브랜드");

  const marketingPlusBrand = marketing + brand;

  // 1. 원가 비중이 매우 높으면 좋은 제품
  if (manufacturing >= 0.4) {
    return "BUY";
  }

  // 2. 마케팅+브랜드 프리미엄이 너무 높으면 패스
  if (marketingPlusBrand >= 0.6) {
    return "PASS";
  }

  // 3. 그 외엔 신중 구매
  return "CAUTION";
}
