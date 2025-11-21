import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Users, 
  FileText, 
  BookOpen, 
  Bell, 
  Settings,
  LogOut,
  Mail,
  BarChart,
  Briefcase,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const { currentUser, logout } = useAppContext();

  if (!currentUser) return null;

  const roleBranding = {
    Admin: {
      badge: "HB",
      title: "HR Bridge",
      tagline: "Control Center",
      message: "Design new experiences for your teams today.",
    },
    TeamLeader: {
      badge: "TB",
      title: "Team Bridge",
      tagline: "Team Command",
      message: "Lead with clarity and empower your department.",
    },
    Employee: {
      badge: "EB",
      title: "Employee Bridge",
      tagline: "Control Center",
      message: "Shape your growth with focused deliverables.",
    },
  } as const;

  const branding =
    roleBranding[currentUser.role as keyof typeof roleBranding] ??
    roleBranding.Employee;

  const adminLinks = [
    { icon: Home, label: "Dashboard", to: "/admin" },
    { icon: Users, label: "Employees", to: "/admin/employees" },
    { icon: Users, label: "Team Leaders", to: "/admin/team-leaders" },
    { icon: BarChart, label: "Progress", to: "/admin/progress" },
    { icon: Briefcase, label: "Job Applications", to: "/admin/job-applications" },
    { icon: CalendarCheck, label: "Leave Requests", to: "/admin/leave-requests" },
    { icon: Bell, label: "Notifications", to: "/admin/notifications" },
    { icon: Mail, label: "Email", to: "/admin/email" }, 
    { icon: Settings, label: "Settings", to: "/admin/settings" }
  ];

  const teamLeaderLinks = [
    { icon: Home, label: "Dashboard", to: "/team-leader" },
    { icon: FileText, label: "Tasks", to: "/team-leader/tasks" },
    { icon: Users, label: "Employees", to: "/team-leader/employees" },
    // { icon: Mail, label: "Email", to: "/team-leader/email" },
    { icon: Settings, label: "Settings", to: "/team-leader/settings" },
    { icon: BookOpen, label: "Course Quizzes", to: "/team-leader/courses" }
  ];

  const employeeLinks = [
    { icon: Home, label: "Dashboard", to: "/employee" },
    { icon: FileText, label: "Tasks", to: "/employee/tasks" },
    { icon: BookOpen, label: "Courses", to: "/employee/courses" },
    { icon: Briefcase, label: "Apply for Job", to: "/employee/job-apply" },
    { icon: CalendarCheck, label: "Request Leave", to: "/employee/leave-request" },
    // { icon: Mail, label: "Email", to: "/employee/email" },
    { icon: Settings, label: "Settings", to: "/employee/settings" },
    { icon: FileText, label: "My Quizzes", to: "/employee/quizzes" }
  ];

  let links;
  switch (currentUser.role) {
    case "Admin":
      links = adminLinks;
      break;
    case "TeamLeader":
      links = teamLeaderLinks;
      break;
    case "Employee":
      links = employeeLinks;
      break;
    default:
      links = [];
  }

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col overflow-hidden border-r border-white/30 dark:border-white/10 transition-all duration-500",
        collapsed ? "w-20 px-2 py-5" : "w-72 px-5 py-8"
      )}
    >
      <div className="pointer-events-none absolute inset-3 rounded-[28px] bg-gradient-to-b from-white/80 via-white/45 to-white/20 opacity-90 blur-xl dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40" />
      <div className="relative flex h-full flex-col rounded-[24px] border border-white/40 bg-white/70 px-3 py-4 shadow-[0_25px_80px_rgba(15,23,42,0.15)] backdrop-blur-3xl dark:border-white/5 dark:bg-slate-950/60">
        <div className={cn("flex items-center gap-3 rounded-2xl border border-white/40 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5", collapsed && "flex-col justify-center text-center")}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-violet-500 to-emerald-400 text-lg font-semibold text-white shadow-xl">
            {branding.badge}
          </div>
          {!collapsed && (
            <div>
              <p className="section-title text-lg font-semibold text-slate-900 dark:text-slate-100">
                {branding.title}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                {branding.tagline}
              </p>
            </div>
          )}
        </div>

        <Separator className="my-5 border-white/30 dark:border-white/10" />

        {!collapsed && (
          <div className="mb-4 rounded-2xl border border-white/20 bg-gradient-to-br from-primary/90 via-violet-600/80 to-emerald-500/70 p-4 text-white shadow-xl">
            <p className="text-xs uppercase tracking-widest text-white/80">Signed in as</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">{currentUser.name}</p>
            <p className="text-sm text-white/80">{currentUser.role}</p>
            <p className="mt-3 text-xs text-white/70">{branding.message}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pb-6">
          <nav className={cn("space-y-2", collapsed ? "px-1" : "px-1.5")}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center gap-3 rounded-2xl border border-transparent px-2 py-2 text-sm font-medium tracking-tight transition-all duration-200",
                    collapsed ? "justify-center" : "pl-3",
                    isActive
                      ? "bg-gradient-to-r from-primary/90 via-violet-500/80 to-emerald-400/80 text-white shadow-lg"
                      : "text-slate-600 hover:border-white/50 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  )
                }
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/60 text-primary shadow-sm transition-all duration-200 dark:border-white/5 dark:bg-white/10 dark:text-white",
                    collapsed && "h-11 w-11 rounded-3xl"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                </span>
                {!collapsed && <span className="truncate">{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto rounded-2xl border border-white/30 bg-white/70 p-3 shadow-inner dark:border-white/5 dark:bg-white/5">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-center rounded-xl bg-gradient-to-r from-slate-900/90 to-slate-800/90 text-white shadow-lg hover:opacity-90 dark:from-white/20 dark:to-white/10",
              collapsed ? "py-5" : "py-6"
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3 font-semibold">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
