import { Tooltip, Button } from "@/components";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Info, HelpCircle, Heart, Share2 } from "lucide-react";

const TooltipPage = () => {
  const basicUsageCode = `import { Tooltip, Button } from "@/components";

<Tooltip content="Tooltip on Top" position="top">
  <Button variant="outline">Top</Button>
</Tooltip>

<Tooltip content="Tooltip on Bottom" position="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip on Left" position="left">
  <Button variant="outline">Left</Button>
</Tooltip>

<Tooltip content="Tooltip on Right" position="right">
  <Button variant="outline">Right</Button>
</Tooltip>`;

  const variantsCode = `import { Tooltip, Button } from "@/components";

<Tooltip content="Dark variant" variant="dark">
  <Button variant="dark">Dark</Button>
</Tooltip>

<Tooltip content="Light variant" variant="light">
  <Button variant="ghost">Light</Button>
</Tooltip>

<Tooltip content="Primary variant" variant="primary">
  <Button variant="primary">Primary</Button>
</Tooltip>

<Tooltip content="Glassmorphism variant" variant="glass">
  <Button variant="secondary">Glass</Button>
</Tooltip>`;

  const customContentCode = `import { Tooltip, Button } from "@/components";
import { Info, Heart } from "lucide-react";

<Tooltip
  content={
    <div className="flex items-center gap-1.5 font-semibold">
      <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
      <span>Added to Favorites</span>
    </div>
  }
  variant="dark"
>
  <Button variant="outline" size="icon">
    <Heart className="w-5 h-5 text-red-500" />
  </Button>
</Tooltip>

<Tooltip content="Click to view details" trigger="click" variant="primary">
  <Button variant="primary" size="sm">
    <Info className="w-4 h-4 mr-1.5" />
    Click Trigger
  </Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "-",
      description: "The text or React component content to display inside the tooltip popover.",
    },
    {
      prop: "position",
      type: `"top" | "bottom" | "left" | "right"`,
      default: `"top"`,
      description: "Placement of the tooltip relative to the target trigger element.",
    },
    {
      prop: "variant",
      type: `"dark" | "light" | "primary" | "glass"`,
      default: `"dark"`,
      description: "Visual surface style variant of the tooltip bubble.",
    },
    {
      prop: "arrow",
      type: "boolean",
      default: "true",
      description: "Renders a directional arrow pointing towards the trigger element.",
    },
    {
      prop: "delay",
      type: "number",
      default: "150",
      description: "Delay (in milliseconds) before showing the tooltip on hover.",
    },
    {
      prop: "trigger",
      type: `"hover" | "click"`,
      default: `"hover"`,
      description: "User interaction event that triggers the tooltip to appear.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "When true, disables showing the tooltip.",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Additional CSS classes to style the tooltip popover container.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Tooltip</h1>
        <p className="text-xl text-gray-600">
          A lightweight, customizable popup that displays informative hint text when users hover, focus, or click an element.
        </p>
      </div>

      {/* 1. Placement Directions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Placements</h2>
        <p className="text-gray-600 text-sm">
          Tooltips can be positioned on any side of the trigger element using the <code>position</code> prop.
        </p>
        <ComponentDemo code={basicUsageCode}>
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            <Tooltip content="Tooltip on Top" position="top">
              <Button variant="outline">Top</Button>
            </Tooltip>

            <Tooltip content="Tooltip on Bottom" position="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>

            <Tooltip content="Tooltip on Left" position="left">
              <Button variant="outline">Left</Button>
            </Tooltip>

            <Tooltip content="Tooltip on Right" position="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 2. Color Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Style Variants</h2>
        <p className="text-gray-600 text-sm">
          Choose from curated theme styles including dark, light, primary, and glassmorphism.
        </p>
        <ComponentDemo code={variantsCode}>
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            <Tooltip content="Dark tooltip hint" variant="dark">
              <Button variant="dark">Dark</Button>
            </Tooltip>

            <Tooltip content="Light tooltip hint" variant="light">
              <Button variant="ghost">Light</Button>
            </Tooltip>

            <Tooltip content="Primary tooltip hint" variant="primary">
              <Button variant="primary">Primary</Button>
            </Tooltip>

            <Tooltip content="Glassmorphism tooltip hint" variant="glass">
              <Button variant="secondary">Glass</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* 3. Custom Content & Click Trigger */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Content & Click Triggers</h2>
        <p className="text-gray-600 text-sm">
          Tooltips accept custom JSX elements as content and can be triggered on click instead of hover.
        </p>
        <ComponentDemo code={customContentCode}>
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            <Tooltip
              content={
                <div className="flex items-center gap-1.5 font-semibold">
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  <span>Added to Favorites</span>
                </div>
              }
              variant="dark"
            >
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5 text-red-500" />
              </Button>
            </Tooltip>

            <Tooltip content="Share this page with friends" variant="glass">
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </Tooltip>

            <Tooltip content="Click to view details" trigger="click" variant="primary">
              <Button variant="primary" size="sm">
                <Info className="w-4 h-4 mr-1.5" />
                Click Trigger
              </Button>
            </Tooltip>

            <Tooltip content="Need help? Check docs" variant="light">
              <Button variant="link" size="sm">
                <HelpCircle className="w-4 h-4 mr-1" />
                Help
              </Button>
            </Tooltip>
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

export default TooltipPage;
