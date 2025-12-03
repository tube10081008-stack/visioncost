// types/visionCost.ts

export type VisionCostBreakdownItem = {
  name: string;        // 예: "원가", "마케팅", "유통", "브랜드 프리미엄"
  percent: number;     // 0~1 사이 비율 예) 0.25 -> 25%
  description?: string;
};

export type VisionCostMeta = {
  brandName?: string;  // 브랜드가 없는 제품이면 없어도 됨
  productName?: string;
  category?: string;   // 예: "선크림", "머그컵"
  price?: number;      // 사용자가 입력한 판매가 (선택)
  currency?: string;   // 기본 "KRW"
};

export type VisionCostResult = {
  meta: VisionCostMeta;
  breakdown: VisionCostBreakdownItem[];
  insight: string;     // 인사이트 문장 (한두 문장)
};
