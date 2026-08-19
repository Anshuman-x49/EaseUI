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
import { Sidebar as SidebarIcon, Layers, Shield, Bell, User } from "lucide-react";

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

<Layout layoutType="dashboard" className="min-h-[400px] border border-slate-700 rounded-xl overflow-hidden flex flex-row shadow-xl">
  <LayoutSidebar width="md" className="bg-slate-900 text-white p-4 space-y-3">
    <div className="font-bold text-lg text-indigo-400 mb-6 flex items-center gap-2">
      <Shield className="w-5 h-5" /> EaseUI Admin
    </div>
    <div className="py-2 px-3 bg-indigo-600 font-medium text-white rounded-lg shadow-sm">Overview</div>
    <div className="py-2 px-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer">Analytics</div>
    <div className="py-2 px-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer">Settings</div>
  </LayoutSidebar>

  <div className="flex-1 flex flex-col bg-slate-950 text-white">
    <LayoutHeader className="bg-slate-900 border-b border-slate-800 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <LayoutSidebarToggle />
        <h3 className="font-semibold text-sm text-slate-200">System Dashboard</h3>
      </div>
      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4 text-slate-400" />
        <User className="w-4 h-4 text-slate-400" />
      </div>
    </LayoutHeader>

    <LayoutContent container="full" className="p-5 bg-slate-950">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Active Users" description="12,450 users online" variant="dark" size="sm" />
        <Card title="Revenue Stream" description="$45,200 monthly profit" variant="dark" size="sm" />
      </div>
    </LayoutContent>

    <LayoutFooter className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
      System Version 2.4.0 • All servers operational
    </LayoutFooter>
  </div>
</Layout>`;

  const mainLayoutCode = `import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Button,
} from "@/components";

<Layout layoutType="main" className="min-h-[380px] border border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-xl">
  <LayoutHeader className="bg-indigo-950 border-b border-indigo-900 py-3 px-6 text-white flex items-center justify-between">
    <span className="font-bold text-lg text-indigo-400">EaseUI Platform</span>
    <div className="flex gap-6 text-sm font-medium text-indigo-200">
      <span className="hover:text-white cursor-pointer">Products</span>
      <span className="hover:text-white cursor-pointer">Solutions</span>
      <span className="hover:text-white cursor-pointer">Pricing</span>
    </div>
  </LayoutHeader>

  <LayoutContent container="lg" className="py-10 text-center space-y-5 bg-slate-900 text-white">
    <h2 className="text-3xl font-extrabold text-white">Main Web Application Layout</h2>
    <p className="text-slate-300 text-sm max-w-xl mx-auto">
      Features a rich indigo header bar, responsive centered content container, and dark footer layout.
    </p>
    <Button variant="primary" size="md">Explore Components</Button>
  </LayoutContent>

  <LayoutFooter className="bg-slate-950 text-slate-400 text-center text-xs py-4 border-t border-slate-800">
    © 2026 EaseUI Inc. Powered by modern React components.
  </LayoutFooter>
</Layout>`;

  const propsData = [
    {
      prop: "layoutType",
      type: `"dashboard" | "main"`,
      default: `"main"`,
      description: "Layout structure blueprint type: 'dashboard' for sidebar app layouts or 'main' for web application layouts.",
    },
    {
      prop: "variant",
      type: `"default" | "light" | "dark" | "indigo" | "glass"`,
      default: `"default"`,
      description: "Color theme variant for the layout root container.",
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
      description: "Keeps LayoutHeader fixed to top during scroll.",
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
      description: "Left sidebar navigation drawer node for dashboard layout.",
    },
    {
      prop: "footer",
      type: "React.ReactNode",
      default: "-",
      description: "Bottom footer node.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Layout</h1>
        <p className="text-lg text-gray-600 dark:text-slate-300">
          Richly styled layout components in 2 core structure types: <strong>Dashboard Layout</strong> and <strong>Main Web Layout</strong>.
        </p>
      </div>

      {/* 1. Dashboard Layout */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <SidebarIcon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">1. Dashboard Layout</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Sleek dark theme dashboard with responsive collapsible sidebar, sticky top header bar, and content grid.
        </p>
        <ComponentDemo code={dashboardLayoutCode}>
          <div className="w-full">
            <Layout variant="dark" className="min-h-[400px] border border-slate-700 rounded-xl overflow-hidden flex flex-row shadow-xl">
              <LayoutSidebar width="md" className="bg-slate-900 text-white p-4 space-y-3">
                <div className="font-bold text-lg text-indigo-400 mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> EaseUI Admin
                </div>
                <div className="py-2 px-3 bg-indigo-600 font-medium text-white rounded-lg shadow-sm cursor-pointer">Overview</div>
                <div className="py-2 px-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer">Analytics</div>
                <div className="py-2 px-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer">Settings</div>
              </LayoutSidebar>

              <div className="flex-1 flex flex-col bg-slate-950 text-white">
                <LayoutHeader className="bg-slate-900 border-b border-slate-800 py-3 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LayoutSidebarToggle />
                    <h3 className="font-semibold text-sm text-slate-200">System Dashboard</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                    <User className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                  </div>
                </LayoutHeader>

                <LayoutContent container="full" className="p-5 bg-slate-950">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card title="Active Users" description="12,450 users online" variant="dark" size="sm" />
                    <Card title="Revenue Stream" description="$45,200 monthly profit" variant="dark" size="sm" />
                  </div>
                </LayoutContent>

                <LayoutFooter className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
                  System Version 2.4.0 • All servers operational
                </LayoutFooter>
              </div>
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      {/* 2. Main Web Layout */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">2. Main Web Layout</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Web application layout with an indigo header bar, centered content container, and sleek dark footer.
        </p>
        <ComponentDemo code={mainLayoutCode}>
          <div className="w-full">
            <Layout variant="dark" className="min-h-[380px] border border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-xl">
              <LayoutHeader className="bg-indigo-950 border-b border-indigo-900 py-3 px-6 text-white flex items-center justify-between">
                <span className="font-bold text-lg text-indigo-400">EaseUI Platform</span>
                <div className="flex gap-6 text-sm font-medium text-indigo-200">
                  <span className="hover:text-white cursor-pointer">Products</span>
                  <span className="hover:text-white cursor-pointer">Solutions</span>
                  <span className="hover:text-white cursor-pointer">Pricing</span>
                </div>
              </LayoutHeader>

              <LayoutContent container="lg" className="py-10 text-center space-y-5 bg-slate-900 text-white">
                <h2 className="text-3xl font-extrabold text-white">Main Web Application Layout</h2>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">
                  Features a rich indigo header bar, responsive centered content container, and dark footer layout.
                </p>
                <Button variant="primary" size="default">Explore Components</Button>
              </LayoutContent>

              <LayoutFooter className="bg-slate-950 text-slate-400 text-center text-xs py-4 border-t border-slate-800">
                © 2026 EaseUI Inc. Powered by modern React components.
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
