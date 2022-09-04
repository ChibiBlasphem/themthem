import { Expect, Equal } from './utils';
import { TokenPath } from '../token-box';

type interface1 = { test: { $values: ['a'] } };
type interface2 = { test: { foo: { $values: ['bar', 'baz'] } } };
type interface3 = { test: { foo: { $values: ['bar'] } }; test2: { bar: { $values: ['baz'] } } };
type interface4 = { test: { foo: { $modifiers: ['mod1', 'mod2'] } } };
type interface5 = { test: { foo: { $modifiers: ['mod1', 'mod2'] }; bar: { $values: ['baz'] } } };

type expected1 = 'test.a';
type expected2 = 'test.foo.bar' | 'test.foo.baz';
type expected3 = 'test.foo.bar' | 'test2.bar.baz';
type expected4 = 'test.foo' | 'test.foo.$mod1' | 'test.foo.$mod2';
type expected5 = 'test.foo' | 'test.foo.$mod1' | 'test.foo.$mod2' | 'test.bar.baz';

export type cases = [
  Expect<Equal<TokenPath<interface1>, expected1>>,
  Expect<Equal<TokenPath<interface2>, expected2>>,
  Expect<Equal<TokenPath<interface3>, expected3>>,
  Expect<Equal<TokenPath<interface4>, expected4>>,
  Expect<Equal<TokenPath<interface5>, expected5>>,
];
