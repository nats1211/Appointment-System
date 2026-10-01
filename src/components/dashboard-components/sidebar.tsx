"use client";
import { CalendarDays, ChevronDown, LogOut, Settings2 } from "lucide-react";
import { signOutAction } from "@/features/auth/actions";
import { navItems, type SidebarNavItem } from "./nav-items";

type SidebarProps = {
  items?: SidebarNavItem[];
  activeItem?: string;
  onNavigate?: () => void;
  onSettingsClick?: () => void;
  onAccountClick?: () => void;
  user?: { initials: string; name: string; description: string };
};

export default function Sidebar({
  items = navItems,
  activeItem = "Overview",
  onNavigate,
  onSettingsClick,
  onAccountClick,
  user = {
    initials: "JD",
    name: "Jordan Davis",
    description: "Clinic administrator",
  },
}: SidebarProps) {
  return (
    <>
      <a
        className="flex items-center gap-3 px-2 py-1"
        href="#overview"
        onClick={onNavigate}
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white">
          <CalendarDays className="size-4.5" />
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
          evergreen<span className="text-[#8b978e]">.care</span>
        </span>
      </a>
      <div className="mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9ba29c]">
        Workspace
      </div>
      <nav aria-label="Main navigation" className="mt-3 space-y-1">
        {items.map(({ label, icon: Icon, href, badge, disabled }) => (
          <a
            aria-current={label === activeItem ? "page" : undefined}
            aria-disabled={disabled || undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${label === activeItem ? "bg-[#e8f0e9] text-[#285d43]" : "text-[#68716a] hover:bg-white hover:text-[#314139]"} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            href={href}
            key={label}
            onClick={(event) => {
              if (disabled) event.preventDefault();
              onNavigate?.();
            }}
          >
            <Icon className="size-4.25" strokeWidth={1.8} />
            {label}
            {badge !== undefined && (
              <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] text-[#66736a]">
                {badge}
              </span>
            )}
          </a>
        ))}
      </nav>
      <div className="mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9ba29c]">
        Preferences
      </div>
      <button
        className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-[#68716a] transition-colors hover:bg-white hover:text-[#314139]"
        onClick={onSettingsClick}
      >
        <Settings2 className="size-4.25" strokeWidth={1.8} />
        Settings
      </button>
      <div className="mt-auto border-t border-border pt-4">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white"
          onClick={onAccountClick}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9e6da] text-xs font-semibold text-[#365c40]">
            {user.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-secondary-foreground">
              {user.name}
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-[#8a928c]">
              {user.description}
            </span>
          </span>
          <ChevronDown className="size-4 text-[#89918b]" />
        </button>
        <form action={signOutAction}>
          <button
            type="submit"
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-xs font-medium text-[#68716a] transition-colors hover:bg-white hover:text-[#314139]"
          >
            <LogOut className="size-4" strokeWidth={1.8} />
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}
