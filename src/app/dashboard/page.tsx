"use client";

import { DASHBOARD_TODAY } from "@/components/appointment/appointment";
import { AppointmentsPanel } from "@/components/appointment/appointments-panel";
import { CalendarPanel } from "@/components/dashboard-components/calendar-panel";
import { CreateAppointmentDialog } from "@/components/dashboard-components/dialog/create-appointment";
import Sidebar from "@/components/dashboard-components/sidebar";
import { StatCard } from "@/components/dashboard-components/stat-card";
import { TodaySchedulePanel } from "@/components/appointment/today-schedule-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppointmentDashboard } from "@/hooks/use-appointment-dashboard";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  Clock3,
  Menu,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AppointmentDashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const {
    appointmentsByDate,
    editingAppointment,
    filter,
    isCreateOpen,
    isLoading,
    search,
    selectedDate,
    setEditingAppointment,
    setFilter,
    setIsCreateOpen,
    setSearch,
    setSelectedDate,
    setToast,
    toast,
    todayAppointments,
    updateStatus,
    visibleAppointments,
    openCreate,
    submitAppointment,
  } = useAppointmentDashboard();

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-59 flex-col border-r border-border bg-[#f9f8f5] px-4 py-6 lg:flex">
        <Sidebar onNavigate={() => setIsMobileNavOpen(false)} />
      </aside>

      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#1f2b23]/30 lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-border bg-[#f9f8f5] px-4 py-6 transition-transform lg:hidden ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onNavigate={() => setIsMobileNavOpen(false)} />
        <button
          aria-label="Close navigation"
          className="absolute right-4 top-6 rounded-md p-2 text-[#68716a] hover:bg-white"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <X className="size-4" />
        </button>
      </aside>

      <div className="lg:pl-59">
        <header className="sticky top-0 z-20 flex h-17 items-center justify-between border-b border-border bg-[#f7f5f2]/95 px-4 backdrop-blur-sm sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              aria-label="Open navigation"
              className="lg:hidden"
              onClick={() => setIsMobileNavOpen(true)}
              size="icon"
              variant="ghost"
            >
              <Menu />
            </Button>
            <div className="relative hidden w-65 sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#929a94]" />
              <Input
                aria-label="Search appointments"
                className="h-9 rounded-lg border-[#e8e6df] bg-white pl-9 text-[13px] placeholder:text-[#9da39e]"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search appointments..."
                value={search}
              />
            </div>
            <span className="hidden text-xs text-[#9aa19b] sm:block">⌘ K</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative sm:hidden">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#929a94]" />
              <Input
                aria-label="Search appointments"
                className="h-9 w-[min(38vw,180px)] rounded-lg border-[#e8e6df] bg-white pl-8 text-xs"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                value={search}
              />
            </div>
            <Button
              aria-label="Notifications"
              className="relative"
              onClick={() => setToast("You are all caught up")}
              size="icon"
              variant="ghost"
            >
              <Bell />
              <span className="absolute right-2.25 top-2 size-1.5 rounded-full bg-[#d58b4b] ring-2 ring-[#f7f5f2]" />
            </Button>
            <span className="hidden h-7 w-px bg-[#e5e3dd] sm:block" />
            <div className="hidden items-center gap-2.5 sm:flex">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#d9e6da] text-[11px] font-semibold text-[#365c40]">
                JD
              </span>
              <span className="text-xs font-medium text-[#49554c]">
                Jordan Davis
              </span>
            </div>
            <Button
              className="ml-1 h-9 rounded-lg bg-primary px-3 text-xs text-white shadow-sm hover:bg-[#24583f] sm:px-3.5 sm:text-[13px]"
              onClick={() => openCreate()}
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">New appointment</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </header>

        <main
          className="mx-auto max-w-375 px-4 pb-10 pt-7 sm:px-7 lg:px-9"
          id="overview"
        >
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#8e978f]">
                <span>Sunday, September 27, 2026</span>
                <span className="size-1 rounded-full bg-[#c3c8c2]" />
                <span>Week 39</span>
              </div>
              <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-foreground sm:text-[30px]">
                Good morning, Jordan <span aria-hidden="true">☀</span>
              </h1>
              <p className="mt-1.5 text-[13px] text-[#7c867e]">
                Here&apos;s what&apos;s happening at your clinic today.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="flex items-center gap-1.5 rounded-full border border-[#e7e5df] bg-white px-3 py-1.5 text-[11px] font-medium text-[#657067]">
                <span className="size-1.5 rounded-full bg-[#4e9a67]" />
                Clinic is open
              </span>
              <Button
                className="h-8 rounded-lg border-[#e7e5df] bg-white px-3 text-xs text-[#556159]"
                onClick={() => setToast("Your schedule is up to date")}
                variant="outline"
              >
                <Activity className="size-3.5" />
                Today
              </Button>
            </div>
          </div>

          <section
            aria-label="Appointment overview"
            className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4"
          >
            <StatCard
              label="Total appointments"
              value="128"
              caption="vs. last month"
              change="12.8%"
              icon={CalendarDays}
              changeIcon={ArrowUpRight}
              captionIcon={ArrowDownRight}
              changeTone="positive"
            />
            <StatCard
              label="Today's appointments"
              value="04"
              caption="On today's schedule"
              change="On schedule"
              icon={Clock3}
            />
            <StatCard
              label="Upcoming"
              value="24"
              caption="Next 7 days"
              change="4 new"
              icon={ArrowRight}
              changeIcon={ArrowUpRight}
              changeTone="positive"
            />
            <StatCard
              label="Completed"
              value="84"
              caption="This month"
              change="96% show rate"
              icon={CheckCheck}
              changeIcon={Check}
              changeTone="positive"
            />
          </section>

          <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
            <CalendarPanel
              appointmentsByDate={appointmentsByDate}
              key={selectedDate.slice(0, 7)}
              selectedDate={selectedDate}
              today={DASHBOARD_TODAY}
              onSelectDate={setSelectedDate}
              onQuickAdd={() => openCreate()}
            />
            <TodaySchedulePanel
              appointments={todayAppointments}
              today={DASHBOARD_TODAY}
              onViewToday={() => setFilter("Today")}
            />
          </section>

          <AppointmentsPanel
            appointments={visibleAppointments}
            isLoading={isLoading}
            filter={filter}
            search={search}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
            onShowWeek={() => setToast("Showing the current schedule")}
            onReminder={(appointment) =>
              setToast(`Reminder sent to ${appointment.client}`)
            }
            onReschedule={(appointment) =>
              openCreate(appointment.date, appointment)
            }
            onCancel={(appointmentId) =>
              updateStatus(appointmentId, "Cancelled")
            }
            onCreate={() => openCreate()}
          />

          <footer className="mt-6 flex flex-col justify-between gap-2 px-1 text-[10px] text-[#a0a69f] sm:flex-row sm:items-center">
            <span>© 2026 Evergreen Care. All rights reserved.</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-[#89a38b]" />A little more time
              for what matters.
            </span>
          </footer>
        </main>
      </div>

      <CreateAppointmentDialog
        appointment={editingAppointment}
        initialDate={selectedDate}
        minDate="2026-09-27"
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) setEditingAppointment(null);
        }}
        onSubmit={submitAppointment}
        open={isCreateOpen}
      />

      {toast && (
        <div
          className="fixed bottom-5 right-5 z-70 flex items-center gap-2 rounded-lg border border-[#dfe8df] bg-white px-4 py-3 text-xs font-medium text-[#42594a] shadow-lg"
          role="status"
        >
          <Check className="size-4 text-[#4d8b60]" />
          {toast}
          <button
            aria-label="Dismiss notification"
            className="ml-2 text-[#929a94] hover:text-[#4b584f]"
            onClick={() => setToast("")}
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
