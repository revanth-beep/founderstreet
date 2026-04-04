/** Deep-merge plain objects; arrays and primitives from `source` replace entirely. */
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  source: Partial<T> | Record<string, unknown> | null | undefined
): T {
  if (!source || typeof source !== "object") return base;
  const out = { ...base } as T;
  for (const key of Object.keys(source)) {
    const sv = (source as Record<string, unknown>)[key];
    const bv = (base as Record<string, unknown>)[key];
    if (sv === undefined) continue;
    if (
      sv !== null &&
      typeof sv === "object" &&
      !Array.isArray(sv) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      (out as Record<string, unknown>)[key] = deepMerge(
        bv as Record<string, unknown>,
        sv as Record<string, unknown>
      );
    } else {
      (out as Record<string, unknown>)[key] = sv;
    }
  }
  return out;
}
