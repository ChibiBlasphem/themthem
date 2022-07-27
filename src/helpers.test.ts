import { describe, it, expect } from 'vitest';
import { gIdentifier, gVar, cIdentifier, cVar } from './helpers';

interface TestThemthem {
  global: {
    foo: ['bar'];
    bar: ['baz'];
    baz: {
      test: ['foo'];
    };
  };
  component: {
    Foo: ['bar'];
    Bar: ['baz'];
    Baz: {
      test: ['foo'];
    };
  };
}

describe('global', () => {
  describe('globalCSSVariable', () => {
    it('should return the variable usage formed from the path', () => {
      expect(gVar<TestThemthem, 'foo.bar'>('foo.bar')).toBe('var(--global-foo-bar)');
      expect(gVar<TestThemthem, 'baz.test.foo'>('baz.test.foo')).toBe('var(--global-baz-test-foo)');
    });
  });

  describe('globalCSSVariableIdentifier', () => {
    it('should return the variable usage formed from the path', () => {
      expect(gIdentifier<TestThemthem, 'foo.bar'>('foo.bar')).toBe('--global-foo-bar');
      expect(gIdentifier<TestThemthem, 'baz.test.foo'>('baz.test.foo')).toBe(
        '--global-baz-test-foo',
      );
    });
  });
});

describe('component', () => {
  describe('componentCSSVariable', () => {
    it('should return the variable usage formed from the path', () => {
      expect(cVar<TestThemthem, 'Foo.bar'>('Foo.bar')).toBe('var(--component-Foo-bar)');
      expect(cVar<TestThemthem, 'Baz.test.foo'>('Baz.test.foo')).toBe(
        'var(--component-Baz-test-foo)',
      );
    });
  });

  describe('componentCSSVariableIdentifier', () => {
    it('should return the variable usage formed from the path', () => {
      expect(cIdentifier<TestThemthem, 'Foo.bar'>('Foo.bar')).toBe('--component-Foo-bar');
      expect(cIdentifier<TestThemthem, 'Baz.test.foo'>('Baz.test.foo')).toBe(
        '--component-Baz-test-foo',
      );
    });
  });
});
