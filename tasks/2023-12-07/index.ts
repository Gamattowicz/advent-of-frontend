type Letter = { [key: string]: number };

export function createTrackedLetter(
  newLetter: Letter,
  changeTracker: (...args: any[]) => any
): Letter {
  return new Proxy(newLetter, {
    set(target: Letter, key: string, value: number) {
      changeTracker(key, value);
      target[key] = value;
      return true;
    },
  });
}
