function cleanPayload<T extends Record<string, any>>(obj: T) {
  Object.keys(obj).forEach(
    (key) => obj[key] === undefined && delete obj[key]
  );
  return obj;
}
