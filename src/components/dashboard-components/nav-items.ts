import {
  CalendarDays,
  LayoutDashboard,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string | number;
  disabled?: boolean;
};

export const navItems: SidebarNavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "#overview" },
  {
    label: "Appointments",
    icon: CalendarDays,
    href: "#appointments",
    badge: 8,
  },
  { label: "Clients", icon: UsersRound, href: "#", disabled: true },
  { label: "Services", icon: Stethoscope, href: "#", disabled: true },
];
