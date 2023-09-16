import { program } from 'commander';
import { init } from './commands/init';

program
  .command('init')
  .description('Initialize themthem by setting up files and folders')
  .action(init);

program.parse();

export {};
