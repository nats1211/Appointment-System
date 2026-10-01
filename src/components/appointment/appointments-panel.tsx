"use client";

import { useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Plus,
  Search,
  X,
} from "lucide-react";
import { FILTERS, STATUS_STYLES } from "./appointment";
import AppointmentSkeleton from "./appointment-skeleton";
import { formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AppointmentsPanelProps } from "./props";

export function AppointmentsPanel({
  appointments,
  isLoading,
  filter,
  search,
  onFilterChange,
  onSearchChange,
  onShowWeek,
  onReminder,
  onReschedule,
  onCancel,
  onCreate,
}: AppointmentsPanelProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <section className="mt-5" id="appointments">
      <Card className="overflow-hidden rounded-xl border border-border bg-white py-0 shadow-[0_2px_8px_rgba(31,45,35,0.025)] ring-0">
        <div className="flex flex-col justify-between gap-3 border-b border-[#eeece7] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#344239]">
                Appointments
              </h2>
              <span className="rounded-full bg-[#f2f2ed] px-2 py-0.5 text-[10px] font-medium text-[#778078]">
                {appointments.length}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#929a94]">
              Manage and keep track of your visits
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9aa19b]" />
              <Input
                aria-label="Filter appointments"
                className="h-8 w-46.25 rounded-lg border-border pl-8 text-xs"
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Filter list..."
                value={search}
              />
            </div>
            <Button
              className="h-8 rounded-lg border-border px-2.5 text-[11px] text-[#5c685f]"
              onClick={onShowWeek}
              variant="outline"
            >
              <CalendarDays className="size-3.5" />
              <span className="hidden sm:inline">This week</span>
              <ChevronDown className="size-3" />
            </Button>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-b border-[#eeece7] px-4 sm:px-6">
          {FILTERS.map((item) => (
            <button
              aria-pressed={filter === item}
              className={`relative shrink-0 px-2.5 py-3 text-[11px] font-medium transition-colors ${filter === item ? "text-primary" : "text-[#828b84] hover:text-[#455249]"}`}
              key={item}
              onClick={() => onFilterChange(item)}
            >
              {item}
              {filter === item && (
                <span className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-[#3c7653]" />
              )}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-collapse text-left">
            <thead>
              <tr className="bg-[#fbfaf8] text-[10px] font-medium uppercase tracking-[0.06em] text-[#969e97]">
                <th className="px-5 py-3 font-medium sm:px-6">Client</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date &amp; time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium sm:px-6" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0eee9]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-0">
                    <AppointmentSkeleton />
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr
                    className="group transition-colors hover:bg-[#fcfbf9]"
                    key={appointment.id}
                  >
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${appointment.color}`}
                        >
                          {appointment.initials}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-[#465249]">
                            {appointment.client}
                          </div>
                          <div className="mt-0.5 text-[10px] text-[#a0a69f]">
                            Client
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#68736a]">
                      {appointment.service}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-medium text-[#59655d]">
                        {formatDate(appointment.date, "MMM d, yyyy")}
                      </div>
                      <div className="mt-0.5 text-[10px] text-[#9aa19b]">
                        {appointment.time}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${STATUS_STYLES[appointment.status]}`}
                      >
                        <span className="size-1 rounded-full bg-current opacity-70" />
                        {appointment.status}
                      </span>
                    </td>
                    <td className="relative px-5 py-3.5 text-right sm:px-6">
                      <Button
                        aria-label={`Actions for ${appointment.client}`}
                        className="size-8 rounded-lg text-[#859087] opacity-70 hover:bg-[#f2f4f0] hover:text-[#425347] group-hover:opacity-100"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === appointment.id
                              ? null
                              : appointment.id,
                          )
                        }
                        size="icon"
                        variant="ghost"
                      >
                        <Ellipsis />
                      </Button>
                      {activeMenu === appointment.id && (
                        <div className="absolute right-6 top-12 z-10 w-44 rounded-lg border border-[#e8e6df] bg-white p-1.5 text-left shadow-lg">
                          <button
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] text-[#58655c] hover:bg-[#f5f6f3]"
                            onClick={() => {
                              setActiveMenu(null);
                              onReminder(appointment);
                            }}
                          >
                            <Bell className="size-3.5" />
                            Send reminder
                          </button>
                          <button
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] text-[#58655c] hover:bg-[#f5f6f3]"
                            onClick={() => {
                              setActiveMenu(null);
                              onReschedule(appointment);
                            }}
                          >
                            <CalendarDays className="size-3.5" />
                            Reschedule
                          </button>
                          {appointment.status !== "Completed" && (
                            <button
                              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[11px] text-[#a04d44] hover:bg-[#fbf1ef]"
                              onClick={() => {
                                setActiveMenu(null);
                                onCancel(appointment.id);
                              }}
                            >
                              <X className="size-3.5" />
                              Cancel appointment
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && appointments.length === 0 && (
                <tr>
                  <td className="px-6 py-14 text-center" colSpan={5}>
                    <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#f1f4ef] text-[#708576]">
                      <CalendarDays className="size-5" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-[#4b584f]">
                      No appointments found
                    </p>
                    <p className="mt-1 text-xs text-[#929a94]">
                      Try another search or create a new appointment.
                    </p>
                    <Button
                      className="mt-4 h-8 rounded-lg bg-primary px-3 text-xs text-white hover:bg-[#24583f]"
                      onClick={onCreate}
                    >
                      <Plus className="size-3.5" />
                      Create appointment
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[#eeece7] px-5 py-3 text-[10px] text-[#939b94] sm:px-6">
          <span>
            Showing{" "}
            <span className="font-medium text-[#68736a]">
              {appointments.length ? 1 : 0}–{appointments.length}
            </span>{" "}
            of {appointments.length} appointments
          </span>
          <div className="flex gap-1">
            <Button
              aria-label="Previous page"
              className="size-7 rounded-md text-[#879189]"
              disabled
              size="icon"
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <Button
              aria-label="Next page"
              className="size-7 rounded-md text-[#879189]"
              disabled
              size="icon"
              variant="ghost"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
