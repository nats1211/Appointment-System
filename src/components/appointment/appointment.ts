export type AppointmentStatus =
  | "Scheduled"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No show";
export type Appointment = {
  id: number;
  client: string;
  initials: string;
  color: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
};
export type AppointmentFilter =
  | "All appointments"
  | "Today"
  | "Upcoming"
  | "Completed";

export const DASHBOARD_TODAY = "2026-09-27";

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    client: "Olivia Rhye",
    initials: "OR",
    color: "bg-[#e8d8ce] text-[#785548]",
    service: "Initial consultation",
    date: "2026-09-27",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    client: "Phoenix Baker",
    initials: "PB",
    color: "bg-[#d9e5d8] text-[#45634b]",
    service: "Follow-up visit",
    date: "2026-09-27",
    time: "10:30 AM",
    status: "Scheduled",
  },
  {
    id: 3,
    client: "Lana Steiner",
    initials: "LS",
    color: "bg-[#e6dff0] text-[#65517f]",
    service: "Wellness check",
    date: "2026-09-27",
    time: "01:00 PM",
    status: "Confirmed",
  },
  {
    id: 4,
    client: "Demi Wilkinson",
    initials: "DW",
    color: "bg-[#f1dfcf] text-[#91623e]",
    service: "Treatment session",
    date: "2026-09-27",
    time: "02:30 PM",
    status: "Scheduled",
  },
  {
    id: 5,
    client: "Candice Wu",
    initials: "CW",
    color: "bg-[#d9e8ec] text-[#456a75]",
    service: "Initial consultation",
    date: "2026-09-28",
    time: "09:30 AM",
    status: "Scheduled",
  },
  {
    id: 6,
    client: "Natali Craig",
    initials: "NC",
    color: "bg-[#eee2ca] text-[#78643d]",
    service: "Follow-up visit",
    date: "2026-09-28",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    id: 7,
    client: "Drew Cano",
    initials: "DC",
    color: "bg-[#e7dadd] text-[#76565c]",
    service: "Wellness check",
    date: "2026-09-29",
    time: "03:00 PM",
    status: "Completed",
  },
  {
    id: 8,
    client: "Orlando Diggs",
    initials: "OD",
    color: "bg-[#dce3ed] text-[#4e5d77]",
    service: "Treatment session",
    date: "2026-09-30",
    time: "10:00 AM",
    status: "No show",
  },
];

export const FILTERS: AppointmentFilter[] = [
  "All appointments",
  "Today",
  "Upcoming",
  "Completed",
];
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const STATUS_STYLES: Record<AppointmentStatus, string> = {
  Scheduled: "bg-[#f3f0e7] text-[#746344]",
  Confirmed: "bg-[#e6f1e9] text-[#326347]",
  Completed: "bg-[#edf0f2] text-[#53616a]",
  Cancelled: "bg-[#f8e9e7] text-[#9d5148]",
  "No show": "bg-[#f7eddf] text-[#9a6b2e]",
};
