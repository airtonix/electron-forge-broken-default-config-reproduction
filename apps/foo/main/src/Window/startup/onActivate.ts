import { app, BrowserWindow } from 'electron';
import { CreateMainWindow } from '../createWindow';

export async function OnAppActivate() {
  try {
    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        CreateMainWindow();
      }
    });
  } catch (error) {
    console.error('Problem with electron window activation');
    console.error(error);
  }
}
