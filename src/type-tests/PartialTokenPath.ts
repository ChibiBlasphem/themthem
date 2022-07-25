import { Expect, Equal } from './utils';
import { PartialTokenPath } from '../token-box';

type interface1 = { test: ['a'] };
type interface2 = { test: { foo: ['bar', 'baz'] } };
type interface3 = { test: { foo: ['bar'] }; test2: { bar: ['baz'] } };

type expected1 = 'test';
type expected2 = 'test' | 'test.foo';
type expected3 = 'test' | 'test.foo' | 'test2' | 'test2.bar';

export type cases = [
  Expect<Equal<PartialTokenPath<interface1>, expected1>>,
  Expect<Equal<PartialTokenPath<interface2>, expected2>>,
  Expect<Equal<PartialTokenPath<interface3>, expected3>>,
];
