import { describe, it, expect } from 'vitest';
import { gIdentifier, gVar, cIdentifier, cVar } from './helpers';

interface TestThemthem {
  global: {
    foo: { $values: ['bar'] };
    bar: { $values: ['baz'] };
    baz: {
      test: { $values: ['foo'] };
    };
  };
  component: {
    Foo: { $values: ['bar'] };
    Bar: { $values: ['baz'] };
    Baz: {
      test: { $values: ['foo'] };
      foo: {
        $modifiers: ['mod1', 'mod2'];
      };
    };
  };
}

describe('global', () => {
  describe('globalCSSVariable', () => {
    it('should return the variable usage formed from the path', () => {
      expect(gVar<TestThemthem, 'foo.bar'>('foo.bar')).toBe('var(--global-foo-bar)');
      expect(gVar<TestThemthem, 'bar.baz'>('bar.baz')).toBe('var(--global-bar-baz)');
      expect(gVar<TestThemthem, 'baz.test.foo'>('baz.test.foo')).toBe('var(--global-baz-test-foo)');
      expect(gVar<TestThemthem, 'baz.test.foo', '22px'>('baz.test.foo', '22px')).toBe(
        'var(--global-baz-test-foo, 22px)',
      );
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
      expect(cVar<TestThemthem, 'Bar.baz'>('Bar.baz')).toBe('var(--component-Bar-baz)');
      expect(cVar<TestThemthem, 'Baz.test.foo'>('Baz.test.foo')).toBe(
        'var(--component-Baz-test-foo)',
      );
      expect(cVar<TestThemthem, 'Baz.foo.$mod1'>('Baz.foo.$mod1')).toBe(
        'var(--component-Baz-foo__mod1)',
      );
      expect(cVar<TestThemthem, 'Baz.foo'>('Baz.foo')).toBe('var(--component-Baz-foo)');
      expect(cVar<TestThemthem, 'Baz.test.foo', '10px'>('Baz.test.foo', '10px')).toBe(
        'var(--component-Baz-test-foo, 10px)',
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
