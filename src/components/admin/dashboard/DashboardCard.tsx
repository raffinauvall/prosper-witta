import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  tone: "blue" | "green" | "amber" | "rose" | "slate";
};

const toneClass: Record<DashboardCardProps["tone"], string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  rose: "bg-rose-50 text-rose-700 ring-rose-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function DashboardCard({ title, value, icon: Icon, tone }: DashboardCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="mt-3 text-3xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className={`rounded-lg p-2 ring-1 ${toneClass[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
