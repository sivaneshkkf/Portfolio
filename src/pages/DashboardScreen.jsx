import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import {
  UseFetchCollection,
  AddPreDashboardDetails,
} from "../firebase/config";
import {
  DashBoardContext,
  DashBoardDataContext,
} from "../context/DashBoardContext";
import { Theme } from "../context/HeadingContext";
import ThemeBtn from "../components/ThemeBtn";
import {
  bucketByDay,
  normalizeLocation,
  getSeenMessageIds,
  SEEN_MESSAGES_KEY,
} from "../utils/dashboardHelpers";
import KpiCard from "../components/dashboard/KpiCard";
import ChartCard from "../components/dashboard/ChartCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import VisitorTable from "../components/dashboard/VisitorTable";
import MessagesPanel from "../components/dashboard/MessagesPanel";
import FeedbackPanel from "../components/dashboard/FeedbackPanel";
import DashboardSidebar, {
  DASHBOARD_NAV_ITEMS,
} from "../components/dashboard/DashboardSidebar";

import VisibilityIcon from "@mui/icons-material/Visibility";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ForumIcon from "@mui/icons-material/Forum";
import GetAppIcon from "@mui/icons-material/GetApp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const ENGAGEMENT_COLORS = ["#3B82F6", "#22C55E", "#06B6D4", "#8B5CF6"];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-hero-bg2/95">
      <p className="mb-1 font-semibold text-textHead dark:text-hero-text">
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

function DashboardScreen() {
  const { setDashboardOpen } = useContext(DashBoardContext);
  const { dashboardData } = useContext(DashBoardDataContext);
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";
  const axisColor = isDark ? "#94A3B8" : "#64748B";
  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const [activeSection, setActiveSection] = useState("overview");
  const [refreshPulse, setRefreshPulse] = useState(false);
  const [seenIds, setSeenIds] = useState(() => getSeenMessageIds());

  function markMessageSeen(id) {
    setSeenIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem(SEEN_MESSAGES_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  }

  const dashboardDetails = UseFetchCollection("dashboard");
  const preDashboardDetails = UseFetchCollection("dashboardPreData");
  const feedback = UseFetchCollection("feedback");
  const messages = UseFetchCollection("messages");
  const locations = UseFetchCollection("locations");

  const { whatsapp = 0, url = 0, views = 0, downloads = 0 } =
    dashboardDetails[0] || {};
  const preData = preDashboardDetails[0] || {};

  // Persist the current snapshot as "previous" data whenever the dashboard
  // is opened/closed, so the KPI delta badges reflect "since last visit".
  useEffect(() => {
    if (dashboardData) {
      AddPreDashboardDetails(dashboardData)
        .then((docRef) => {
          console.log("DashBordPreData successfully submitted with ID:", docRef.id);
        })
        .catch((e) => {
          console.error("Failed to send feedback:", e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageTrend = useMemo(() => bucketByDay(messages, 14), [messages]);
  const feedbackTrend = useMemo(() => bucketByDay(feedback, 14), [feedback]);
  const visitorTrend = useMemo(() => bucketByDay(locations, 14), [locations]);

  const engagementTrend = useMemo(
    () =>
      messageTrend.map((m, i) => ({
        label: m.label,
        Messages: m.count,
        Feedback: feedbackTrend[i]?.count || 0,
      })),
    [messageTrend, feedbackTrend]
  );

  const visitorChartData = useMemo(
    () => visitorTrend.map((v) => ({ label: v.label, Visitors: v.count })),
    [visitorTrend]
  );

  const engagementBreakdown = useMemo(
    () =>
      [
        { name: "Views", value: views },
        { name: "WhatsApp", value: whatsapp },
        { name: "URL Shares", value: url },
        { name: "Downloads", value: downloads },
      ].filter((d) => d.value > 0),
    [views, whatsapp, url, downloads]
  );

  const topCountries = useMemo(() => {
    const counts = {};
    locations.forEach((l) => {
      const c = normalizeLocation(l).country;
      if (!c) return;
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [locations]);

  const unreadCount = useMemo(
    () => messages.filter((m) => !seenIds.has(m.id)).length,
    [messages, seenIds]
  );

  const kpis = [
    {
      key: "views",
      label: "Portfolio Views",
      value: views,
      delta: views - (preData.views || 0),
      icon: <VisibilityIcon fontSize="small" />,
      color: "blue",
    },
    {
      key: "whatsapp",
      label: "WhatsApp Shares",
      value: whatsapp,
      delta: whatsapp - (preData.whatsapp || 0),
      icon: <WhatsAppIcon fontSize="small" />,
      color: "green",
    },
    {
      key: "messages",
      label: "Messages",
      value: messages.length,
      trend: messageTrend,
      icon: <MailOutlineIcon fontSize="small" />,
      color: "purple",
    },
    {
      key: "url",
      label: "URL Shares",
      value: url,
      delta: url - (preData.url || 0),
      icon: <LinkIcon fontSize="small" />,
      color: "cyan",
    },
    {
      key: "feedback",
      label: "Feedback",
      value: feedback.length,
      trend: feedbackTrend,
      icon: <ForumIcon fontSize="small" />,
      color: "pink",
    },
    {
      key: "downloads",
      label: "Resume Downloads",
      value: downloads,
      delta: downloads - (preData.downloads || 0),
      icon: <GetAppIcon fontSize="small" />,
      color: "amber",
    },
    {
      key: "visitors",
      label: "Visitors Tracked",
      value: locations.length,
      trend: visitorTrend,
      icon: <PeopleAltIcon fontSize="small" />,
      color: "teal",
    },
  ];

  const navCounts = {
    visitors: locations.length,
    messages: messages.length,
    feedback: feedback.length,
  };

  function handleRefresh() {
    setRefreshPulse(true);
    setTimeout(() => setRefreshPulse(false), 700);
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-primary font-manrope dark:bg-hero-bg">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary dark:bg-gradient-to-b dark:from-[#020617] dark:via-hero-bg dark:to-hero-bg2"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-hero-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-hero-secondary/10 blur-[120px]"></div>
      </div>

      {/* top navbar */}
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-white/60 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-hero-bg2/60 sm:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-manrope text-xl font-extrabold text-textHead dark:text-hero-text sm:text-2xl">
              Portfolio Analytics Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hero-success/30 bg-hero-success/10 px-2.5 py-1 text-[11px] font-semibold text-hero-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hero-success opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-hero-success"></span>
              </span>
              Live
            </span>
          </div>
          <p className="mt-1 text-xs text-textpara dark:text-hero-muted sm:text-sm">
            Real-time visitor insights and engagement metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium text-textpara dark:border-white/10 dark:bg-white/5 dark:text-hero-muted md:flex">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            {today}
          </span>

          <button
            type="button"
            onClick={handleRefresh}
            aria-label="Refresh"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-textpara transition-colors duration-300 hover:text-textHead dark:border-white/10 dark:bg-white/5 dark:text-hero-muted dark:hover:text-hero-text"
          >
            <motion.span
              animate={refreshPulse ? { rotate: 360 } : {}}
              transition={{ duration: 0.7 }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </motion.span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("messages")}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-textpara transition-colors duration-300 hover:text-textHead dark:border-white/10 dark:bg-white/5 dark:text-hero-muted dark:hover:text-hero-text"
          >
            <NotificationsNoneIcon sx={{ fontSize: 18 }} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-hero-primary px-1 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-hero-primary to-hero-secondary text-xs font-extrabold text-white">
            S
          </span>

          <button
            type="button"
            onClick={() => setDashboardOpen(false)}
            aria-label="Close dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-textpara transition-colors duration-300 hover:border-red-400/40 hover:text-red-400 dark:border-white/10 dark:bg-white/5 dark:text-hero-muted"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </header>

      {/* mobile section tabs */}
      <div className="hidden-scrollbar flex shrink-0 gap-2 overflow-x-auto border-b border-black/5 bg-white/40 px-5 py-3 dark:border-white/10 dark:bg-hero-bg2/40 lg:hidden">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveSection(item.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                isActive
                  ? "border-transparent bg-gradient-to-r from-hero-primary to-hero-secondary text-white"
                  : "border-black/10 bg-black/5 text-textpara dark:border-white/10 dark:bg-white/5 dark:text-hero-muted"
              }`}
            >
              <Icon sx={{ fontSize: 14 }} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-black/5 bg-white p-4 dark:border-white/10 dark:bg-hero-bg2 lg:block">
          <DashboardSidebar
            active={activeSection}
            onChange={setActiveSection}
            counts={navCounts}
          />
        </aside>

        {/* main content */}
        <main className="hidden-scrollbar min-h-0 flex-1 overflow-y-auto bg-primary px-5 py-6 dark:bg-transparent sm:px-8 sm:py-8">
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {kpis.map(({ key, ...kpi }, index) => (
                  <KpiCard key={key} {...kpi} delay={index * 0.05} />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                  <ChartCard
                    title="Messages &amp; Feedback"
                    subtitle="Submissions over the last 14 days"
                  >
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={engagementTrend}>
                          <defs>
                            <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="fbGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke={gridColor} vertical={false} />
                          <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                          <RechartsTooltip content={<ChartTooltip />} />
                          <Legend wrapperStyle={{ fontSize: 11, color: axisColor }} />
                          <Area type="monotone" dataKey="Messages" stroke="#3B82F6" strokeWidth={2} fill="url(#msgGrad)" />
                          <Area type="monotone" dataKey="Feedback" stroke="#8B5CF6" strokeWidth={2} fill="url(#fbGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <ChartCard title="Visitors" subtitle="New visitors per day" delay={0.05}>
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={visitorChartData}>
                            <CartesianGrid stroke={gridColor} vertical={false} />
                            <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                            <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={24} />
                            <RechartsTooltip content={<ChartTooltip />} />
                            <Bar dataKey="Visitors" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </ChartCard>

                    <ChartCard title="Engagement Mix" subtitle="Share of total engagement" delay={0.1}>
                      {engagementBreakdown.length === 0 ? (
                        <p className="flex h-56 items-center justify-center text-xs text-textpara dark:text-hero-muted">
                          No engagement data yet
                        </p>
                      ) : (
                        <div className="h-56">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={engagementBreakdown}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={3}
                              >
                                {engagementBreakdown.map((entry, i) => (
                                  <Cell key={entry.name} fill={ENGAGEMENT_COLORS[i % ENGAGEMENT_COLORS.length]} stroke="none" />
                                ))}
                              </Pie>
                              <RechartsTooltip content={<ChartTooltip />} />
                              <Legend wrapperStyle={{ fontSize: 10, color: axisColor }} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </ChartCard>
                  </div>

                  <ChartCard title="Top Countries" subtitle="Visitors by country" delay={0.15}>
                    {topCountries.length === 0 ? (
                      <p className="flex h-40 items-center justify-center text-xs text-textpara dark:text-hero-muted">
                        No visitor data yet
                      </p>
                    ) : (
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={topCountries} layout="vertical" margin={{ left: 12 }}>
                            <CartesianGrid stroke={gridColor} horizontal={false} />
                            <XAxis type="number" allowDecimals={false} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="country" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                            <RechartsTooltip content={<ChartTooltip />} />
                            <Bar dataKey="count" name="Visitors" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </ChartCard>
                </div>

                <div className="xl:col-span-1">
                  <ActivityTimeline />
                </div>
              </div>
            </div>
          )}

          {activeSection === "visitors" && <VisitorTable />}
          {activeSection === "messages" && (
            <MessagesPanel seenIds={seenIds} onMarkSeen={markMessageSeen} />
          )}
          {activeSection === "feedback" && <FeedbackPanel />}
        </main>
      </div>

      <ThemeBtn />
    </div>
  );
}

export default DashboardScreen;
