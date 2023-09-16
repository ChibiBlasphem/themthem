import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { Command } from 'commander';
import { CliFileBreak } from '../errors';

function getPackageJsonContents(program: Command) {
  try {
    return readFileSync('./package.json', 'utf8');
  } catch {
    program.error('Could not find package.json');
    throw '';
  }
}

export function getPackageJson(program: Command) {
  const packageJsonContents = getPackageJsonContents(program);

  try {
    return JSON.parse(packageJsonContents);
  } catch (e: any) {
    program.error(`Could not parse package.json: ${e.message}`);
    throw '';
  }
}

export function writePackageJson(program: Command, contents: any) {
  try {
    const stringifiedContent = JSON.stringify(contents, null, 2);
    writeFileSync('./package.json', stringifiedContent);
  } catch {
    program.error('Something went wrong when trying to update package.json');
    throw '';
  }
}

export async function createFile(
  _program: Command,
  path: string,
  content: string,
  onBreak: (code: CliFileBreak) => Promise<boolean>,
) {
  if (existsSync(path)) {
    const response = await onBreak(CliFileBreak.FILE_EXISTS);
    if (!!response) {
      return;
    }
  }

  const dirPath = dirname(path);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  writeFileSync(path, content);
}
