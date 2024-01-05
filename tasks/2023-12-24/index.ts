abstract class Component {
  constructor(state: Record<string, any> = {}, style: string = "") {
    this.state = state;
    this.style = style;
  }

  state: Record<string, any>;

  style: string;

  setState(newState: Record<string, any>): void {
    this.state = { ...this.state, ...newState };
  }

  abstract template(): string;
}

function renderComponent(component: Component): string {
  return component.template();
}

export { Component, renderComponent };
