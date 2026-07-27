import { Fragment, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UseFetchCollection } from "../../firebase/config";
import {
  normalizeLocation,
  countryCodeToFlag,
  relativeTime,
  exportToCsv,
  toDate,
} from "../../utils/dashboardHelpers";
import ChartCard from "./ChartCard";
import EmptyState from "./EmptyState";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DevicesIcon from "@mui/icons-material/Devices";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const PAGE_SIZE = 8;

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/5 py-2 last:border-0 dark:border-white/5">
      <span className="text-xs font-medium text-textpara dark:text-hero-muted">
        {label}
      </span>
      <span className="max-w-[60%] truncate text-right text-xs font-semibold text-textHead dark:text-hero-text">
        {value || "—"}
      </span>
    </div>
  );
}

function VisitorDetail({ loc }) {
  const info = normalizeLocation(loc);
  return (
    <div className="grid gap-4 px-4 pb-5 pt-1 sm:grid-cols-2 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hero-primary">
          <MyLocationIcon sx={{ fontSize: 14 }} /> Location
        </p>
        <DetailRow label="Country" value={info.country} />
        <DetailRow label="State / Region" value={info.state} />
        <DetailRow label="City" value={info.city} />
        <DetailRow
          label="Coordinates"
          value={
            info.lat && info.lon
              ? `${Number(info.lat).toFixed(3)}, ${Number(info.lon).toFixed(3)}`
              : null
          }
        />
      </div>
      <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-hero-secondary">
          <DevicesIcon sx={{ fontSize: 14 }} /> Device &amp; Meta
        </p>
        <DetailRow label="Browser" value={info.browser} />
        <DetailRow label="Device" value={info.device} />
        <DetailRow label="Timezone" value={info.timezone} />
        <DetailRow label="IP Address" value={info.ip} />
        <DetailRow
          label="Visited At"
          value={toDate(loc.createdAt)?.toLocaleString()}
        />
      </div>
    </div>
  );
}

function VisitorTable() {
  const locations = UseFetchCollection("locations");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const countries = useMemo(() => {
    const set = new Set();
    locations.forEach((l) => {
      const c = normalizeLocation(l).country;
      if (c) set.add(c);
    });
    return Array.from(set).sort();
  }, [locations]);

  const filtered = useMemo(() => {
    let rows = locations.map((l) => ({ ...l, _info: normalizeLocation(l) }));

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((l) =>
        [l._info.country, l._info.state, l._info.city].some((v) =>
          v?.toLowerCase().includes(q)
        )
      );
    }

    if (country !== "all") {
      rows = rows.filter((l) => l._info.country === country);
    }

    rows.sort((a, b) => {
      const da = toDate(a.createdAt)?.getTime() || 0;
      const db = toDate(b.createdAt)?.getTime() || 0;
      return sortDir === "desc" ? db - da : da - db;
    });

    return rows;
  }, [locations, search, country, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleExport() {
    exportToCsv(
      "visitors.csv",
      filtered.map((l) => ({
        country: l._info.country,
        state: l._info.state,
        city: l._info.city,
        browser: l._info.browser,
        device: l._info.device,
        ip: l._info.ip,
        visitedAt: toDate(l.createdAt)?.toISOString(),
      }))
    );
  }

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }

  return (
    <ChartCard
      title="Visitor Locations"
      subtitle={`${filtered.length} visitor${
        filtered.length === 1 ? "" : "s"
      } tracked · live via Firestore`}
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold text-textpara transition-colors duration-300 hover:text-textHead dark:border-white/10 dark:bg-white/5 dark:text-hero-muted dark:hover:text-hero-text"
          >
            <FileDownloadIcon sx={{ fontSize: 15 }} /> Export
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            aria-label="Refresh"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-textpara transition-colors duration-300 hover:text-textHead dark:border-white/10 dark:bg-white/5 dark:text-hero-muted dark:hover:text-hero-text"
          >
            <motion.span
              animate={refreshing ? { rotate: 360 } : {}}
              transition={{ duration: 0.7 }}
            >
              <RefreshIcon sx={{ fontSize: 16 }} />
            </motion.span>
          </button>
        </div>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[180px] flex-1">
          <SearchIcon
            sx={{ fontSize: 16 }}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textpara dark:text-hero-muted"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search country, state, city..."
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] py-2 pl-9 pr-3 text-xs text-textHead outline-none transition-all duration-300 placeholder:text-textpara/60 focus:border-hero-primary focus:ring-2 focus:ring-hero-primary/25 dark:border-white/10 dark:bg-white/5 dark:text-hero-text dark:placeholder:text-hero-muted/60"
          />
        </div>
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs text-textHead outline-none focus:border-hero-primary dark:border-white/10 dark:bg-white/5 dark:text-hero-text"
        >
          <option value="all">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
          className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs text-textHead outline-none focus:border-hero-primary dark:border-white/10 dark:bg-white/5 dark:text-hero-text"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<PublicIcon />}
          title="No visitors yet"
          description="Visitor locations will appear here as people browse your portfolio."
        />
      ) : (
        <>
          <div className="hidden-scrollbar overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-black/[0.03] backdrop-blur-md dark:bg-white/[0.04]">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-textpara dark:text-hero-muted">
                    Location
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-textpara dark:text-hero-muted sm:table-cell">
                    Device
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-textpara dark:text-hero-muted">
                    Visited
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((loc, idx) => {
                  const info = loc._info;
                  const flag = countryCodeToFlag(info.countryCode);
                  const isOpen = expandedId === loc.id;
                  return (
                    <Fragment key={loc.id}>
                      <tr
                        onClick={() => setExpandedId(isOpen ? null : loc.id)}
                        className={`cursor-pointer border-t border-black/5 transition-colors duration-200 hover:bg-black/[0.02] dark:border-white/5 dark:hover:bg-white/5 ${
                          idx % 2 === 0 ? "bg-black/[0.01] dark:bg-white/[0.015]" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{flag || "🌐"}</span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-textHead dark:text-hero-text">
                                {info.city || info.state || "Unknown city"}
                              </p>
                              <p className="truncate text-xs text-textpara dark:text-hero-muted">
                                {info.country || "Unknown country"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span className="text-xs text-textpara dark:text-hero-muted">
                            {info.device || "—"} · {info.browser || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-textpara dark:text-hero-muted">
                          {relativeTime(loc.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className="inline-flex text-textpara dark:text-hero-muted"
                          >
                            <ExpandMoreIcon sx={{ fontSize: 18 }} />
                          </motion.span>
                        </td>
                      </tr>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <tr>
                            <td colSpan={4} className="p-0">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden bg-black/[0.01] dark:bg-white/[0.02]"
                              >
                                <VisitorDetail loc={loc} />
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-textpara dark:text-hero-muted">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-textpara hover:text-textHead disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-hero-muted dark:hover:text-hero-text"
                >
                  <ChevronLeftIcon sx={{ fontSize: 18 }} />
                </button>
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-textpara hover:text-textHead disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-hero-muted dark:hover:text-hero-text"
                >
                  <ChevronRightIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </ChartCard>
  );
}

export default VisitorTable;
