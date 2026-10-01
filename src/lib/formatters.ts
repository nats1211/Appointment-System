import { format, parseISO } from "date-fns";

export function formatMonth(date: Date) {
  return format(date, "MMMM yyyy");
}

export function formatDate(date: string, pattern = "MMM d") {
  return format(parseISO(date), pattern);
}

export function formatFullDate(date: string) {
  return formatDate(date, "EEEE, MMMM d");
}

export function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}