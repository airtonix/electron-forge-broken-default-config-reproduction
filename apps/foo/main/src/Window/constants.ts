import { resolve } from 'path';
export { name as APPLICATION_NAME } from '../../../package.json';

export const IS_PROD: boolean = process.env.NODE_ENV === 'production';
export const APPLICATION_ICON = resolve(
  __dirname,
  '../../../resources/logo.png'
);
