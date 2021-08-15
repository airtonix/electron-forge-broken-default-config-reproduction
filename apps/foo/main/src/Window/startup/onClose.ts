import { app } from 'electron';

export function OnAllWindowClose(fn?: () => void) {
  try {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
        if (typeof fn === 'function') fn();
      }
    });
  } catch (error) {
    console.error('Problem with electron window close');
    console.error(error);
  }
}
