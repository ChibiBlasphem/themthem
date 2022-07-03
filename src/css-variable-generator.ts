import type {
  GlobalDesignTokenBox as GDT,
  ComponentDesignTokenBox as CDT,
  TokenBoxKey,
  Token,
} from './token-box';
import type { ThemthemVariable } from './helpers';
import { cssToken } from './helpers';
import { getKeys } from './utils';

export type Source<C extends keyof GDT | keyof CDT> = C extends keyof GDT
  ? GDT[C]
  : C extends keyof CDT
  ? CDT[C]
  : never;

export type Tuple<
  C extends keyof GDT | keyof CDT = keyof GDT | keyof CDT,
  T extends Source<C>[number] = Source<C>[number],
> = [C, T];

export type ExtractVariable<T extends Tuple> = T extends Tuple<
  infer C,
  infer CT
>
  ? C extends TokenBoxKey<'global'>
    ? CT extends Token<'global', C>
      ? ThemthemVariable<'global', C, CT>
      : never
    : C extends TokenBoxKey<'component'>
    ? CT extends Token<'component', C>
      ? ThemthemVariable<'component', C, CT>
      : never
    : never
  : never;

export type ConfigTuple<K extends string = string, T extends Tuple = Tuple> = [
  K,
  T,
];

export type Merge<T> = { [K in keyof T]: T[K] };

export type TupleToObject<T extends ConfigTuple> = T extends ConfigTuple<
  infer K,
  infer F
>
  ? { [P in K]: ExtractVariable<F> }
  : never;

export type Config<
  C extends TokenBoxKey<'component'>,
  T extends ConfigTuple<Token<'component', C>>[],
> = T extends [infer F extends ConfigTuple]
  ? TupleToObject<F>
  : T extends [
      infer F extends ConfigTuple,
      ...infer Rest extends ConfigTuple<Token<'component', C>>[],
    ]
  ? Merge<TupleToObject<F> & Config<C, Rest>>
  : never;

export function createCSSVariableGenerator<C extends TokenBoxKey<'component'>>(
  component: C,
) {
  return function generateCSSVariables<CC extends Config<C, any>>(config: CC) {
    const variables: string[] = [];
    for (const key of getKeys(config)) {
      variables.push(
        `${cssToken('component', component, key as Token<'component', C>)}: ${
          config[key]
        };`,
      );
    }
    return variables;
  };
}

export function generateGlobalCSSVariables<
  K extends TokenBoxKey<'global'>,
  T extends Token<'global', K>,
>(config: {
  [k in K]: {
    [t in T]: string;
  };
}) {
  const variables: string[] = [];
  for (const key of getKeys(config)) {
    for (const token of getKeys(config[key])) {
      variables.push(
        `${cssToken('global', key, token as Token<K, T>)}: ${
          config[key][token]
        };`,
      );
    }
  }
  return variables;
}
