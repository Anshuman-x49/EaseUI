interface PropsTableProps {
  data: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}

const PropsTable = ({ data }: PropsTableProps) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm bg-(--bg-color)">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead className="bg-gray-50/80 dark:bg-zinc-900/80 border-b border-gray-200 dark:border-zinc-800">
          <tr>
            <th className="px-4 py-3.5 text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Prop
            </th>
            <th className="px-4 py-3.5 text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Type
            </th>
            <th className="px-4 py-3.5 text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Default
            </th>
            <th className="px-4 py-3.5 text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/60">
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <td className="px-4 py-3 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                {row.prop}
              </td>
              <td className="px-4 py-3 text-xs font-mono text-gray-600 dark:text-gray-300 wrap-break-word max-w-[200px]">
                {row.type}
              </td>
              <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {row.default}
              </td>
              <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
