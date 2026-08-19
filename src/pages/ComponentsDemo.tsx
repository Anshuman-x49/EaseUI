import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <div className="w-full max-w-full border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs bg-gray-50/80 dark:bg-zinc-900/60 transition-colors">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/80">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Preview
        </span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
        >
          <Code size={13} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div className="py-12 md:py-16 px-4 md:px-8 flex items-center justify-center w-full max-w-full overflow-x-auto no-scrollbar">
        {children}
      </div>

      {isCodeVisible && (
        <div className="border-t border-gray-200 dark:border-zinc-800">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
