"use client";

import { format, parse } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import {
  DASHBOARD_TODAY,
  INITIAL_APPOINTMENTS,
  type Appointment,
  type AppointmentFilter,
  type AppointmentStatus,
} from "@/components/appointment/appointment";
import type { AppointmentFormValues } from "@/components/dashboard-components/dialog/utils";
import { initialsFor } from "@/lib/formatters";

export function useAppointmentDashboard() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [filter, setFilter] = useState<AppointmentFilter>("All appointments");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(DASHBOARD_TODAY);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const appointmentsByDate = useMemo(
    () =>
      appointments.reduce<Record<string, Appointment[]>>(
        (grouped, appointment) => {
          (grouped[appointment.date] ??= []).push(appointment);
          return grouped;
        },
        {},
      ),
    [appointments],
  );

  const todayAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => appointment.date === DASHBOARD_TODAY,
      ),
    [appointments],
  );

  const visibleAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        `${appointment.client} ${appointment.service} ${appointment.status}`
          .toLowerCase()
          .includes(query);
      const matchesFilter =
        filter === "All appointments" ||
        (filter === "Today" && appointment.date === DASHBOARD_TODAY) ||
        (filter === "Upcoming" &&
          appointment.date >= DASHBOARD_TODAY &&
          !["Completed", "Cancelled", "No show"].includes(
            appointment.status,
          )) ||
        (filter === "Completed" && appointment.status === "Completed");
      return matchesSearch && matchesFilter;
    });
  }, [appointments, filter, search]);

  function updateStatus(id: number, status: AppointmentStatus) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
    setToast(
      status === "Cancelled"
        ? "Appointment cancelled"
        : `Appointment marked ${status.toLowerCase()}`,
    );
  }

  function submitAppointment({
    client,
    service,
    date,
    time,
  }: AppointmentFormValues) {
    const formattedTime = format(parse(time, "HH:mm", new Date()), "hh:mm a");
    if (editingAppointment) {
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === editingAppointment.id
            ? {
                ...appointment,
                client,
                initials: initialsFor(client),
                service,
                date,
                time: formattedTime,
              }
            : appointment,
        ),
      );
      setToast("Appointment rescheduled");
      return;
    }

    setAppointments((current) => [
      {
        id: Date.now(),
        client,
        initials: initialsFor(client),
        color: "bg-[#dce9df] text-[#3f6649]",
        service,
        date,
        time: formattedTime,
        status: "Scheduled",
      },
      ...current,
    ]);
    setSelectedDate(date);
    setFilter("All appointments");
    setToast("Appointment created");
  }

  function openCreate(
    date = selectedDate,
    appointment: Appointment | null = null,
  ) {
    setSelectedDate(date);
    setEditingAppointment(appointment);
    setIsCreateOpen(true);
  }

  return {
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
  };
}
