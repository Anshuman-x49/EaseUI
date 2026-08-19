import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  CarouselCounter,
  CarouselAutoplayToggle,
  Button,
  Card,
} from "@/components";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const CarouselPage = () => {
  const sampleItems = [
    {
      id: "1",
      title: "Explore the Cosmos",
      description: "Discover breathtaking celestial views and deep space galaxies with EaseUI components.",
      badge: "FEATURED",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "Alpine Adventure",
      description: "Experience the serenity of snowy mountain peaks and pristine wilderness.",
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Urban Skyline Glow",
      description: "Dynamic city lights and architectural wonders brought into vibrant focus.",
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "Neon Cyber Pulse",
      description: "Futuristic glowing neon aesthetics for modern high-tech web design.",
      badge: "TRENDING",
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const basicUsageCode = `import { Carousel } from "@/components";

const slides = [
  {
    title: "Explore the Cosmos",
    description: "Discover celestial views and deep space galaxies.",
    badge: "FEATURED",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
  {
    title: "Alpine Adventure",
    description: "Serenity of snowy mountain peaks and pristine wilderness.",
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "Urban Skyline Glow",
    description: "Dynamic city lights and architectural wonders.",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
  },
];

<Carousel
  items={slides}
  autoPlay={true}
  autoPlayInterval={4000}
  showControls={true}
  showIndicators={true}
  showCounter={true}
  aspectRatio="video"
/>`;

  const fadeEffectCode = `import { Carousel } from "@/components";

<Carousel
  items={slides}
  effect="fade"
  autoPlay={true}
  autoPlayInterval={3000}
  variant="glass"
  aspectRatio="video"
  indicatorVariant="bars"
/>`;

  const compoundComponentCode = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  CarouselCounter,
  CarouselAutoplayToggle,
  Card,
  Button,
} from "@/components";

<Carousel autoPlay loop variant="card" className="p-4">
  <CarouselAutoplayToggle />
  <CarouselCounter />

  <CarouselContent>
    <CarouselItem>
      <Card
        title="Custom Card Slide 1"
        description="Build any custom layout inside CarouselItem."
        variant="dark"
        footer={<Button variant="primary">Explore More</Button>}
      />
    </CarouselItem>
    <CarouselItem>
      <Card
        title="Custom Card Slide 2"
        description="Seamlessly integrates with all EaseUI components."
        variant="light"
        footer={<Button variant="secondary">Learn More</Button>}
      />
    </CarouselItem>
  </CarouselContent>

  <CarouselPrevious className="left-6" />
  <CarouselNext className="right-6" />
  <CarouselIndicators variant="dots" />
</Carousel>`;

  const itemsPerViewCode = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Card
} from "@/components";

<Carousel itemsPerView={2} gap={16} loop>
  <CarouselContent>
    <CarouselItem>
      <Card title="Card 1" description="Multi-item carousel slide 1" variant="light" />
    </CarouselItem>
    <CarouselItem>
      <Card title="Card 2" description="Multi-item carousel slide 2" variant="dark" />
    </CarouselItem>
    <CarouselItem>
      <Card title="Card 3" description="Multi-item carousel slide 3" variant="light" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious className="left-2" />
  <CarouselNext className="right-2" />
</Carousel>`;

  const propsData = [
    {
      prop: "items",
      type: "CarouselItemData[]",
      default: "undefined",
      description: "Array of item objects containing title, description, image, badge, etc.",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Enables automatic slide transition timer.",
    },
    {
      prop: "autoPlayInterval",
      type: "number",
      default: "4000",
      description: "Time duration (in ms) between automatic slide transitions.",
    },
    {
      prop: "pauseOnHover",
      type: "boolean",
      default: "true",
      description: "Pauses autoplay while user hovers over the carousel.",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "true",
      description: "Wraps slide navigation infinitely.",
    },
    {
      prop: "effect",
      type: `"slide" | "fade" | "zoom"`,
      default: `"slide"`,
      description: "Visual transition effect between slides.",
    },
    {
      prop: "itemsPerView",
      type: "number",
      default: "1",
      description: "Number of visible slides rendered side by side.",
    },
    {
      prop: "gap",
      type: "number",
      default: "16",
      description: "Spacing (in pixels) between slides when itemsPerView > 1.",
    },
    {
      prop: "variant",
      type: `"default" | "card" | "glass" | "outline"`,
      default: `"default"`,
      description: "Visual surface style variant of the carousel container.",
    },
    {
      prop: "aspectRatio",
      type: `"auto" | "video" | "square" | "wide" | "portrait"`,
      default: `"auto"`,
      description: "Container aspect ratio constraint.",
    },
    {
      prop: "showControls",
      type: "boolean",
      default: "true",
      description: "Renders previous/next navigation buttons.",
    },
    {
      prop: "showIndicators",
      type: "boolean",
      default: "true",
      description: "Renders dot/bar slide indicators.",
    },
    {
      prop: "indicatorVariant",
      type: `"dots" | "bars" | "numbers"`,
      default: `"dots"`,
      description: "Visual style of slide indicators.",
    },
    {
      prop: "showCounter",
      type: "boolean",
      default: "false",
      description: "Displays current slide index counter (e.g. 1 / 4).",
    },
    {
      prop: "onSlideChange",
      type: "(index: number) => void",
      default: "undefined",
      description: "Callback function triggered whenever active slide changes.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Carousel</h1>
        <p className="text-xl text-gray-600">
          A flexible, touch-friendly carousel slider supporting smooth CSS animations,
          autoplay, fade/zoom effects, compound components, and responsive multi-item layouts.
        </p>
      </div>

      {/* 1. Basic Auto-playing Hero Carousel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Hero Image Slider (Prop API)</h2>
        <p className="text-gray-600 text-sm">
          Simple plug-and-play configuration using the <code>items</code> prop with autoplay, controls, and indicators.
        </p>
        <ComponentDemo code={basicUsageCode}>
          <div className="w-full max-w-2xl">
            <Carousel
              items={sampleItems}
              autoPlay={true}
              autoPlayInterval={4000}
              showControls={true}
              showIndicators={true}
              showCounter={true}
              aspectRatio="video"
            />
          </div>
        </ComponentDemo>
      </section>

      {/* 2. Fade Transition & Glass Variant */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cross-Fade Effect & Bar Indicators</h2>
        <p className="text-gray-600 text-sm">
          Smooth cross-fade effect (<code>effect="fade"</code>) with bar indicators and glassmorphism container styling.
        </p>
        <ComponentDemo code={fadeEffectCode}>
          <div className="w-full max-w-2xl">
            <Carousel
              items={sampleItems}
              effect="fade"
              autoPlay={true}
              autoPlayInterval={3500}
              variant="glass"
              aspectRatio="video"
              indicatorVariant="bars"
              showCounter={true}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* 3. Compound Components Pattern */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Compound Components Pattern</h2>
        <p className="text-gray-600 text-sm">
          Full flexibility using subcomponents like <code>CarouselContent</code>, <code>CarouselItem</code>, <code>CarouselPrevious</code>, <code>CarouselNext</code>, and <code>CarouselAutoplayToggle</code>.
        </p>
        <ComponentDemo code={compoundComponentCode}>
          <div className="w-full max-w-2xl">
            <Carousel autoPlay autoPlayInterval={4000} loop variant="card" className="p-4 bg-slate-950">
              <CarouselAutoplayToggle />
              <CarouselCounter />

              <CarouselContent>
                <CarouselItem>
                  <Card
                    title="Interactive UI Components"
                    description="EaseUI provides premium, accessible, animated components for rapid web development."
                    variant="dark"
                    size="lg"
                    footer={<Button variant="primary">Discover Library</Button>}
                  />
                </CarouselItem>

                <CarouselItem>
                  <Card
                    title="Seamless GSAP & Tailwind"
                    description="Crafted with modern Tailwind CSS v4 and fluid motion primitives."
                    variant="light"
                    size="lg"
                    footer={<Button variant="secondary">View Source Code</Button>}
                  />
                </CarouselItem>

                <CarouselItem>
                  <Card
                    title="Touch & Swiping Support"
                    description="Native gesture handling for smooth mobile touch browsing experience."
                    variant="dark"
                    size="lg"
                    footer={<Button variant="destructive">Get Started</Button>}
                  />
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-4 top-1/2 -translate-y-1/2" />
              <CarouselIndicators variant="dots" />
            </Carousel>
          </div>
        </ComponentDemo>
      </section>

      {/* 4. Multiple Items Per View */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Multi-Item Card Slider</h2>
        <p className="text-gray-600 text-sm">
          Display multiple slides side-by-side using <code>itemsPerView={2}</code> and custom <code>gap</code> spacing.
        </p>
        <ComponentDemo code={itemsPerViewCode}>
          <div className="w-full max-w-2xl">
            <Carousel itemsPerView={2} gap={16} loop className="p-2">
              <CarouselContent>
                <CarouselItem>
                  <Card
                    title="Feature Alpha"
                    description="Optimized rendering performance for high throughput."
                    variant="dark"
                    size="sm"
                  />
                </CarouselItem>

                <CarouselItem>
                  <Card
                    title="Feature Beta"
                    description="Responsive fluid layouts across mobile and desktop."
                    variant="light"
                    size="sm"
                  />
                </CarouselItem>

                <CarouselItem>
                  <Card
                    title="Feature Gamma"
                    description="Fully typed TypeScript interface with complete IntelliSense."
                    variant="dark"
                    size="sm"
                  />
                </CarouselItem>

                <CarouselItem>
                  <Card
                    title="Feature Delta"
                    description="Accessible keyboard navigation and screen-reader support."
                    variant="light"
                    size="sm"
                  />
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="-left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="-right-2 top-1/2 -translate-y-1/2" />
              <CarouselIndicators variant="numbers" />
            </Carousel>
          </div>
        </ComponentDemo>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
