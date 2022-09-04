import { Expect, Equal } from './utils';
import { PartialTokenPath } from '../token-box';

type interface1 = { test: { $values: ['a'] } };
type interface2 = { test: { foo: { $values: ['bar', 'baz'] } } };
type interface3 = { test: { foo: { $values: ['bar'] } }; test2: { bar: { $values: ['baz'] } } };
type interface4 = { test: { foo: { $modifiers: ['mod1', 'mod2'] } } };
type interface5 = { test: { foo: { $modifiers: ['mod1', 'mod2'] }; bar: { $values: ['baz'] } } };

type expected1 = 'test';
type expected2 = 'test' | 'test.foo';
type expected3 = 'test' | 'test.foo' | 'test2' | 'test2.bar';
type expected4 = 'test' | 'test.foo';
type expected5 = 'test' | 'test.foo' | 'test.bar';

export type cases = [
  Expect<Equal<PartialTokenPath<interface1>, expected1>>,
  Expect<Equal<PartialTokenPath<interface2>, expected2>>,
  Expect<Equal<PartialTokenPath<interface3>, expected3>>,
  Expect<Equal<PartialTokenPath<interface4>, expected4>>,
  Expect<Equal<PartialTokenPath<interface5>, expected5>>,
];
