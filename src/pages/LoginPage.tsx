import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Eye, EyeOff } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const DEFAULT_LOGINS = [
  { email: "admin@gmail.com", password: "TestPassword123!", role: "Admin", brand: "HR Bridge", brandInitials: "HB" },
  { email: "jillwagner@gmail.com", password: "TestPassword123!", role: "Team Leader", brand: "Team Bridge", brandInitials: "TB" },
  { email: "brian@gmal.com", password: "TestPassword123!", role: "Employee", brand: "Employee Bridge", brandInitials: "EB" },
];

type DemoAccount = {
  name: string;
  email: string;
  password: string;
  meta: string;
};

type DemoSection = {
  title: string;
  entries: DemoAccount[];
  accent: string;
};

const DEMO_SECTIONS: DemoSection[] = [
  {
    title: "Administrator",
    accent: "from-primary/25 to-primary/5",
    entries: [
      {
        name: "John Payton",
        email: "admin@gmail.com",
        password: "TestPassword123!",
        meta: "Global Admin",
      },
    ],
  },
  {
    title: "Team Leaders",
    accent: "from-indigo-300/70 via-indigo-400/50 to-indigo-200/60",
    entries: [
      {
        name: "Jill Wagner Joe",
        email: "jillwagner@gmail.com",
        password: "TestPassword123!",
        meta: "IT Department",
      },
      {
        name: "Fina Nicer",
        email: "teamlead.finance@hrms.com",
        password: "TestPassword123!",
        meta: "Finance Department",
      },
      {
        name: "Team Leader Sales",
        email: "teamlead.sales@hrms.com",
        password: "TestPassword123!",
        meta: "Sales Department",
      },
      {
        name: "Team Leader Customer-Service",
        email: "teamlead.customerservice@hrms.com",
        password: "TestPassword123!",
        meta: "Customer Service",
      },
    ],
  },
  {
    title: "Employees",
    accent: "from-indigo-300/70 via-indigo-400/50 to-indigo-200/60",
    entries: [
      {
        name: "Brian Joe",
        email: "brian@gmal.com",
        password: "TestPassword123!",
        meta: "IT Department",
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        password: "TestPassword123!",
        meta: "Finance Department",
      },
      {
        name: "Sales Employee",
        email: "employee.sales@hrms.com",
        password: "TestPassword123!",
        meta: "Sales Department",
      },
      {
        name: "Gary Jerry",
        email: "employee.customerservice@hrms.com",
        password: "TestPassword123!",
        meta: "Customer Service",
      },
    ],
  },
];

export default function LoginPage() {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [brandName, setBrandName] = useState("HR Bridge");
  const [brandInitials, setBrandInitials] = useState("HB");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoggingIn(true);
    try {
      const response = await login(data.email, data.password);
      if (response.success) {
        // First, check for a specific redirect from the location state
        const from = location.state?.from;
        
        // Next, check for a lastVisitedPath in localStorage
        const lastVisitedPath = localStorage.getItem('lastVisitedPath');
        
        // Finally, fall back to the redirect from the login response or the role-based default
        const redirectPath = from || lastVisitedPath || response.redirect || "/";
        
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePrefill = (
    email: string,
    password: string,
    brand?: string,
    initials?: string
  ) => {
    form.setValue("email", email, { shouldDirty: true, shouldValidate: true });
    form.setValue("password", password, { shouldDirty: true, shouldValidate: true });
    if (brand) {
      setBrandName(brand);
    }
    if (initials) {
      setBrandInitials(initials);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-y-10 left-1/2 h-[70%] w-[60%] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-emerald-200/40 to-fuchsia-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.15),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_45%)]" />
      </div>

      <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[40px] border border-white/40 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8 text-white shadow-[0_35px_120px_rgba(15,23,42,0.4)] lg:p-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Live Workspace
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            A bold new home for HR intelligence.
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Rich dashboards, fluid task flows, and immersive insights crafted to feel unique to your organization.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Roles</p>
              <p className="mt-2 text-3xl font-semibold">3</p>
              <p className="text-sm text-white/60">Admin + Leadership + Staff</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Tasks</p>
              <p className="mt-2 text-3xl font-semibold">50+</p>
              <p className="text-sm text-white/60">Workflow-ready modules</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Insight</p>
              <p className="mt-2 text-3xl font-semibold">Realtime</p>
              <p className="text-sm text-white/60">Glass dashboards</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Quick roles</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {DEFAULT_LOGINS.map((login) => (
                <button
                  key={login.role}
                  type="button"
                  onClick={() =>
                    handlePrefill(login.email, login.password, login.brand, login.brandInitials)
                  }
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 transition hover:border-white hover:bg-white/20"
                >
                  {login.role}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-panel relative rounded-[32px] border border-white/60 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.18)] dark:border-white/10 lg:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-400 text-lg font-semibold text-white shadow-lg">
                {brandInitials}
              </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Login</p>
                  <h2 className="section-title text-2xl font-semibold">{brandName}</h2>
                </div>
            </div>
            <ThemeToggle />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@company.com"
                        className="h-12 rounded-2xl border border-white/50 bg-white/80 px-4 text-base shadow-inner focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-white/10 dark:bg-white/5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 rounded-2xl border border-white/50 bg-white/80 px-4 text-base shadow-inner focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-white/10 dark:bg-white/5"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/60 px-3 text-muted-foreground hover:bg-white/80 dark:bg-white/10 dark:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-primary via-violet-500 to-emerald-400 py-3 text-base font-semibold text-white shadow-xl transition hover:scale-[1.01]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Demo Accounts</p>
            <div className="grid gap-4">
              {DEMO_SECTIONS.map((section) => (
                <div
                  key={section.title}
                  className={cn(
                    "rounded-2xl border border-white/40 p-4 shadow-sm dark:border-white/10",
                    `bg-gradient-to-br ${section.accent}`
                  )}
                >
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                  <div className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                    {section.entries.map((entry) => (
                      <button
                        key={entry.email}
                        type="button"
                        onClick={() => handlePrefill(entry.email, entry.password)}
                        className="w-full text-left"
                      >
                        <p className="font-medium">{entry.name}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                          {entry.meta}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-200">
                          {entry.email} · {entry.password}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
