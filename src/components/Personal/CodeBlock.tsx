import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "tsx" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden transition-colors">
      {/* Code Header */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-t-xl text-xs border border-gray-200 dark:border-slate-800">
        <span className="font-mono font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 rounded-md transition-colors shadow-2xs"
        >
          {copied ? <Check size={13} className="text-green-600 dark:text-green-400" /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code Pre Box */}
      <pre className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 p-4 rounded-b-xl border border-t-0 border-gray-200 dark:border-slate-800 overflow-x-auto no-scrollbar text-xs font-mono leading-relaxed transition-colors">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
