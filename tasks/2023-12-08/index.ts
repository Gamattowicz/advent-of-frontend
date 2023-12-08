export interface Letter {
  content: string;
  country: "pl" | "de" | "us";
  priority: "high" | "medium" | "low";
}

export class LetterSorter {
  constructor(private strategy: SortStrategy) {}

  sortLetters(letters: Letter[]): Letter[] {
    return this.strategy.sort(letters);
  }
}

export interface SortStrategy {
  sort(letters: Letter[]): Letter[];
}

export class PriorityStrategy implements SortStrategy {
  private priorityWeights = {
    high: 3,
    medium: 2,
    low: 1,
  };

  sort(letters: Letter[]): Letter[] {
    return letters
      .slice()
      .sort(
        (a, b) =>
          this.priorityWeights[b.priority] - this.priorityWeights[a.priority]
      );
  }
}

export class CountryStrategy implements SortStrategy {
  private countryWeights = {
    pl: 3,
    de: 2,
    us: 1,
  };

  sort(letters: Letter[]): Letter[] {
    return letters
      .slice()
      .sort(
        (a, b) =>
          this.countryWeights[b.country] - this.countryWeights[a.country]
      );
  }
}

export class LengthStrategy implements SortStrategy {
  sort(letters: Letter[]): Letter[] {
    return letters.slice().sort((a, b) => a.content.length - b.content.length);
  }
}
