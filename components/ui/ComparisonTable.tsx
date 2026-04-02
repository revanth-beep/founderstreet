import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type CellValue = boolean | string | "partial";

interface Column {
  key: string;
  label: string;
  highlight?: boolean;
}

interface Row {
  feature: string;
  values: CellValue[];
  category?: string;
}

interface ComparisonTableProps {
  columns: Column[];
  rows: Row[];
  title?: string;
  subtitle?: string;
}

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true)
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          highlight ? "text-green-600" : "text-green-600"
        )}
      >
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", highlight ? "bg-green-100" : "bg-green-50")}>
          <Check className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  if (value === false)
    return (
      <div className="flex items-center justify-center text-grey-300">
        <div className="w-6 h-6 rounded-full bg-grey-50 flex items-center justify-center">
          <X className="w-3 h-3" />
        </div>
      </div>
    );
  if (value === "partial")
    return (
      <div className="flex items-center justify-center text-yellow-500">
        <div className="w-6 h-6 rounded-full bg-yellow-50 flex items-center justify-center">
          <Minus className="w-3 h-3" />
        </div>
      </div>
    );
  return (
    <div className={cn("text-center text-sm", highlight ? "font-semibold text-grey-900" : "text-grey-600")}>
      {value}
    </div>
  );
}

export default function ComparisonTable({
  columns,
  rows,
  title,
  subtitle,
}: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-border">
      {(title || subtitle) && (
        <div className="px-6 py-5 bg-grey-50 border-b border-border">
          {title && <h3 className="font-serif font-bold text-lg text-grey-900">{title}</h3>}
          {subtitle && <p className="text-grey-600 text-sm mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 lg:p-5 text-xs font-semibold uppercase tracking-wider text-grey-500 bg-white w-1/3">
                Feature
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "p-4 lg:p-5 text-center text-sm font-bold",
                    col.highlight
                      ? "bg-primary text-white"
                      : "bg-white text-grey-700"
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    {col.highlight && (
                      <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-normal">
                        Recommended
                      </span>
                    )}
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.map((row, rIdx) => (
              <>
                {row.category && (
                  <tr key={`cat-${rIdx}`} className="bg-grey-50">
                    <td
                      colSpan={columns.length + 1}
                      className="px-4 lg:px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary"
                    >
                      {row.category}
                    </td>
                  </tr>
                )}
                <tr
                  key={`row-${rIdx}`}
                  className={cn(
                    "border-b border-border last:border-0 hover:bg-grey-50 transition-colors",
                    rIdx % 2 === 0 ? "bg-white" : "bg-grey-50/50"
                  )}
                >
                  <td className="p-4 lg:p-5 text-sm font-medium text-grey-700">
                    {row.feature}
                  </td>
                  {row.values.map((val, vIdx) => (
                    <td
                      key={vIdx}
                      className={cn(
                        "p-4 lg:p-5",
                        columns[vIdx]?.highlight && "bg-green-50/30"
                      )}
                    >
                      <Cell value={val} highlight={columns[vIdx]?.highlight} />
                    </td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
