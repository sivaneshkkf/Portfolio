// Extra presentation metadata for ProjectData.jsx entries, keyed by project name.
// Kept separate so ProjectData.jsx (the source of truth for links/techs/images)
// stays untouched. Only includes claims that are actually true/derivable from
// each project's existing description — no invented dates, durations, or
// features a project doesn't actually have.
export const projectsMeta = {
  PhotoPix: {
    tagline: "Modern photo editing platform with real-time image adjustments.",
    category: "Frontend",
    status: "Featured",
    featured: true,
    metadata: ["Responsive", "Fast Performance"],
  },
  "Music Player": {
    tagline: "Smooth, responsive music playback experience.",
    category: "Frontend",
    status: "Completed",
    metadata: ["Responsive", "Fast Performance"],
  },
  "Giveaway Form": {
    tagline: "User-friendly giveaway entry form with a cloud backend.",
    category: "Frontend",
    status: "Completed",
    metadata: ["Responsive", "Cloud Ready"],
  },
  Calculator: {
    tagline: "Sleek, fast calculator for everyday quick math.",
    category: "Frontend",
    status: "Completed",
    metadata: ["Responsive", "Fast Performance"],
  },
};
