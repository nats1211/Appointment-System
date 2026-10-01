import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

type StatCardProps = {
  label: string;
  value: string;
  caption: string;
  change: string;
  icon: LucideIcon;
  changeIcon?: LucideIcon;
  captionIcon?: LucideIcon;
  changeTone?: "positive" | "neutral";
};

export function StatCard({
  label,
  value,
  caption,
  change,
  icon: Icon,
  changeIcon: ChangeIcon,
  captionIcon: CaptionIcon,
  changeTone = "neutral",
}: StatCardProps) {
  return (
    <Card className="rounded-xl border border-border bg-white p-4 shadow-[0_2px_8px_rgba(31,45,35,0.025)] ring-0 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#778178] sm:text-xs">
          {label}
        </span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#f1f5f0] text-[#608168]">
          <Icon className="size-4" strokeWidth={1.8} />
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-[27px] font-semibold leading-none tracking-[-0.04em] text-[#2e3d33]">
          {value}
        </span>
        <span
          className={`flex items-center gap-0.5 whitespace-nowrap text-[10px] font-medium ${changeTone === "positive" ? "text-[#4e8560]" : "text-[#7d877e]"}`}
        >
          {ChangeIcon && <ChangeIcon className="size-3" />}
          {change}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-1 text-[10px] text-[#9ba29c]">
        {caption}
        {CaptionIcon && <CaptionIcon className="size-3 text-[#4e8560]" />}
      </div>
    </Card>
  );
}
