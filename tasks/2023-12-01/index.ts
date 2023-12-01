type Gift = {
  id: number;
  gift_name: string;
};

export class GiftRegistry {
  private giftList: Gift[] = [];

  addGift(id: number, gift_name: string): void {
    this.giftList.push({ id, gift_name });
  }

  removeGift(id: number, gift_name: string): void {
    let deleted = false;

    this.giftList.forEach((gift, index) => {
      if (gift.id === id && gift.gift_name === gift_name) {
        this.giftList.splice(index, 1);
        deleted = true;
      }
    });

    if (!deleted) {
      throw new Error("Gift not found");
    }
  }

  getGiftsForChild(id: number): string[] {
    let gifts: string[] = [];

    this.giftList.forEach((gift) => {
      if (gift.id === id) {
        gifts.push(gift.gift_name);
      }
    });

    return gifts;
  }
}
