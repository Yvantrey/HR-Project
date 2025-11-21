import { useState, useEffect } from "react";
import { Bell, ChevronDown, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppContext } from "@/context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/types";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { currentUser, notifications, markNotificationAsRead, logout, fetchNotifications, notificationsLoading } = useAppContext();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  if (!currentUser) return null;

  const unreadNotifications = notifications.filter(
    (notification) => notification.userId === currentUser.id && !notification.isRead
  );

  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Fetch notifications when popover is opened
  const handleNotificationsOpenChange = (open: boolean) => {
    setIsNotificationsOpen(open);
    if (open) {
      fetchNotifications();
    }
  };

  return (
    <header className="relative border-b border-white/30 bg-white/70 px-6 py-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/5 dark:bg-slate-950/50">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="rounded-2xl border border-white/40 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Workspace</p>
            <h1 className="section-title text-2xl font-semibold text-slate-900 dark:text-white">
              Capability Command Deck
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Welcome back, {currentUser.name.split(" ")[0]} — keep teams inspired today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Popover open={isNotificationsOpen} onOpenChange={handleNotificationsOpenChange}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-2xl border border-white/40 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/10"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                      <span className="m-auto">{unreadNotifications.length}</span>
                    </span>
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-2xl border border-border bg-card/80 p-0 backdrop-blur-xl dark:bg-card/40" align="end">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div>
                  <h3 className="section-title text-base font-semibold">Notifications</h3>
                  <p className="text-xs text-muted-foreground">Stay synced with team updates</p>
                </div>
                {unreadNotifications.length > 0 && (
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    {unreadNotifications.length} new
                  </Badge>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationsLoading ? (
                  <div className="p-4 text-center text-muted-foreground">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No notifications</div>
                ) : (
                  notifications
                    .sort((a, b) => (b.createdAt?.getTime?.() || 0) - (a.createdAt?.getTime?.() || 0))
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "cursor-pointer border-b border-border/60 px-4 py-3 transition hover:bg-muted/40 last:border-b-0",
                          !notification.isRead && "bg-primary/5"
                        )}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {notification.createdAt ? notification.createdAt.toLocaleDateString() : ""}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/80 px-3 py-2 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={currentUser.profileImage} />
                  <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:flex sm:flex-col">
                  <span className="text-sm font-semibold leading-tight">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground">{currentUser.role}</span>
                </div>
                <ChevronDown className="hidden h-4 w-4 opacity-60 sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-2xl border border-border bg-card/80 p-2 backdrop-blur-xl">
              <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="rounded-xl text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-inner dark:border-white/5 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Role</p>
          <p className="mt-2 text-lg font-semibold">{currentUser.role}</p>
          <p className="text-xs text-muted-foreground">Access tailored insights</p>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-inner dark:border-white/5 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Focus</p>
          <p className="mt-2 text-lg font-semibold">Strategize</p>
          <p className="text-xs text-muted-foreground">Review performance updates</p>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-emerald-400/20 p-4 text-slate-900 shadow-inner dark:border-white/5 dark:text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Pulse</p>
          <p className="mt-2 text-lg font-semibold">Live</p>
          <p className="text-xs text-slate-600 dark:text-slate-200">System running smoothly</p>
        </div>
      </div>
    </header>
  );
}
