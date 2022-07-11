import {
  createCSSVariableGenerator,
  generateGlobalCSSVariables,
} from './css-variable-generator';
import { describe, it, expect } from 'vitest';

interface TestThemthem {
  global: {
    foo: ['bar'];
    bar: ['baz'];
  };
  component: {
    Foo: ['bar'];
    Baz: ['baz'];
  };
}

describe('generateGlobalCSSVariables', () => {
  it('should returns an array of css variable affections', () => {
    expect(
      generateGlobalCSSVariables<TestThemthem>({
        foo: {
          bar: 'value',
        },
        bar: {
          baz: 'other-value',
        },
      }),
    ).toEqual(['--global-foo-bar: value;', '--global-bar-baz: other-value;']);
  });
});

describe('createCSSVariableGenerator', () => {
  it('should return a function', () => {
    const result = createCSSVariableGenerator<'Foo', TestThemthem>('Foo');
    expect(result).toBeInstanceOf(Function);
  });

  it('should returns an array of css variable affections', () => {
    const generateCSSVariables = createCSSVariableGenerator<
      'Foo',
      TestThemthem
    >('Foo');

    expect(
      generateCSSVariables({
        bar: 'value',
      }),
    ).toEqual(['--Foo-bar: value;']);
  });
});
