const { replaceInFileSync } = require('replace-in-file');

replaceInFileSync({
  files: ['dist/*.d.ts'],
  from: /CC extends {\s*.*\s*}/gm,
  to: 'CC extends Config<C, any>',
});
