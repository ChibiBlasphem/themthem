import { Expect, Equal } from './utils';
import { TokenPath } from '../token-box';

type interface1 = { test: ['a'] };
type interface2 = { test: { foo: ['bar', 'baz'] } };
type interface3 = { test: { foo: ['bar'] }; test2: { bar: ['baz'] } };
type interface4 = { test: ['', 'abc'] };

type expected1 = 'test.a';
type expected2 = 'test.foo.bar' | 'test.foo.baz';
type expected3 = 'test.foo.bar' | 'test2.bar.baz';
type expected4 = 'test' | 'test.abc';

export type cases = [
  Expect<Equal<TokenPath<interface1>, expected1>>,
  Expect<Equal<TokenPath<interface2>, expected2>>,
  Expect<Equal<TokenPath<interface3>, expected3>>,
  Expect<Equal<TokenPath<interface4>, expected4>>,
];
