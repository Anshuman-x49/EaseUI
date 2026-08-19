import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu, X, ChevronRight } from "lucide-react";

const ComponentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-(--text-color) bg-(--bg-color) w-full overflow-x-hidden">
      {/* Sidebar Navigation */}
      <aside
        className={`
          w-full md:w-64 p-5 flex flex-col shrink-0
          border-r border-gray-200 dark:border-zinc-800
          bg-(--bg-color)
          fixed md:sticky md:top-16 md:h-[calc(100vh-4rem)] z-30
          transform ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 no-scrollbar
        `}
      >
        <div className="flex items-center justify-between mb-6 px-3 md:px-0">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Components ({components.length})
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar">
          <ul className="flex flex-col gap-1.5">
            {components.map((item) => {
              const isActive =
                location.pathname === `/components/${item.toLowerCase()}`;
              return (
                <li
                  key={item}
                  onClick={() => {
                    navigate(item.toLowerCase());
                    setSidebarOpen(false);
                  }}
                  className={`
                    cursor-pointer px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                    flex items-center justify-between group
                    ${
                      isActive
                        ? "bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white font-bold shadow-md transform translate-x-1"
                        : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-800/80"
                    }
                  `}
                >
                  <span>{item}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-all duration-200 ${
                      isActive
                        ? "opacity-100 text-white translate-x-0"
                        : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Content Area - Flows naturally without inner scrollbar */}
      <div className="flex-1 w-full max-w-full min-w-0 p-4 md:p-8">
        <button
          className="md:hidden mb-4 p-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-2 text-sm font-medium"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={18} />
          <span>Toggle Navigation</span>
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
