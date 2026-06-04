import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-normal text-[#1E293B]">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

type SectionCardProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, description, actions, children, className }: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]",
        className
      )}
    >
      {(title || description || actions) && (
        <div className="mb-5 flex flex-col gap-3 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && <h2 className="text-xl font-extrabold text-[#1E293B]">{title}</h2>}
            {description && <p className="mt-1 text-sm leading-6 text-[#64748B]">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: "blue" | "green" | "amber" | "rose" | "violet" | "slate";
};

const statToneMap = {
  blue: "bg-[#EAF3FF] text-[#2F80ED] ring-[#CFE3FF]",
  green: "bg-[#E8FFF9] text-[#27C3A2] ring-[#BEF4E7]",
  amber: "bg-[#FFF7E8] text-[#F59E0B] ring-[#FDE7B8]",
  rose: "bg-[#FFECEC] text-[#EF4444] ring-[#FBD0D0]",
  violet: "bg-[#F1EFFF] text-[#8B7CF6] ring-[#DDD7FF]",
  slate: "bg-[#F2F7FB] text-[#64748B] ring-[#E2E8F0]",
};

export function StatCard({ label, value, helper, icon, tone = "blue" }: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#64748B]">{label}</p>
          <p className="mt-3 text-3xl font-extrabold text-[#1E293B]">{value}</p>
        </div>
        {icon && (
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl ring-1", statToneMap[tone])}>
            {icon}
          </div>
        )}
      </div>
      {helper && <p className="mt-4 text-sm font-medium text-[#64748B]">{helper}</p>}
    </div>
  );
}

type StatusBadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "rose" | "violet" | "slate";
};

const badgeToneMap = {
  blue: "bg-[#EAF3FF] text-[#1C64D1] ring-[#CFE3FF]",
  green: "bg-[#E8FFF9] text-[#148E77] ring-[#BEF4E7]",
  amber: "bg-[#FFF7E8] text-[#C77805] ring-[#FDE7B8]",
  rose: "bg-[#FFECEC] text-[#D42D2D] ring-[#FBD0D0]",
  violet: "bg-[#F1EFFF] text-[#6D5FE5] ring-[#DDD7FF]",
  slate: "bg-[#F2F7FB] text-[#64748B] ring-[#E2E8F0]",
};

export function StatusBadge({ children, tone = "blue" }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1", badgeToneMap[tone])}>
      {children}
    </span>
  );
}

type ActionButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function ActionButton({ children, icon, variant = "primary", className, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition",
        variant === "primary" && "bg-[#2F80ED] text-white hover:bg-[#1C64D1]",
        variant === "secondary" && "border border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-[#F2F7FB]",
        variant === "ghost" && "text-[#64748B] hover:bg-[#F2F7FB] hover:text-[#1E293B]",
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}

type DataRowProps = {
  title: string;
  description?: string;
  meta?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  active?: boolean;
};

export function DataRow({ title, description, meta, icon, actions, active }: DataRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[18px] border p-4 transition sm:flex-row sm:items-center",
        active ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
      )}
    >
      {icon && <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">{icon}</div>}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-[#1E293B]">{title}</h3>
          {meta}
        </div>
        {description && <p className="mt-1 text-sm leading-6 text-[#64748B]">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
