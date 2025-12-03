// app/api/analyze/route.ts
import { NextResponse } from "next/server";
import type { VisionCostResult } from "@/types/visionCost";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const priceRaw = formData.get("price");
    const price =
      typeof priceRaw === "string" ? Number(priceRaw) || undefined : undefined;

    // TODO: 여기서는 아직 이미지를 실제로 분석하지 않고,
    //       일단 mock 데이터만 사용한다.
    const mockResult: VisionCostResult = {
      meta: {
        brandName: "MEDICUBE",
        productName: "제로 선세럼 (Mock)",
        category: "선크림",
        price,
        currency: "KRW",
      },
      breakdown: [
        { name: "원가(제조)", percent: 0.22 },
        { name: "마케팅", percent: 0.28 },
        { name: "유통/플랫폼", percent: 0.25 },
        { name: "브랜드 프리미엄", percent: 0.25 },
      ],
      insight:
        "Mock 모드: 실제 Vision API 대신 고정된 예시 데이터를 사용 중입니다. 원가 대비 마케팅/브랜드 비중이 상당히 높은 편으로, 이미지·브랜딩에 비용이 많이 들어간 구조로 보입니다.",
    };

    return NextResponse.json(mockResult);
  } catch (err: any) {
    console.error("VisionCost API error:", err);

    return NextResponse.json(
      {
        error: "VisionCost analyze failed",
        message: err?.message || null,
      },
      { status: 500 }
    );
  }
}
