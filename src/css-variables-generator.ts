import type { PartialTokenPath, Themthem, TokenPath } from './token-box';
import { cIdentifier, gIdentifier } from './helpers';
import { getKeys } from './utils';

export type GeneratorConfig<Box extends object> = Box extends string[]
  ? { [Key in Box[number]]+?: string }
  : {
      [Key in keyof Box & string]+?: Box[Key] extends object ? GeneratorConfig<Box[Key]> : never;
    };

export type CSSVariableGenerator<Box extends object> = (config: GeneratorConfig<Box>) => string[];

export type TokenBoxFromPath<
  Path extends string,
  Box extends object,
> = Path extends `${infer Segment}.${infer Rest}`
  ? Segment extends keyof Box
    ? Box[Segment] extends object
      ? TokenBoxFromPath<Rest, Box[Segment]>
      : never
    : never
  : Path extends keyof Box
  ? Box[Path]
  : never;

function generateAssignments(
  path: string,
  box: Record<string, any> | string,
): { path: string; value: string }[] {
  if (typeof box === 'string') {
    return [{ path, value: box }];
  }

  const assignments = [];
  for (const key of getKeys(box)) {
    assignments.push(
      ...generateAssignments(path ? (key !== '' ? `${path}.${key}` : path) : key, box[key]),
    );
  }
  return assignments;
}

export function generateGlobalCSSVariables<TI extends Themthem = Themthem>(
  config: GeneratorConfig<TI['global']>,
): string[] {
  const assignments = generateAssignments('', config);
  const stringAssignments: string[] = [];

  for (const { path, value } of assignments) {
    stringAssignments.push(`${gIdentifier<TI>(path as TokenPath<TI['global']>)}: ${value};`);
  }

  return stringAssignments;
}

export function createGlobalCSSVariablesGenerator<
  TI extends Themthem = Themthem,
  Path extends PartialTokenPath<TI['global']> = PartialTokenPath<TI['global']>,
>(
  p: Path,
): CSSVariableGenerator<
  TokenBoxFromPath<Path, TI['global']> extends object ? TokenBoxFromPath<Path, TI['global']> : never
> {
  return (config) => {
    const assignments = generateAssignments(p, config);
    const stringAssignments: string[] = [];

    for (const { path, value } of assignments) {
      stringAssignments.push(`${gIdentifier<TI>(path as TokenPath<TI['global']>)}: ${value};`);
    }

    return stringAssignments;
  };
}

export function createComponentCSSVariablesGenerator<
  TI extends Themthem = Themthem,
  Key extends keyof TI['component'] & string = keyof TI['component'] & string,
>(
  key: Key,
): CSSVariableGenerator<
  TokenBoxFromPath<Key, TI['component']> extends object
    ? TokenBoxFromPath<Key, TI['component']>
    : never
> {
  return (config) => {
    const assignments = generateAssignments(key, config);
    const stringAssignments: string[] = [];

    for (const { path, value } of assignments) {
      stringAssignments.push(`${cIdentifier<TI>(path as TokenPath<TI['component']>)}: ${value};`);
    }

    return stringAssignments;
  };
}
