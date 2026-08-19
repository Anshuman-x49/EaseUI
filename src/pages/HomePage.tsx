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
import { Button, Card, Tooltip, Carousel } from "@/components";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();
  const [copiedInstall, setCopiedInstall] = useState(false);

  // Animation Refs
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const floatingOrb1Ref = useRef<HTMLDivElement>(null);
  const floatingOrb2Ref = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const ctaBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Floating background ambient blur orbs (Smooth & subtle)
      gsap.to(floatingOrb1Ref.current, {
        y: 20,
        x: -10,
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(floatingOrb2Ref.current, {
        y: -15,
        x: 15,
        scale: 1.08,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Short & Snappy Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (heroBadgeRef.current) {
        tl.fromTo(
          heroBadgeRef.current,
          { opacity: 0, y: -15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4 }
        );
      }

      if (heroTitleRef.current) {
        tl.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45 },
          "-=0.25"
        );
      }

      if (heroSubtitleRef.current) {
        tl.fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.25"
        );
      }

      if (heroCtasRef.current) {
        tl.fromTo(
          heroCtasRef.current.children,
          { opacity: 0, y: 15, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.08 },
          "-=0.2"
        );
      }

      if (heroCardRef.current) {
        tl.fromTo(
          heroCardRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
      }

      // 3. Perfect ScrollTrigger for Features Section
      if (featuresGridRef.current) {
        gsap.fromTo(
          featuresGridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Perfect ScrollTrigger for CTA Banner Entrance
      if (ctaBannerRef.current) {
        gsap.fromTo(
          ctaBannerRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaBannerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText("npm install dev-ease-ui");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const sampleSlides = [
    {
      id: "1",
      title: "Built for React 19",
      description: "Designed with modern hooks, TypeScript support, and zero boilerplate.",
      badge: "FAST",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "GSAP Motion Primitives",
      description: "Micro-animations and fluid entrance effects built directly into components.",
      badge: "ANIMATED",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-(--bg-color) text-(--text-color)">
      {/* Background Ambient GSAP Orbs */}
      <div
        ref={floatingOrb1Ref}
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-[120px] z-0"
      />
      <div
        ref={floatingOrb2Ref}
        className="pointer-events-none absolute top-96 -right-24 w-[400px] h-[400px] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[100px] z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-20">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-6 pt-2">
          {/* Hero Badge */}
          <div
            ref={heroBadgeRef}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide shadow-xs backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EaseUI Version 1.0 Release</span>
          </div>

          {/* Hero Title */}
          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.15]"
          >
            Craft Stunning Web UIs with{" "}
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-400 bg-clip-text text-transparent">
              Fluid GSAP Motion
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p
            ref={heroSubtitleRef}
            className="text-base sm:text-lg text-gray-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            A modern, customizable React UI library powered by Tailwind CSS v4 and GSAP animations. Accessible, responsive, and ready out-of-the-box.
          </p>

          {/* CTAs & Install Command */}
          <div
            ref={heroCtasRef}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/components/button")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
            >
              <span>Explore Components</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Quick Copy Command */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono w-full sm:w-auto justify-between shadow-xs">
              <span className="text-gray-500 dark:text-slate-400">$</span>
              <span className="font-semibold">npm install dev-ease-ui</span>
              <Tooltip content={copiedInstall ? "Copied!" : "Copy Command"} position="top">
                <button
                  onClick={copyInstallCommand}
                  className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-2"
                >
                  {copiedInstall ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Hero Interactive Component Preview Showcase */}
          <div
            ref={heroCardRef}
            className="w-full max-w-3xl pt-4"
          >
            <div className="p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-2.5 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs font-medium text-gray-400">
                    Live Component Playground
                  </span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
                  Interactive
                </span>
              </div>

              {/* Demo Slider inside Hero */}
              <div className="rounded-xl overflow-hidden">
                <Carousel
                  items={sampleSlides}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  effect="fade"
                  aspectRatio="video"
                  showIndicators={true}
                  showCounter={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION WITH SCROLLTRIGGER */}
        <section ref={featuresSectionRef} className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Why Build with EaseUI?
            </h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-lg mx-auto text-sm">
              Engineered with clean architectural principles to give your web applications an edge in performance and motion.
            </p>
          </div>

          <div
            ref={featuresGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <Card
              variant="light"
              size="md"
              hoverAnimation="jiggle"
              title="GSAP Motion Built-in"
              description="Entrance animations, 3D hover effects, and spring physics integrated cleanly into UI components."
              footer={
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-4 h-4" /> Smooth 60fps Motion
                </div>
              }
            />

            <Card
              variant="dark"
              size="md"
              hoverAnimation="scale"
              title="Dual Theme Engine"
              description="Native light and dark mode switching with high-contrast text and CSS variable support."
              footer={
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <Palette className="w-4 h-4" /> Light & Dark Ready
                </div>
              }
            />

            <Card
              variant="light"
              size="md"
              hoverAnimation="jiggle"
              title="Tailwind CSS v4"
              description="Styled with modern Tailwind v4 utilities, class-variance-authority (CVA), and modular CSS."
              footer={
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Code2 className="w-4 h-4" /> Tailwind v4 Powered
                </div>
              }
            />

            <Card
              variant="dark"
              size="md"
              hoverAnimation="scale"
              title="Layout Primitives"
              description="Preconfigured Dashboard layout (sidebar drawer) and Main Web layout (centered container)."
              footer={
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <SlidersHorizontal className="w-4 h-4" /> 2 Layout Blueprints
                </div>
              }
            />

            <Card
              variant="light"
              size="md"
              hoverAnimation="jiggle"
              title="TypeScript First"
              description="100% type-safe component props with full IntelliSense autocompletion and clean interfaces."
              footer={
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="w-4 h-4" /> Fully Typed API
                </div>
              }
            />

            <Card
              variant="dark"
              size="md"
              hoverAnimation="scale"
              title="Micro-Interactions"
              description="Tooltips, modals, carousels, and responsive buttons built with accessibility in mind."
              footer={
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <MousePointerClick className="w-4 h-4" /> Interactive Primitives
                </div>
              }
            />
          </div>
        </section>

        {/* CALL TO ACTION BANNER WITH SCROLLTRIGGER */}
        <section className="pt-4">
          <div
            ref={ctaBannerRef}
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-linear-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white text-center space-y-6 shadow-xl border border-indigo-800/50"
          >
            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Ready to Accelerate Your Frontend?
              </h2>
              <p className="text-indigo-200 text-sm md:text-base">
                Start building elegant, animated user interfaces in minutes with EaseUI.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/components/button")}
                className="bg-white text-indigo-950 hover:bg-gray-100 font-bold shadow-lg"
              >
                Browse All Components
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/components/layout")}
                className="border-indigo-400 text-indigo-100 hover:bg-indigo-900/50"
              >
                View Layout Blueprints
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
