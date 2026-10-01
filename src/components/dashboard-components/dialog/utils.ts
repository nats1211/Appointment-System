import { Appointment } from "../../appointment/appointment";

export type AppointmentFormValues = {
  client: string;
  service: string;
  date: string;
  time: string;
};

export type FormErrors = Partial<Record<keyof AppointmentFormValues, string>>;

export type CreateAppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDate: string;
  minDate?: string;
  appointment?: Appointment | null;
  onSubmit: (values: AppointmentFormValues) => void;
};

export function timeInputValue(time: string) {
  const [clock, period] = time.split(" ");
  const [rawHours, minutes] = clock.split(":");
  const hours = (Number(rawHours) % 12) + (period === "PM" ? 12 : 0);
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}
