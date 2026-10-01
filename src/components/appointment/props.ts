import { Appointment, AppointmentFilter } from "./appointment";

export type AppointmentsPanelProps = {
  appointments: Appointment[];
  isLoading: boolean;
  filter: AppointmentFilter;
  search: string;
  onFilterChange: (filter: AppointmentFilter) => void;
  onSearchChange: (search: string) => void;
  onShowWeek: () => void;
  onReminder: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointmentId: number) => void;
  onCreate: () => void;
};
