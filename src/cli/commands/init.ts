// import { cwd } from 'process';
// import { resolve } from 'path';
import { program } from 'commander';
import inquirer from 'inquirer';
import { /* createFile, */ getPackageJson, writePackageJson } from '../utils/files';
import { validateDirectory, validateFile } from '../utils/validators';

/**
 * Init command initialize the project by asking in which file it stores
 * global interface and in which folder it stores components interfaces
 */
export async function init() {
  const packageJson = getPackageJson(program);
  const { themthem } = packageJson;

  if (themthem?.global && themthem?.components) {
    // TODO: Warn about config already existing
    console.log(themthem);
  }

  // Ask for global interface file
  // Ask for components interfaces folder
  const prompt = inquirer.createPromptModule();
  const responses = await prompt([
    {
      type: 'input',
      name: 'globalFile',
      default: 'themthem-interface.d.ts',
      message: 'Chose global interface file',
      validate: validateFile,
    },
    {
      type: 'input',
      name: 'componentsFolder',
      default: 'themthem-components',
      message: 'Chose components interfaces folder',
      validate: validateDirectory,
    },
  ]);

  // Storing it in packageJSON.themthem
  packageJson.themthem = responses;
  writePackageJson(program, packageJson);

  // Create files

  // await createFile(program, resolve(cwd(), './fake/themthem-interface.d.ts'), '', async (code) => {
  //   console.log('break', code);
  //   return false;
  // });
}
