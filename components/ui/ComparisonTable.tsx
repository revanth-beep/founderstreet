import { Check, X, Minus } from "lucide-react";

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: highlight ? "#DEF3D4" : "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Check size={13} color="#66BB3F" />
        </div>
      </div>
    );
  if (value === false)
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#F7F7F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={12} color="#C4C4C4" />
        </div>
      </div>
    );
  if (value === "partial")
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#FEF9C3", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Minus size={12} color="#92400E" />
        </div>
      </div>
    );
  return (
    <div style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: highlight ? 600 : 400, color: highlight ? "#3d4246" : "#5A5A5A" }}>
      {value}
    </div>
  );
}

export default function ComparisonTable({ columns, rows, title, subtitle }: ComparisonTableProps) {
  return (
    <div style={{ overflow: "hidden", borderRadius: "10px", border: "1px solid #E0E0DC" }}>
      {(title || subtitle) && (
        <div style={{ padding: "1.25rem 1.5rem", background: "#FAFAFA", borderBottom: "1px solid #E0E0DC" }}>
          {title && <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#3d4246" }}>{title}</h3>}
          {subtitle && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.25rem" }}>{subtitle}</p>}
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E0E0DC" }}>
              <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A0A0A0", background: "#FFFFFF", width: "33%" }}>
                Feature
              </th>
              {columns.map((col) => (
                <th key={col.key} style={{ padding: "1rem 1.25rem", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 700, background: col.highlight ? "#66BB3F" : "#FFFFFF", color: col.highlight ? "#FFFFFF" : "#3D3D3D" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    {col.highlight && (
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "2px 8px", borderRadius: "99px", fontWeight: 600 }}>
                        Recommended
                      </span>
                    )}
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <>
                {row.category && (
                  <tr key={`cat-${rIdx}`}>
                    <td colSpan={columns.length + 1} style={{ padding: "0.625rem 1.25rem", background: "#F7F7F5", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#66BB3F" }}>
                      {row.category}
                    </td>
                  </tr>
                )}
                <tr key={`row-${rIdx}`} style={{ borderBottom: rIdx < rows.length - 1 ? "1px solid #F0F0ED" : "none", background: rIdx % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}>
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#3D3D3D" }}>
                    {row.feature}
                  </td>
                  {row.values.map((val, vIdx) => (
                    <td key={vIdx} style={{ padding: "1rem 1.25rem", background: columns[vIdx]?.highlight ? "rgba(102,187,63,0.03)" : "inherit" }}>
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
