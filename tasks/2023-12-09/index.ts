export interface Tool {
  init: (...args: any) => any;
  update: (...args: any) => any;
  dispose: (...args: any) => any;
}

export interface ToolInEquipment {
  toolInstance: Tool;
  initialized: boolean;
}

export class Equipment {
  private listTool: ToolInEquipment[] = [];

  registerTools(newTool: Tool) {
    this.listTool.push({ toolInstance: newTool, initialized: false });
  }

  initializeTools() {
    this.listTool.forEach((tool) => {
      tool.toolInstance.init();
      tool.initialized = true;
    });
  }

  updateTools() {
    this.listTool.forEach((tool) => {
      if (!tool.initialized) {
        throw new Error("Cannot update any tools before initialization.");
      }
      tool.toolInstance.update();
    });
  }

  disposeTools() {
    this.listTool.forEach((tool) => {
      if (!tool.initialized) {
        throw new Error("Cannot dispose any tools before initialization.");
      }
      tool.toolInstance.dispose();
    });
  }
}
