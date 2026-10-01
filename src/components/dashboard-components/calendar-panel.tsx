"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { DayPicker } from "@daypicker/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WEEKDAYS, type Appointment } from "../appointment/appointment";
import { formatDate, formatMonth } from "@/lib/formatters";

type CalendarPanelProps = {
  appointmentsByDate: Record<string, Appointment[]>;
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
  onQuickAdd: () => void;
};

export function CalendarPanel({
  appointmentsByDate,
  selectedDate,
  today,
  onSelectDate,
  onQuickAdd,
}: CalendarPanelProps) {
  const [month, setMonth] = useState(
    () => new Date(`${selectedDate}T12:00:00`),
  );

  function changeMonth(offset: number) {
    setMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  }

  return (
    <Card
      className="overflow-visible rounded-xl border border-border bg-white py-0 shadow-[0_2px_8px_rgba(31,45,35,0.025)] ring-0"
      id="calendar"
    >
      <div className="flex items-center justify-between border-b border-[#eeece7] px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-sm font-semibold text-[#344239]">
            Appointment calendar
          </h2>
          <p className="mt-1 text-[11px] text-[#929a94]">
            Your month at a glance
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Previous month"
            className="size-8 rounded-lg text-[#717b73]"
            onClick={() => changeMonth(-1)}
            size="icon"
            variant="ghost"
          >
            <ChevronLeft />
          </Button>
          <span className="min-w-29 text-center text-xs font-semibold text-[#4b584f]">
            {formatMonth(month)}
          </span>
          <Button
            aria-label="Next month"
            className="size-8 rounded-lg text-[#717b73]"
            onClick={() => changeMonth(1)}
            size="icon"
            variant="ghost"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-5">
        <DayPicker
          aria-label="Appointment calendar"
          className="dashboard-calendar"
          mode="single"
          selected={parseISO(selectedDate)}
          onSelect={(date) => {
            if (date) onSelectDate(format(date, "yyyy-MM-dd"));
          }}
          month={month}
          onMonthChange={setMonth}
          today={parseISO(today)}
          hideNavigation
          showOutsideDays={false}
          modifiers={{
            hasAppointments: (date) =>
              (appointmentsByDate[format(date, "yyyy-MM-dd")] ?? []).some(
                (appointment) => appointment.status !== "Cancelled",
              ),
          }}
          modifiersClassNames={{ hasAppointments: "has-appointments" }}
          formatters={{
            formatWeekdayName: (date) => WEEKDAYS[date.getDay()],
            formatDay: (date) => String(date.getDate()),
          }}
          labels={{
            labelDayButton: (date) => {
              const key = format(date, "yyyy-MM-dd");
              const count =
                appointmentsByDate[key]?.filter(
                  (appointment) => appointment.status !== "Cancelled",
                ).length ?? 0;
              return `${formatDate(key)}${count ? `, ${count} appointments` : ""}`;
            },
          }}
        />
        <div className="mt-3 flex items-center justify-between border-t border-[#f0eee9] pt-3">
          <span className="flex items-center gap-2 text-[11px] text-[#8c958e]">
            <span className="size-1.5 rounded-full bg-[#7da183]" />
            Appointments
          </span>
          <Button
            className="h-8 rounded-lg px-2.5 text-[11px] text-[#38674a]"
            onClick={onQuickAdd}
            variant="ghost"
          >
            <Plus className="size-3.5" />
            Quick add
          </Button>
        </div>
      </div>
    </Card>
  );
}
