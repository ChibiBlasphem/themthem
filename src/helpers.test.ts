import { describe, it, expect } from 'vitest';
import { cssVariable } from './helpers';

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

describe('cssVariable', () => {
  it('should print the css variable usage by default', () => {
    expect(
      cssVariable<'global', 'foo', 'bar', TestThemthem>('global', 'foo', 'bar'),
    ).toBe('var(--global-foo-bar)');
    expect(
      cssVariable<'global', 'foo', 'bar', TestThemthem>(
        'global',
        'foo',
        'bar',
        {},
      ),
    ).toBe('var(--global-foo-bar)');
    expect(
      cssVariable<'global', 'foo', 'bar', TestThemthem>(
        'global',
        'foo',
        'bar',
        { bare: false },
      ),
    ).toBe('var(--global-foo-bar)');
  });

  it('should print the bare css variable when bare options is true', () => {
    expect(
      cssVariable<'global', 'foo', 'bar', TestThemthem>(
        'global',
        'foo',
        'bar',
        { bare: true },
      ),
    ).toBe('--global-foo-bar');
  });
});
