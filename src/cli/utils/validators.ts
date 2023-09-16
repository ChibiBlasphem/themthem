import { existsSync, lstatSync, readdirSync } from 'fs';

export function validateFile(path: string) {
  if (existsSync(path)) {
    return 'File already exists';
  }
  return true;
}

export function validateDirectory(path: string) {
  if (!existsSync(path)) {
    return true;
  }
  if (!lstatSync(path).isDirectory()) {
    return 'Not a directory';
  }
  if (readdirSync(path).length > 0) {
    return 'Directory is not empty';
  }

  return true;
}
