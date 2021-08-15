import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  screen,
} from 'electron';

export type BrowserWindowStatePosition = {
  x: number;
  y: number;
};
export type BrowserWindowStateSize = {
  width: number;
  height: number;
};

export type BrowserWindowState = BrowserWindowStatePosition &
  BrowserWindowStateSize;

export class Window {
  private static instances: Record<string, Window> = {};

  public static create(
    windowName: string,
    windowOptions: BrowserWindowConstructorOptions
  ): Window {
    return new Window(windowName, windowOptions);
  }

  public static remove(windowName: string) {
    if (this.isInitialized(windowName)) {
      delete this.instances[windowName];
    }
  }

  public static getInstance(windowName: string) {
    if (this.isInitialized(windowName)) {
      return this.instances[windowName];
    }
  }

  public static isInitialized(windowName: string) {
    return !!this.instances[windowName];
  }

  public name: string;
  public key: string;
  public size: BrowserWindowStateSize;
  public state: BrowserWindowState;
  public window: BrowserWindow;

  constructor(
    windowName: string,
    windowOptions: BrowserWindowConstructorOptions
  ) {
    this.key = 'window-state';
    this.name = `window-state-${windowName}`;
    this.size = {
      width: windowOptions.width || 0,
      height: windowOptions.height || 0,
    };
    this.state = {x: 0, y: 0, width: 720, height: 1080};

    this.window = new BrowserWindow({
      ...this.size,
      ...windowOptions,
      ...this.state,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        ...(windowOptions.webPreferences || {}),
      },
    });
    this.window.on('close', this.saveState);
    this.window.on('closed', this.onClosed);
    this.window.on('close', this.onClose);
  }
  restore = () => {}

  onClose = (event) => {
    if (this.window.webContents.isFocused() && this.window.isVisible()) {
      event.preventDefault();
      this.window.hide();
    }
  };
  onClosed = () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    delete Window.instances[this.name];
  };
  getCurrentPosition = (): BrowserWindowStateSize &
    BrowserWindowStatePosition => {
    const position = this.window.getPosition();
    const size = this.window.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  windowWithinBounds = (bounds: BrowserWindowState) => {
    return (
      this.state.x >= bounds.x &&
      this.state.y >= bounds.y &&
      this.state.x + this.state.width <= bounds.x + bounds.width &&
      this.state.y + this.state.height <= bounds.y + bounds.height
    );
  };

  ensureVisibleOnSomeDisplay = (windowState: BrowserWindowState) => {
    this.state = windowState;
    const visible = screen.getAllDisplays().some((display) => {
      return this.windowWithinBounds(display.bounds);
    });

    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return this.resetToDefaults();
    }

    return this.state;
  };

  resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, this.size, {
      x: (bounds.width - this.size.width) / 2,
      y: (bounds.height - this.size.height) / 2,
    });
  };

  saveState = () => {
    if (!this.window.isMinimized() && !this.window.isMaximized()) {
      Object.assign(this.state, this.getCurrentPosition());
    }
  };
}
