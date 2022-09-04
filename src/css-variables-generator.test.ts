import { describe, it, expect } from 'vitest';
import {
  createComponentCSSVariablesGenerator,
  createGlobalCSSVariablesGenerator,
  generateGlobalCSSVariables,
} from './css-variables-generator';
import { gVar } from './helpers';

interface TestThemthem {
  global: {
    foo: { $values: ['bar'] };
    bar: {
      $values: ['baz'];
      color: {
        $modifiers: ['hover', 'disabled'];
      };
    };
  };
  component: {
    Foo: {
      $values: ['bar'];
      color: {
        $modifiers: ['hover', 'disabled'];
      };
    };
    Baz: { $values: ['baz'] };
  };
}

interface UsageTheme {
  global: {
    $values: ['uniqueToken'];
    palette: { $values: ['black', 'white', 'my-custom-color'] };
    tokens: {
      colors: { $values: ['default', 'accent'] };
      sizes: { $values: ['sm', 'md', 'lg', 'xl'] };
    };
  };
  component: {};
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
          color: {
            $default: 'default-color',
            $hover: 'hover-color',
            $disabled: 'disabled-color',
          },
        },
      }),
    ).toEqual([
      '--global-foo-bar: value;',
      '--global-bar-baz: other-value;',
      '--global-bar-color: default-color;',
      '--global-bar-color__hover: hover-color;',
      '--global-bar-color__disabled: disabled-color;',
    ]);

    const expected = [
      '--global-palette-black: #000;',
      '--global-palette-white: #fff;',
      '--global-palette-my-custom-color: #298af3;',
      '--global-tokens-colors-default: var(--global-palette-black);',
      '--global-tokens-colors-accent: var(--global-palette-my-custom-color);',
      '--global-tokens-sizes-sm: 4px;',
      '--global-tokens-sizes-md: 8px;',
      '--global-tokens-sizes-lg: 12px;',
      '--global-tokens-sizes-xl: 20px;',
      '--global-uniqueToken: #333;',
    ];

    expect(
      generateGlobalCSSVariables<UsageTheme>({
        palette: {
          black: '#000',
          white: '#fff',
          'my-custom-color': '#298af3',
        },
        tokens: {
          colors: {
            default: gVar<UsageTheme>('palette.black'),
            accent: gVar<UsageTheme>('palette.my-custom-color'),
          },
          sizes: {
            sm: '4px',
            md: '8px',
            lg: '12px',
            xl: '20px',
          },
        },
        uniqueToken: '#333',
      }),
    ).toEqual(expected);
  });
});

describe('createGlobalCSSVariableGenerator', () => {
  it('should returns a variable generator scoped to the path specified', () => {
    const fn = createGlobalCSSVariablesGenerator<TestThemthem, 'foo'>('foo');
    expect(fn).toBeInstanceOf(Function);

    expect(fn({ bar: 'value' })).toEqual(['--global-foo-bar: value;']);
  });
});

describe('createComponentCSSVariablesGenerator', () => {
  it('should returns a variable generator scoped to the path specified', () => {
    const fn = createComponentCSSVariablesGenerator<TestThemthem, 'Foo'>('Foo');
    expect(fn).toBeInstanceOf(Function);

    expect(
      fn({ bar: 'value', color: { $default: 'default', $hover: 'hover', $disabled: 'disabled' } }),
    ).toEqual([
      '--component-Foo-bar: value;',
      '--component-Foo-color: default;',
      '--component-Foo-color__hover: hover;',
      '--component-Foo-color__disabled: disabled;',
    ]);
  });
});
