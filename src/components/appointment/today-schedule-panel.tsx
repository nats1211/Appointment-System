"use client";

import { ArrowRight } from "lucide-react";
import type { Appointment } from "./appointment";
import { formatFullDate } from "@/lib/formatters";
import { Card } from "@/components/ui/card";

type TodaySchedulePanelProps = {
  appointments: Appointment[];
  today: string;
  onViewToday: () => void;
};

export function TodaySchedulePanel({
  appointments,
  today,
  onViewToday,
}: TodaySchedulePanelProps) {
  return (
    <Card className="rounded-xl border border-border bg-white py-0 shadow-[0_2px_8px_rgba(31,45,35,0.025)] ring-0">
      <div className="flex items-center justify-between border-b border-[#eeece7] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-[#344239]">
            Today&apos;s schedule
          </h2>
          <p className="mt-1 text-[11px] text-[#929a94]">
            {formatFullDate(today)}
          </p>
        </div>
        <span className="rounded-md bg-[#f3f5f1] px-2 py-1 text-[10px] font-semibold text-[#647268]">
          {appointments.length} {appointments.length === 1 ? "visit" : "visits"}
        </span>
      </div>
      <div className="px-5 py-1">
        {appointments.slice(0, 4).map((appointment, index) => (
          <div className="relative flex gap-3 py-3.5" key={appointment.id}>
            <div className="w-14.5 shrink-0 pt-0.5 text-[10px] font-medium text-[#879189]">
              {appointment.time}
            </div>
            <div className="relative flex flex-1 items-start gap-2.5 border-l border-[#e9ede8] pl-3.5">
              <span
                className={`absolute -left-1 top-1.5 size-1.75 rounded-full ring-2 ring-white ${index === 0 ? "bg-[#4d8b60]" : "bg-[#c5d1c4]"}`}
              />
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-[#455249]">
                  {appointment.client}
                </div>
                <div className="mt-1 truncate text-[10px] text-[#929a94]">
                  {appointment.service}
                </div>
              </div>
            </div>
            <span
              className={`mt-0.5 size-1.5 shrink-0 rounded-full ${appointment.status === "Confirmed" ? "bg-[#6ea17a]" : "bg-[#c9aa6b]"}`}
            />
          </div>
        ))}
        {appointments.length === 0 && (
          <div className="py-8 text-center text-xs text-[#89938b]">
            Nothing scheduled for today.
          </div>
        )}
      </div>
      <div className="border-t border-[#eeece7] px-5 py-3">
        <a
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#3c704f] hover:text-[#285b3e]"
          href="#appointments"
          onClick={onViewToday}
        >
          View today&apos;s appointments
          <ArrowRight className="size-3" />
        </a>
      </div>
    </Card>
  );
}
