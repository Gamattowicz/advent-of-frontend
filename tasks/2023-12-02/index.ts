interface Gift<T> {
  name: T;
  priority: number;
}

export class ChristmasQueue<T> {
  private giftList: Gift<T>[] = [];

  enqueue(gift: T, id: number): void {
    this.giftList.push({ name: gift, priority: id });
  }

  dequeue(): T {
    this.giftList.sort((a, b) => b.priority - a.priority);

    const result = this.giftList.shift();

    if (result) {
      return result.name;
    }
    throw new Error("There are no letters in the queue!");
  }

  isEmpty(): boolean {
    return this.giftList.length === 0;
  }
}
