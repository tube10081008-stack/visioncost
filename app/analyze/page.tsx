"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VisionCostResult } from "@/types/visionCost";

// 결과를 base64로 인코딩해서 쿼리로 넘기기 위한 헬퍼
function encodeResult(result: VisionCostResult): string {
  const json = JSON.stringify(result);
  return btoa(unescape(encodeURIComponent(json)));
}

export default function AnalyzePage() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    setError(null);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!imageFile) {
      setError("제품 사진을 업로드해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      if (price.trim()) {
        formData.append("price", price.trim());
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("분석 요청에 실패했습니다.");
      }

      const result = (await res.json()) as VisionCostResult;

      const encoded = encodeResult(result);
      router.push(`/result?data=${encodeURIComponent(encoded)}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "분석 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        {/* 헤더 */}
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            VisionCost Analyze
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold mt-1">
            제품 사진을 업로드하고
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            VisionCost가 가격 구조를 추정하고, 구매 결정을 돕는 인사이트를 제공합니다.
          </p>
        </header>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 md:p-6"
        >
          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">
              제품 이미지
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex-1 border border-dashed border-slate-700 rounded-xl p-4 text-sm text-slate-400 cursor-pointer hover:border-emerald-400/60 hover:bg-slate-900/60 transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {!previewUrl && (
                  <div className="flex flex-col items-center justify-center h-32">
                    <span className="text-xs text-slate-500 mb-1">
                      클릭해서 이미지 선택
                    </span>
                    <span className="text-[11px] text-slate-500">
                      제품 패키지가 잘 보이도록 찍어주세요.
                    </span>
                  </div>
                )}
                {previewUrl && (
                  <div className="flex items-center gap-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-24 h-24 rounded-lg object-cover border border-slate-700"
                    />
                    <div className="text-xs text-slate-400">
                      <p className="font-medium text-slate-100 mb-1">
                        이미지가 업로드되었습니다.
                      </p>
                      <p>다른 이미지를 선택하려면 다시 클릭하세요.</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* 가격 입력 (옵션) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">
              판매 가격 (선택)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="예: 32000"
                className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400"
              />
              <span className="text-sm text-slate-400">KRW</span>
            </div>
            <p className="text-[11px] text-slate-500">
              가격을 입력하면, VisionCost가 현재 가격 기준으로 구매 결정을 도와줍니다.
            </p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* 제출 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "분석 중…" : "VisionCost로 분석하기"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
