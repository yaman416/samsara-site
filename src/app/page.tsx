"use client";
import React, { useMemo, useRef, useState } from "react";

/* =======================
   Brand & Company
======================= */
const BRAND = {
  name: "Samsara Group Canberra",
  primary: "#155ECA",
  accent: "#155ECA",
  logoLight: "/samsara-logo-light.png",
  logoDark: "/samsara-logo-dark.png",
  splLogo: "/spl-logo.png"
};

const COMPANY = {
  name: BRAND.name,
  tagline: "Fostering Community, Empowering Growth",
  about:
    "Samsara Group Canberra builds connections, promotes culture, and empowers multicultural communities in Canberra, especially non-Australian residents, while collaborating with all communities.",
  location: "Canberra, Australia",
  email: "samsaragroup.cbr@gmail.com",
  phone: "+61449981624",
  website: "https://www.samsaragroup.com.au",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61566789173985"
  }
};

/* =======================
   Data Types
======================= */
type Fixture = {
  date: string;
  time: string;
  ground: string;
  home: string;
  away: string;
  stage?: string;
  note?: string;
};

type Club = {
  name: string;
  short?: string;
  founded?: string;
  manager?: string;
  homeGround?: string;
  about?: string;
  logo?: string;
  facebook?: string;
};

type Sponsor = {
  name: string;
  tier: "Title Sponsor" | "Platinum Sponsor" | "Silver Sponsor";
  url?: string;
  logo?: string;
  blurb?: string;
};

/* =======================
   Full Fixtures
======================= */
const FIXTURES: Fixture[] = [
  // Week 1
  { date: "2025-11-15", time: "15:30", ground: "Ground 1", home: "Nepal United FC", away: "Druk FC" },
  { date: "2025-11-15", time: "15:30", ground: "Ground 2", home: "Thuenlam FC", away: "CNFC Canberra" },
  { date: "2025-11-15", time: "17:00", ground: "Ground 1", home: "Everest FC", away: "Khukuri Canberra FC" },
  { date: "2025-11-15", time: "17:00", ground: "Ground 2", home: "Azhas FC", away: "Unity Stars FC" },
  { date: "2025-11-15", time: "18:30", ground: "Ground 1", home: "Achos Football Team", away: "Phuensum FC" },
  { date: "2025-11-15", time: "18:30", ground: "Ground 2", home: "JA Brothers Football Club", away: "Queanbeyan Nepalese United Football Club" },

  // Week 2
  { date: "2025-11-22", time: "15:30", ground: "Ground 1", home: "Everest FC", away: "Phuensum FC" },
  { date: "2025-11-22", time: "15:30", ground: "Ground 2", home: "Druk FC", away: "Khukuri Canberra FC" },
  { date: "2025-11-22", time: "17:00", ground: "Ground 1", home: "Thuenlam FC", away: "Unity Stars FC" },
  { date: "2025-11-22", time: "17:00", ground: "Ground 2", home: "Achos Football Team", away: "JA Brothers Football Club" },
  { date: "2025-11-22", time: "18:30", ground: "Ground 1", home: "Azhas FC", away: "Queanbeyan Nepalese United Football Club" },
  { date: "2025-11-22", time: "18:30", ground: "Ground 2", home: "Nepal United FC", away: "CNFC Canberra" },

  // Week 3
  { date: "2025-11-29", time: "15:30", ground: "Ground 1", home: "Everest FC", away: "JA Brothers Football Club" },
  { date: "2025-11-29", time: "15:30", ground: "Ground 2", home: "CNFC Canberra", away: "Unity Stars FC" },
  { date: "2025-11-29", time: "17:00", ground: "Ground 1", home: "Druk FC", away: "Phuensum FC" },
  { date: "2025-11-29", time: "17:00", ground: "Ground 2", home: "Thuenlam FC", away: "Queanbeyan Nepalese United Football Club" },
  { date: "2025-11-29", time: "18:30", ground: "Ground 1", home: "Nepal United FC", away: "Khukuri Canberra FC" },
  { date: "2025-11-29", time: "18:30", ground: "Ground 2", home: "Azhas FC", away: "Thuenlam FC" },

  // Week 4
  { date: "2025-12-06", time: "15:30", ground: "Ground 1", home: "CNFC Canberra", away: "Druk FC" },
  { date: "2025-12-06", time: "15:30", ground: "Ground 2", home: "Phuensum FC", away: "Unity Stars FC" },
  { date: "2025-12-06", time: "17:00", ground: "Ground 1", home: "Khukuri Canberra FC", away: "Thuenlam FC" },
  { date: "2025-12-06", time: "17:00", ground: "Ground 2", home: "Everest FC", away: "Achos Football Team" },
  { date: "2025-12-06", time: "18:30", ground: "Ground 1", home: "JA Brothers Football Club", away: "Azhas FC" },
  { date: "2025-12-06", time: "18:30", ground: "Ground 2", home: "Queanbeyan Nepalese United Football Club", away: "Nepal United FC" },

  // Week 5
  { date: "2025-12-13", time: "15:30", ground: "Ground 1", home: "Druk FC", away: "Everest FC" },
  { date: "2025-12-13", time: "15:30", ground: "Ground 2", home: "Phuensum FC", away: "JA Brothers Football Club" },
  { date: "2025-12-13", time: "17:00", ground: "Ground 1", home: "Khukuri Canberra FC", away: "Achos Football Team" },
  { date: "2025-12-13", time: "17:00", ground: "Ground 2", home: "Thuenlam FC", away: "Azhas FC" },
  { date: "2025-12-13", time: "18:30", ground: "Ground 1", home: "Nepal United FC", away: "Unity Stars FC" },
  { date: "2025-12-13", time: "18:30", ground: "Ground 2", home: "CNFC Canberra", away: "Queanbeyan Nepalese United Football Club" },

  // Week 6
  { date: "2026-01-10", time: "15:30", ground: "Ground 1", home: "Phuensum FC", away: "Azhas FC" },
  { date: "2026-01-10", time: "15:30", ground: "Ground 2", home: "Khukuri Canberra FC", away: "Thuenlam FC" },
  { date: "2026-01-10", time: "17:00", ground: "Ground 1", home: "CNFC Canberra", away: "Druk FC" },
  { date: "2026-01-10", time: "17:00", ground: "Ground 2", home: "Unity Stars FC", away: "Everest FC" },
  { date: "2026-01-10", time: "18:30", ground: "Ground 1", home: "Queanbeyan Nepalese United Football Club", away: "Achos Football Team" },
  { date: "2026-01-10", time: "18:30", ground: "Ground 2", home: "Nepal United FC", away: "JA Brothers Football Club" },

  // Week 7
  { date: "2026-01-17", time: "15:30", ground: "Ground 1", home: "Thuenlam FC", away: "Everest FC" },
  { date: "2026-01-17", time: "15:30", ground: "Ground 2", home: "Druk FC", away: "Unity Stars FC" },
  { date: "2026-01-17", time: "17:00", ground: "Ground 1", home: "Nepal United FC", away: "Phuensum FC" },
  { date: "2026-01-17", time: "17:00", ground: "Ground 2", home: "CNFC Canberra", away: "JA Brothers Football Club" },
  { date: "2026-01-17", time: "18:30", ground: "Ground 1", home: "Khukuri Canberra FC", away: "Achos Football Team" },
  { date: "2026-01-17", time: "18:30", ground: "Ground 2", home: "Azhas FC", away: "Queanbeyan Nepalese United Football Club" },

  // Semi Finals
  { date: "2026-02-21", time: "17:00", ground: "Ground 1", home: "League 1st", away: "League 4th", stage: "Semi Final 1" },
  { date: "2026-02-21", time: "18:30", ground: "Ground 1", home: "League 2nd", away: "League 3rd", stage: "Semi Final 2" },

  // Final
  { date: "2026-02-28", time: "17:00", ground: "Ground 1", home: "Winner Semi Final 1", away: "Winner Semi Final 2", stage: "Final" }
];

/* =======================
   Clubs and Sponsors
======================= */
const CLUBS: Club[] = [
  { name: "Khukuri Canberra FC", founded: "2017", homeGround: "Nicholls Synthetic", about: "Community-driven club." },
  { name: "Phuensum FC", founded: "2016", homeGround: "Nicholls Synthetic", about: "Strong midfield unit." },
  { name: "Everest FC", founded: "2015", homeGround: "Nicholls Synthetic", about: "High tempo style." },
  { name: "Azhas FC", founded: "2018", homeGround: "Nicholls Synthetic", about: "Youthful, attacking team." },
  { name: "Thuenlam FC", founded: "2016", homeGround: "Nicholls Synthetic", about: "Disciplined defense." },
  { name: "Achos Football Team", founded: "2014", homeGround: "Nicholls Synthetic", about: "Veteran core." },
  { name: "Nepal United FC", founded: "2012", homeGround: "Nicholls Synthetic", about: "Possession football." },
  { name: "Queanbeyan Nepalese United Football Club", short: "QNUFC", founded: "2019", homeGround: "Nicholls Synthetic", about: "Big local support." },
  { name: "JA Brothers Football Club", founded: "2016", homeGround: "Nicholls Synthetic", about: "Compact shape." },
  { name: "Unity Stars FC", founded: "2017", homeGround: "Nicholls Synthetic", about: "Fast transitions." },
  { name: "CNFC Canberra", founded: "2016", homeGround: "Nicholls Synthetic", about: "Well balanced." },
  { name: "Druk FC", founded: "2015", homeGround: "Nicholls Synthetic", about: "Set piece threat." }
];

const SPONSORS: Sponsor[] = [
  { tier: "Title Sponsor", name: "SBA Property Group", url: "" },
  { tier: "Platinum Sponsor", name: "GTM Facility Services", url: "" },
  { tier: "Silver Sponsor", name: "Nepali Haat Bazaar", url: "" },
  { tier: "Silver Sponsor", name: "Canberra Momo House", url: "" },
  { tier: "Silver Sponsor", name: "Dikshant Dhungel – Real Estate Agent", url: "" },
  { tier: "Silver Sponsor", name: "The Monkey Temple", url: "" },
  { tier: "Silver Sponsor", name: "Ooshman Gungahlin", url: "" }
];

/* =======================
   League Table Data
======================= */
type Standing = {
  club: string;
  played: number; won: number; drawn: number; lost: number;
  gf: number; ga: number; gd?: number; pts: number;
};

const STANDINGS: Standing[] = [
  { club: "Khukuri Canberra FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Phuensum FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Everest FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Azhas FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Thuenlam FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Achos Football Team", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Nepal United FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Queanbeyan Nepalese United Football Club", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "JA Brothers Football Club", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Unity Stars FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "CNFC Canberra", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
  { club: "Druk FC", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 }
];

/* =======================
   Helpers
======================= */
const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short", year: "numeric", month: "short", day: "numeric"
  });

/* =======================
   Header
======================= */
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={BRAND.logoDark} alt="Samsara Group Canberra" className="h-10 dark:hidden object-contain" />
          <img src={BRAND.logoLight} alt="Samsara Group Canberra" className="h-10 hidden dark:block object-contain" />
        </div>
        <div className="flex items-center gap-6 mt-3 md:mt-0">
          <div className="flex items-center gap-2">
            <img src={BRAND.splLogo} alt="SPL" className="h-9 object-contain" onError={(e: any) => { e.currentTarget.style.display = "none"; }} />
            <span className="font-medium text-slate-700">SPL Season 2</span>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#fixtures" className="hover:text-slate-700">Fixtures</a>
            <a href="#table" className="hover:text-slate-700">Table</a>
            <a href="#clubs" className="hover:text-slate-700">Clubs</a>
            <a href="#sponsors" className="hover:text-slate-700">Sponsors</a>
            <a href="#contact" className="px-3 py-1 rounded-full text-white" style={{ background: BRAND.primary }}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* =======================
   Hero
======================= */
function Hero() {
  return (
    <section id="home" className="relative">
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${BRAND.accent}11, white 40%, ${BRAND.primary}11)` }} />
      <div className="relative max-w-7xl mx-auto px-4 py-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-semibold">{COMPANY.name}</h1>
        <p className="text-slate-700 mt-2 max-w-2xl">{COMPANY.about}</p>
        <div className="mt-4 flex gap-2 justify-center md:justify-start">
          <a href="#fixtures" className="px-4 py-2 rounded-full text-sm text-white" style={{ background: BRAND.accent }}>View Fixtures</a>
          <a href="#clubs" className="px-4 py-2 rounded-full text-sm" style={{ background: `${BRAND.accent}22` }}>Clubs</a>
        </div>
      </div>
    </section>
  );
}

/* =======================
   Photo Slider
======================= */
function PhotoSlider() {
  const slides = [
    { img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1600&auto=format&fit=crop", alt: "Match day crowd" },
    { img: "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?q=80&w=1600&auto=format&fit=crop", alt: "Warmups" },
    { img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1600&auto=format&fit=crop", alt: "Kickoff" }
  ];
  const ref = useRef<HTMLDivElement>(null);
  const go = (i: number) => {
    const container = ref.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
    items[i]?.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  return (
    <section id="photos" className="relative">
      <div ref={ref} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {slides.map((s, idx) => (
          <div key={idx} data-slide className="relative min-w-full h-[50vw] max-h-[480px] snap-start">
            <img src={s.img} alt={s.alt} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-3 right-3 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} aria-label={`slide ${i + 1}`} onClick={() => go(i)} className={`h-2 w-2 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =======================
   Fixed Fixtures Panel - floating
======================= */
function FixedFixturesPanel() {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<"week" | "all">("week");

  const today = new Date();
  const in7 = new Date();
  in7.setDate(in7.getDate() + 7);

  const allList = useMemo(
    () =>
      [...FIXTURES]
        .map((f) => ({ ...f, dt: new Date(f.date + "T" + (f.time || "00:00")) }))
        .sort((a, b) => a.dt.getTime() - b.dt.getTime()),
    []
  );

  const weekList = useMemo(
    () => allList.filter((f) => f.dt >= today && f.dt <= in7),
    [allList, today, in7]
  );

  const list = tab === "week" && weekList.length ? weekList : allList;

  const grouped = useMemo(() => {
    const m: Record<string, typeof list> = {};
    for (const f of list) (m[f.date] ||= []).push(f);
    return Object.entries(m).sort(([a], [b]) => a.localeCompare(b));
  }, [list]);

  return (
    <div className="fixed z-40 right-3 bottom-3 md:right-6 md:bottom-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-full shadow bg-white border text-sm"
          aria-label="Open fixtures"
        >
          Open Fixtures
        </button>
      ) : (
        <div className="w-[92vw] max-w-md md:w-[420px] rounded-2xl shadow-xl border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-slate-50">
            <div className="flex gap-2 text-sm">
              <button onClick={() => setTab("week")} className={`px-3 py-1 rounded-full border ${tab === "week" ? "bg-white" : ""}`} style={{ borderColor: "#0B5F56", color: "#0B5F56" }}>
                Next 7 days
              </button>
              <button onClick={() => setTab("all")} className={`px-3 py-1 rounded-full border ${tab === "all" ? "bg-white" : ""}`} style={{ borderColor: "#0B5F56", color: "#0B5F56" }}>
                All fixtures
              </button>
            </div>
            <button onClick={() => setOpen(false)} className="text-xs text-slate-600 hover:text-slate-900" aria-label="Close fixtures">
              Close
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {grouped.map(([date, fixtures]) => (
              <div key={date} className="border-b last:border-0">
                <div className="px-4 py-2 text-[12px] font-medium bg-slate-50 sticky top-0">{fmtDate(date)}</div>
                <div className="divide-y">
                  {fixtures.map((f, i) => (
                    <div key={`${date}-${i}-${f.home}-${f.away}`} className="px-4 py-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">
                          {f.home} <span className="text-slate-400">vs</span> {f.away}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          {f.ground}{f.stage ? ` • ${f.stage}` : ""}
                        </div>
                      </div>
                      <div className="text-[11px] px-2 py-1 rounded-full" style={{ background: "#0B5F5615", color: "#0B5F56" }}>
                        {f.time || "TBA"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {grouped.length === 0 && <div className="p-4 text-sm text-slate-600">No fixtures in the next week.</div>}
          </div>
        </div>
      )}
    </div>
  );
}

/* =======================
   Main Fixtures Section
======================= */
function SPLSection() {
  const [showAll, setShowAll] = useState(false);

  const today = new Date();
  const in7 = new Date();
  in7.setDate(in7.getDate() + 7);

  const list = useMemo(() => {
    let filtered: Fixture[];
    if (showAll) {
      filtered = [...FIXTURES].sort((a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime());
    } else {
      const withinWeek = FIXTURES.filter((f) => {
        const dt = new Date(f.date + "T" + f.time);
        return dt >= today && dt <= in7;
      });
      filtered = withinWeek.length > 0 ? withinWeek : [...FIXTURES].sort((a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime());
    }
    return filtered.map((f) => ({ ...f, dt: new Date(f.date + "T" + (f.time || "00:00")) }));
  }, [showAll, today, in7]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof list> = {};
    for (const f of list) (map[f.date] ||= []).push(f);
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [list]);

  return (
    <section id="fixtures" className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">SPL Season 2 Fixtures</h2>
        <button onClick={() => setShowAll((prev) => !prev)} className="px-3 py-1.5 rounded-full border text-sm transition hover:bg-slate-50" style={{ borderColor: BRAND.primary, color: BRAND.primary }}>
          {showAll ? "Show upcoming week" : "Show all fixtures"}
        </button>
      </div>
      <div className="space-y-4 mt-4">
        {grouped.map(([date, fixtures]) => (
          <div key={date} className="rounded-2xl border bg-white overflow-hidden">
            <div className="px-4 py-3 border-b text-sm font-medium" style={{ background: `${BRAND.accent}11` }}>{fmtDate(date)}</div>
            <div className="divide-y">
              {fixtures.map((f, i) => (
                <div key={i} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">
                      {f.home} <span className="text-slate-400">vs</span> {f.away}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {f.ground}
                      {f.stage ? ` • ${f.stage}` : ""}
                      {f.note ? ` • ${f.note}` : ""}
                    </div>
                  </div>
                  <div className="text-[11px] px-2 py-1 rounded-full" style={{ background: `${BRAND.primary}15`, color: BRAND.primary }}>
                    {f.time || "TBA"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {grouped.length === 0 && <p className="text-sm text-slate-600">No fixtures in the next week.</p>}
      </div>
    </section>
  );
}

/* =======================
   League Table
======================= */
function LeagueTable() {
  const rows = useMemo(
    () =>
      STANDINGS.map((s) => ({ ...s, gd: typeof s.gd === "number" ? s.gd : s.gf - s.ga }))
        .sort((a, b) => {
          if (b.pts !== a.pts) return b.pts - a.pts;
          const gdA = a.gd ?? 0, gdB = b.gd ?? 0;
          if (gdB !== gdA) return gdB - gdA;
          if (b.gf !== a.gf) return b.gf - a.gf;
          return a.club.localeCompare(b.club);
        }),
    []
  );

  return (
    <section id="table" className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Current League Table</h2>
        <span className="text-xs text-slate-500">Updated {new Date().toLocaleDateString()}</span>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm border rounded-2xl overflow-hidden">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2 text-left">Pos</th>
              <th className="px-3 py-2 text-left">Club</th>
              <th className="px-3 py-2 text-right">P</th>
              <th className="px-3 py-2 text-right">W</th>
              <th className="px-3 py-2 text-right">D</th>
              <th className="px-3 py-2 text-right">L</th>
              <th className="px-3 py-2 text-right">GF</th>
              <th className="px-3 py-2 text-right">GA</th>
              <th className="px-3 py-2 text-right">GD</th>
              <th className="px-3 py-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.club} className="border-t">
                <td className="px-3 py-2">{i + 1}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.club}</td>
                <td className="px-3 py-2 text-right">{r.played}</td>
                <td className="px-3 py-2 text-right">{r.won}</td>
                <td className="px-3 py-2 text-right">{r.drawn}</td>
                <td className="px-3 py-2 text-right">{r.lost}</td>
                <td className="px-3 py-2 text-right">{r.gf}</td>
                <td className="px-3 py-2 text-right">{r.ga}</td>
                <td className="px-3 py-2 text-right">{r.gd ?? r.gf - r.ga}</td>
                <td className="px-3 py-2 text-right font-semibold">{r.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =======================
   Club Modal and Section
======================= */
function ClubModal({ club, onClose }: { club: Club | null; onClose: () => void }) {
  if (!club) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white border shadow-lg p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{club.name}</h3>
          <button onClick={onClose} className="text-slate-500 text-sm">Close</button>
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          {club.logo ? <img src={club.logo} alt={club.name} className="h-12 object-contain" /> : null}
          {club.about ? <p>{club.about}</p> : null}
          <p><span className="font-medium">Founded</span> {club.founded || "TBC"}</p>
          <p><span className="font-medium">Manager</span> {club.manager || "TBC"}</p>
          <p><span className="font-medium">Home ground</span> {club.homeGround || "Nicholls Synthetic"}</p>
          {club.facebook ? <p><a href={club.facebook} target="_blank" className="underline">Facebook</a></p> : null}
        </div>
      </div>
    </div>
  );
}

function ClubsSection() {
  const [selected, setSelected] = useState<Club | null>(null);
  return (
    <section id="clubs" className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">SPL Season 2 Clubs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {CLUBS.map((c) => (
          <button key={c.name} onClick={() => setSelected(c)} className="text-left rounded-2xl border bg-white p-4 hover:shadow-sm">
            <div className="flex items-center gap-3">
              {c.logo ? <img src={c.logo} alt={c.name} className="h-8 w-8 object-contain" /> : <div className="h-8 w-8 rounded bg-slate-200" />}
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <p className="text-xs text-slate-600 mt-0.5">{c.about || "Club information"}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <ClubModal club={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* =======================
   Sponsor Modal and Section
======================= */
function SponsorModal({ sponsor, onClose }: { sponsor: Sponsor | null; onClose: () => void }) {
  if (!sponsor) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white border shadow-lg p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{sponsor.name}</h3>
          <button onClick={onClose} className="text-slate-500 text-sm">Close</button>
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          {sponsor.logo ? <img src={sponsor.logo} alt={sponsor.name} className="h-12 object-contain" /> : null}
          <p><span className="font-medium">Tier</span> {sponsor.tier}</p>
          {sponsor.blurb ? <p>{sponsor.blurb}</p> : null}
          {sponsor.url ? <p><a href={sponsor.url} target="_blank" className="underline">Website</a></p> : null}
        </div>
      </div>
    </div>
  );
}

function SponsorsSection() {
  const [selected, setSelected] = useState<Sponsor | null>(null);
  return (
    <section id="sponsors" className="py-10" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold">Sponsors</h3>
        <p className="text-sm text-slate-600 mt-1">Thank you to our partners supporting SPL Season 2.</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-stretch">
          {SPONSORS.map((s) => (
            <button key={s.name} onClick={() => setSelected(s)} className="h-20 rounded-xl bg-white border flex flex-col items-center justify-center text-center p-2 hover:shadow-sm">
              <div className="text-[10px] uppercase tracking-wide text-slate-500">{s.tier}</div>
              <div className="text-xs font-medium">{s.name}</div>
            </button>
          ))}
        </div>
      </div>
      <SponsorModal sponsor={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* =======================
   Footer
======================= */
function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <img src={BRAND.logoLight} alt="Samsara Group Canberra" className="h-8" />
          <p className="text-sm opacity-80">{COMPANY.tagline}</p>
        </div>
        <div>
          <div className="text-sm font-semibold">Contact</div>
          <ul className="text-sm opacity-90 space-y-1 mt-2">
            <li>Address {COMPANY.location}</li>
            <li>Email <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a></li>
            <li>Phone <a href={`tel:${COMPANY.phone}`} className="underline">{COMPANY.phone}</a></li>
            <li>Facebook <a href={COMPANY.socials.facebook} className="underline" target="_blank">Follow</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Quick Links</div>
          <ul className="text-sm opacity-90 space-y-1 mt-2">
            <li><a href="#fixtures" className="underline">Fixtures</a></li>
            <li><a href="#table" className="underline">Table</a></li>
            <li><a href="#clubs" className="underline">Clubs</a></li>
            <li><a href="#sponsors" className="underline">Sponsors</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Legal</div>
          <ul className="text-sm opacity-90 space-y-1 mt-2">
            <li>© {new Date().getFullYear()} {COMPANY.name}</li>
            <li>All rights reserved</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* =======================
   Page
======================= */
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <Hero />
      <PhotoSlider />
      <SPLSection />
      <LeagueTable />
      <ClubsSection />
      <SponsorsSection />
      <Footer />
    </div>
  );
}
