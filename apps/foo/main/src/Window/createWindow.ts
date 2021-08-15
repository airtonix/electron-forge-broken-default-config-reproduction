import { Window } from './Window';
import { APPLICATION_ICON, APPLICATION_NAME } from './constants';
import { app } from 'electron';

export async function CreateMainWindow() {
  return Window.create(APPLICATION_NAME, {
    width: 1000,
    height: 600,
    icon: APPLICATION_ICON,
    webPreferences: {
      webSecurity: false,
    },
  });
}

export async function CreateAppWindow(entry: string) {
  try {
    await app.whenReady()
    const main = await CreateMainWindow();
    await main.window.loadURL(entry);
    return main;
  } catch (error) {
    console.error('Problem with electron window creation');
    console.error(error);
  }
}
