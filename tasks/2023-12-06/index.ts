export class OrderController {
  private machineList: Machine[] = [];

  registerMachine(machine: Machine) {
    this.machineList.push(machine);
  }

  setState(name: string) {
    if (this.machineList.length < 1) {
      throw new Error("Invalid state provided");
    } else {
      this.machineList.forEach((machine) => {
        machine.setState(name);
        machine.incrementOrder(name);
      });
    }
  }

  unregisterMachine(machineToUnregister: Machine) {
    this.machineList = this.machineList.filter(
      (machine) => machine !== machineToUnregister
    );
  }
}

export class Machine {
  private _state: string | null = null;
  private _orderNumber = 0;
  private _orderHistory: string[] = [];

  get state(): string | null {
    return this._state;
  }

  setState(state: string) {
    this._state = state;
  }

  incrementOrder(name: string) {
    this._orderNumber++;
    this._orderHistory.push(`Order #${this._orderNumber} - ${name}`);
  }

  performAudit() {
    return this._orderHistory;
  }
}
