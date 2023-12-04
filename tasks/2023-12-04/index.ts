export function memoize<T extends (...args: any) => any>(fn: T): T {
  if (typeof fn !== "function") {
    throw new Error("Function to be memoized must be a function.");
  }

  const cache = new Map<string, any>();

  return function (...args: any) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  } as T;
}
