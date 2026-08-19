import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );

  return (
    <nav className="h-16 w-full flex items-center justify-between px-6 border-b border-gray-200 dark:border-zinc-800 bg-(--bg-color) text-(--text-color) transition-colors">
      <div className="flex items-center gap-8">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer tracking-tight text-indigo-600 dark:text-indigo-400"
        >
          EaseUI
        </h1>

        <div className="hidden sm:flex items-center bg-transparent rounded-lg px-3 py-1.5 border border-gray-200 dark:border-zinc-800 focus-within:border-indigo-500 transition-colors">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            className="ml-2 bg-transparent outline-none text-sm text-(--text-color) placeholder-gray-400 w-44 focus:w-60 transition-all duration-200"
          />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
        <li
          onClick={() => navigate("components")}
          className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Components
        </li>
        <li className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
          About
        </li>
        <li className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
          Templates
        </li>
        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-zinc-800 transition-colors"
            onClick={() => dispatch(toggleTheme())}
            title="Switch to Light Theme"
          >
            <Sun size={18} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => dispatch(toggleTheme())}
            title="Switch to Dark Theme"
          >
            <Moon size={18} className="text-gray-600" />
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-gray-700 dark:text-gray-300 p-2">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
