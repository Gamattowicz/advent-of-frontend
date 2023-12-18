type GalacticHistoryTracer<T> = {
  galacticRegister: T[];
  deletedGalactic: T[];

  add(galactic: T): void;
  current(): T | null;
  undo(): void;
  redo(): void;
};

export function createTracer<T>(): GalacticHistoryTracer<T> {
  const tracer: GalacticHistoryTracer<T> = {
    galacticRegister: [],
    deletedGalactic: [],

    add(galactic: T): void {
      this.galacticRegister.push(galactic);
      this.deletedGalactic = [];
    },

    current(): T | null {
      if (this.galacticRegister.length === 0) {
        return null;
      }
      return this.galacticRegister[this.galacticRegister.length - 1];
    },

    undo(): void {
      if (this.galacticRegister.length > 0) {
        const galaxy = this.galacticRegister.pop();
        if (galaxy !== undefined) {
          this.deletedGalactic.push(galaxy);
        }
      }
    },

    redo(): void {
      if (this.deletedGalactic.length > 0) {
        const galaxy = this.deletedGalactic.pop();
        if (galaxy !== undefined) {
          this.galacticRegister.push(galaxy);
        }
      } else {
        throw new Error("No more galaxies to explore");
      }
    },
  };

  return tracer;
}
