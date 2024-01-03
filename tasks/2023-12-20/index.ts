export class GiftStream {
  constructor(private gifts: string[]) {}

  map(fn: (gift: string) => any): GiftStream {
    return new GiftStream(this.gifts.map(fn));
  }

  skip(numGiftsToSkip: number): GiftStream {
    return new GiftStream(this.gifts.slice(numGiftsToSkip));
  }

  take(numGiftsToTake: number): GiftStream {
    return new GiftStream(this.gifts.slice(0, numGiftsToTake));
  }

  getGifts(): string[] {
    return this.gifts;
  }
}
