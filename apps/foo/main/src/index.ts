import {
    OnAllWindowClose,
    OnAppActivate,
    OnQuit,
    CreateAppWindow,
  } from './Window';

  declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

  async function bootstrap() {
    await CreateAppWindow(MAIN_WINDOW_WEBPACK_ENTRY);

    OnAllWindowClose();
    OnQuit();
    OnAppActivate();
  }

  bootstrap();
