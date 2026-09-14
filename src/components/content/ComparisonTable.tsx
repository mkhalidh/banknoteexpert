export interface ComparisonTableProps {
  caption: string;
  columns: string[];
  /** One array of cells per row; length should match columns. */
  rows: string[][];
  /** When true the first cell of each row is a row header. */
  rowHeader?: boolean;
}

/**
 * Generic comparison table. Data (caption, columns, rows) comes from the
 * content module. Server Component.
 */
export function ComparisonTable({
  caption,
  columns,
  rows,
  rowHeader = true,
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <caption className="mb-2 text-left text-sm text-zinc-500">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-[var(--border-soft)] text-left">
            {columns.map((column) => (
              <th key={column} scope="col" className="py-2 pr-4 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[var(--border-soft)] align-top"
            >
              {row.map((cell, cellIndex) =>
                rowHeader && cellIndex === 0 ? (
                  <th
                    key={cellIndex}
                    scope="row"
                    className="py-2 pr-4 text-left font-medium"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex} className="py-2 pr-4">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
