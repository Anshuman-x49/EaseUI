import {
  Layout,
  LayoutHeader,
  LayoutSidebar,
  LayoutContent,
  LayoutFooter,
  LayoutSidebarToggle,
  Button,
  Card,
} from "@/components";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Sidebar as SidebarIcon, Layers } from "lucide-react";

const LayoutPage = () => {
  const dashboardLayoutCode = `import {
  Layout,
  LayoutHeader,
  LayoutSidebar,
  LayoutContent,
  LayoutFooter,
  LayoutSidebarToggle,
  Card,
} from "@/components";

<Layout layoutType="dashboard" variant="default" className="min-h-[400px] border border-gray-200 rounded-lg overflow-hidden flex flex-row">
  <LayoutSidebar width="md" className="p-4 space-y-2">
    <div className="font-bold text-lg mb-4 text-indigo-600">EaseUI Dashboard</div>
    <div className="text-sm font-medium py-1.5 px-3 bg-indigo-50 text-indigo-600 rounded">Overview</div>
    <div className="text-sm font-medium py-1.5 px-3 text-gray-600 hover:bg-gray-100 rounded">Analytics</div>
    <div className="text-sm font-medium py-1.5 px-3 text-gray-600 hover:bg-gray-100 rounded">Settings</div>
  </LayoutSidebar>

  <div className="flex-1 flex flex-col">
    <LayoutHeader className="border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LayoutSidebarToggle />
        <h3 className="font-semibold text-sm">Dashboard Overview</h3>
      </div>
    </LayoutHeader>

    <LayoutContent container="full" className="bg-gray-50/50 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Total Users" description="12,450 active users" variant="light" size="sm" />
        <Card title="Revenue" description="$45,200 total sales" variant="dark" size="sm" />
      </div>
    </LayoutContent>
  </div>
</Layout>`;

  const mainLayoutCode = `import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Button,
} from "@/components";

<Layout layoutType="main" variant="light" className="min-h-[350px] border border-gray-200 rounded-lg overflow-hidden flex flex-col">
  <LayoutHeader className="flex items-center justify-between">
    <span className="font-bold text-lg text-indigo-600">EaseUI Brand</span>
    <div className="flex gap-4 text-sm font-medium text-gray-700">
      <span>Home</span>
      <span>Features</span>
      <span>Pricing</span>
    </div>
  </LayoutHeader>

  <LayoutContent container="lg" className="py-8 text-center space-y-4">
    <h2 className="text-3xl font-extrabold">Main Website Layout</h2>
    <p className="text-gray-600 max-w-xl mx-auto">
      Ideal for landing pages, blogs, marketing sites, and public web applications with centered content container boundaries.
    </p>
    <Button variant="primary" size="sm">Get Started</Button>
  </LayoutContent>

  <LayoutFooter className="text-center text-xs text-gray-500">
    © 2026 EaseUI Inc. All rights reserved.
  </LayoutFooter>
</Layout>`;

  const propsData = [
    {
      prop: "layoutType",
      type: `"dashboard" | "main"`,
      default: `"main"`,
      description: "Layout structure blueprint type: 'dashboard' for sidebar navigation apps or 'main' for centered website layouts.",
    },
    {
      prop: "variant",
      type: `"default" | "light" | "dark" | "slate"`,
      default: `"default"`,
      description: "Surface theme color variant of the root layout container.",
    },
    {
      prop: "container",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"xl"`,
      description: "Max-width container constraint applied to LayoutContent.",
    },
    {
      prop: "sticky",
      type: "boolean",
      default: "true",
      description: "Fixes the LayoutHeader to the top during page scroll.",
    },
    {
      prop: "header",
      type: "React.ReactNode",
      default: "-",
      description: "Top header navigation node.",
    },
    {
      prop: "sidebar",
      type: "React.ReactNode",
      default: "-",
      description: "Left navigation sidebar node for dashboard layout.",
    },
    {
      prop: "footer",
      type: "React.ReactNode",
      default: "-",
      description: "Footer node rendered at the bottom.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Layout</h1>
        <p className="text-xl text-gray-600">
          EaseUI provides 2 fundamental layout types: <strong>Dashboard Layout</strong> (with sidebar navigation) and <strong>Main Layout</strong> (centered header-footer website layout).
        </p>
      </div>

      {/* 1. Dashboard Layout */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <SidebarIcon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-semibold">1. Dashboard Layout</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Designed for admin panels, app dashboards, and SaaS backends featuring a left sidebar navigation drawer and top header bar.
        </p>
        <ComponentDemo code={dashboardLayoutCode}>
          <div className="w-full">
            <Layout variant="default" className="min-h-[380px] border border-gray-300 rounded-lg overflow-hidden flex flex-row shadow-sm">
              <LayoutSidebar width="md" className="p-4 space-y-2">
                <div className="font-bold text-lg mb-4 text-indigo-600">EaseUI Dashboard</div>
                <div className="text-sm font-medium py-1.5 px-3 bg-indigo-50 text-indigo-600 rounded">Overview</div>
                <div className="text-sm font-medium py-1.5 px-3 text-gray-600 hover:bg-gray-100 rounded">Analytics</div>
                <div className="text-sm font-medium py-1.5 px-3 text-gray-600 hover:bg-gray-100 rounded">Settings</div>
              </LayoutSidebar>

              <div className="flex-1 flex flex-col">
                <LayoutHeader className="border-b border-gray-200 flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <LayoutSidebarToggle />
                    <h3 className="font-semibold text-sm">Dashboard Overview</h3>
                  </div>
                </LayoutHeader>

                <LayoutContent container="full" className="bg-gray-50 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card title="Total Users" description="12,450 active users" variant="light" size="sm" />
                    <Card title="Revenue" description="$45,200 total sales" variant="dark" size="sm" />
                  </div>
                </LayoutContent>
              </div>
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* 2. Main Layout */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-semibold">2. Main Web Layout</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Designed for marketing websites, landing pages, blogs, and public web apps with a top header and centered container content.
        </p>
        <ComponentDemo code={mainLayoutCode}>
          <div className="w-full">
            <Layout variant="light" className="min-h-80 border border-gray-300 rounded-lg overflow-hidden flex flex-col shadow-sm">
              <LayoutHeader className="flex items-center justify-between">
                <span className="font-bold text-lg text-indigo-600">EaseUI Brand</span>
                <div className="flex gap-4 text-sm font-medium text-gray-700">
                  <span className="hover:text-indigo-600 cursor-pointer">Home</span>
                  <span className="hover:text-indigo-600 cursor-pointer">Features</span>
                  <span className="hover:text-indigo-600 cursor-pointer">Pricing</span>
                </div>
              </LayoutHeader>

              <LayoutContent container="lg" className="py-8 text-center space-y-4">
                <h2 className="text-2xl font-extrabold">Main Website Layout</h2>
                <p className="text-gray-600 text-sm max-w-xl mx-auto">
                  Ideal for landing pages, blogs, and public web applications with centered container boundaries.
                </p>
                <Button variant="primary" size="sm">Get Started</Button>
              </LayoutContent>

              <LayoutFooter className="text-center text-xs text-gray-500 py-4">
                © 2026 EaseUI Inc. All rights reserved.
              </LayoutFooter>
            </Layout>
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

export default LayoutPage;
