import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Palette,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  MousePointerClick,
  SlidersHorizontal,
} from "lucide-react";
import { Button, Tooltip } from "@/components";

gsap.registerPlugin(ScrollTrigger);

/* ── tiny feature data ─────────────────────────────────── */
const features = [
  {
    icon: Zap,
    title: "GSAP Motion",
    desc: "60 fps entrance, hover, and scroll animations baked in.",
  },
  {
    icon: Palette,
    title: "Dual Theme",
    desc: "Light & dark modes with high-contrast CSS variables.",
  },
  {
    icon: Code2,
    title: "Tailwind v4",
    desc: "Utility-first styling with CVA variant helpers.",
  },
  {
    icon: SlidersHorizontal,
    title: "Layout Blueprints",
    desc: "Dashboard and Main layouts ready to compose.",
  },
  {
    icon: CheckCircle2,
    title: "TypeScript First",
    desc: "Fully typed props with IntelliSense everywhere.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive",
    desc: "Tooltips, carousels, modals — accessible by default.",
  },
];

/* ══════════════════════════════════════════════════════════ */

const HomePage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // refs
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── ambient orbs ─────────────────────────────── */
      gsap.to(orbARef.current, {
        y: 18,
        x: -12,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orbBRef.current, {
        y: -14,
        x: 10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ── hero entrance (fast & smooth) ────────────── */
      if (heroRef.current) {
        const els = heroRef.current.children;
        gsap.fromTo(
          els,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      /* ── features scroll-triggered ───────────────── */
      if (featureCardsRef.current) {
        const cards = featureCardsRef.current.children;
        gsap.set(cards, { opacity: 0, y: 28 });

        ScrollTrigger.create({
          trigger: featuresRef.current,
          start: "top 78%",
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.to(cards, {
              opacity: 0,
              y: 28,
              duration: 0.3,
              stagger: 0.04,
              ease: "power2.in",
              overwrite: true,
            });
          },
        });
      }

      /* ── CTA scroll-triggered ────────────────────── */
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 24 });

        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(ctaRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.to(ctaRef.current, {
              opacity: 0,
              y: 24,
              duration: 0.3,
              ease: "power2.in",
              overwrite: true,
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npm install dev-ease-ui");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── render ──────────────────────────────────────────── */
  return (
    <div className="relative min-h-screen w-full bg-(--bg-color) text-(--text-color)">
      {/* ambient blurs */}
      <div
        ref={orbARef}
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-indigo-500/12 dark:bg-indigo-500/15 blur-[100px]"
      />
      <div
        ref={orbBRef}
        className="pointer-events-none absolute top-[60%] -right-20 w-[340px] h-[340px] rounded-full bg-violet-400/8 dark:bg-violet-500/12 blur-[90px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-14 md:py-24 space-y-28">
        {/* ════════ HERO ════════ */}
        <section
          ref={heroRef}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3 h-3" />
            v1.0 Release
          </span>

          {/* title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-3xl">
            Build Beautiful Interfaces{" "}
            <span className="bg-linear-to-r from-indigo-600 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              with Motion
            </span>
          </h1>

          {/* subtitle */}
          <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 max-w-xl leading-relaxed">
            A minimal React component library with GSAP animations, Tailwind&nbsp;v4, and full TypeScript support.
          </p>

          {/* ctas */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-1">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/components/button")}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Explore Components
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-xs w-full sm:w-auto shadow-xs">
              <span className="text-gray-400">$</span>
              <span className="font-medium text-gray-700 dark:text-slate-200">
                npm install dev-ease-ui
              </span>
              <Tooltip
                content={copied ? "Copied!" : "Copy"}
                position="top"
              >
                <button
                  onClick={handleCopy}
                  className="ml-1 p-0.5 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* ════════ FEATURES ════════ */}
        <section ref={featuresRef} className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Why EaseUI?
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
              Clean architecture, smooth motion, and zero boilerplate.
            </p>
          </div>

          <div
            ref={featureCardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-5 rounded-xl border border-gray-100 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/50 hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-colors duration-200"
              >
                <div className="flex items-start gap-3.5">
                  <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 transition-colors">
                    <f.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-semibold leading-tight">
                      {f.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-snug">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ CTA ════════ */}
        <section>
          <div
            ref={ctaRef}
            className="rounded-2xl px-6 py-10 sm:px-10 sm:py-14 bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white text-center space-y-5 border border-indigo-800/40"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Start Building Today
            </h2>
            <p className="text-indigo-200/80 text-sm max-w-md mx-auto">
              Install EaseUI and ship polished, animated interfaces in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/components/button")}
                className="bg-white text-indigo-950 hover:bg-gray-100 font-semibold"
              >
                Browse Components
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/components/layout")}
                className="border-indigo-400/60 text-indigo-100 hover:bg-indigo-900/40"
              >
                View Layouts
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
