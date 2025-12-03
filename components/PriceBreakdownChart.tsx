// components/PriceBreakdownChart.tsx
"use client";

import {
  Bar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { VisionCostBreakdownItem } from "@/types/visionCost";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  breakdown: VisionCostBreakdownItem[];
};

export function PriceBreakdownChart({ breakdown }: Props) {
  const labels = breakdown.map((item) => item.name);
  const percents = breakdown.map((item) => +(item.percent * 100).toFixed(1));

  const data = {
    labels,
    datasets: [
      {
        label: "비율 (%)",
        data: percents,
        borderRadius: 12,
        // 색상은 기본값 사용 (나중에 VisionCost 브랜드 컬러로 튜닝)
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(context: any) {
            const value = context.parsed.x;
            return ` ${value.toFixed(1)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
      y: {},
    },
  };

  return (
    <div className="w-full h-52 md:h-64">
      <Bar data={data} options={options} />
    </div>
  );
}
