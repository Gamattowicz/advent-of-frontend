export class RateLimiter {
  constructor(private maxRequests: number, private intervalMs: number) {}

  private currentRequestNum = 0;
  private lastTimeRequest = 0;

  attemptAccess(): boolean {
    const currentTime = Date.now();

    if (currentTime - this.lastTimeRequest > this.intervalMs) {
      this.lastTimeRequest = currentTime;
      this.currentRequestNum = 0;
    }
    if (this.currentRequestNum < this.maxRequests) {
      this.currentRequestNum++;
      return true;
    }
    return false;
  }
}
