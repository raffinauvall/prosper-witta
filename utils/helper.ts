export function cleanPayload<T extends Record<string, unknown>>(obj: T) {
  Object.keys(obj).forEach(
    (key) => obj[key] === undefined && delete obj[key]
  );
  return obj;
}
export function normalizeArray<T>(res: T[] | { data: T[] } | null | undefined): T[] {
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.data)) return res.data;
  return [];
}
