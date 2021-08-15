import { app } from 'electron';

export async function OnQuit(fn?: () => Promise<void>) {
  const state = {
    quitting: false,
  };
  app.on('before-quit', async () => {
    if (!state.quitting) {
      if (typeof fn === 'function') await fn();
      app.quit();
      state.quitting = true;
    }
  });
}
