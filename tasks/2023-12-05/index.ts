interface EventFn {
  fnCallback: (...args: any[]) => any;
}

export class ChristmasEmitter {
  private eventMap = new Map<string, EventFn[]>();

  on(name: string, fn: (...args: any[]) => any) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, []);
    }
    const events = this.eventMap.get(name)!;
    events.push({ fnCallback: fn });
  }

  off(name: string, fn: (...args: any[]) => any) {
    const events = this.eventMap.get(name);
    if (events) {
      this.eventMap.set(
        name,
        events.filter((event) => event.fnCallback !== fn)
      );
    }
  }

  emit(name: string, ...args: any[]) {
    const events = this.eventMap.get(name);
    if (events) {
      events.forEach((event) => {
        try {
          event.fnCallback(...args);
        } catch (error) {
          console.error(`Error in event handler for ${name}:`, error);
        }
      });
    }
  }
}
