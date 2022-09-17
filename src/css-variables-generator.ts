import type { PartialTokenPath, Themthem, TokenPath } from './token-box';
import { cIdentifier, gIdentifier } from './helpers';
import { getKeys } from './utils';

type BoxValues<Box> = {
  [k in '$values' extends keyof Box
    ? Box['$values'] extends string[]
      ? Box['$values'][number]
      : never
    : never]+?: string;
};

type BoxModifiers<Box> = {
  [k in '$modifiers' extends keyof Box
    ? Box['$modifiers'] extends string[]
      ? `$${Box['$modifiers'][number]}` | '$default'
      : never
    : never]+?: string;
};

export type GeneratorConfig<Box> = BoxValues<Box> &
  BoxModifiers<Box> & {
    [k in keyof (Omit<Box, '$values' | '$modifiers'> extends object
      ? Omit<Box, '$values' | '$modifiers'>
      : never)]+?: GeneratorConfig<Box[k]>;
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
  path: Path,
): CSSVariableGenerator<
  TokenBoxFromPath<Path, TI['global']> extends object ? TokenBoxFromPath<Path, TI['global']> : never
> {
  return (config) => {
    const assignments = generateAssignments(path, config);
    const stringAssignments: string[] = [];

    for (const { path, value } of assignments) {
      stringAssignments.push(`${gIdentifier<TI>(path as TokenPath<TI['global']>)}: ${value};`);
    }

    return stringAssignments;
  };
}

export function createComponentCSSVariablesGenerator<
  TI extends Themthem = Themthem,
  Path extends PartialTokenPath<TI['component']> = PartialTokenPath<TI['component']>,
>(
  path: Path,
): CSSVariableGenerator<
  TokenBoxFromPath<Path, TI['component']> extends object
    ? TokenBoxFromPath<Path, TI['component']>
    : never
> {
  return (config) => {
    const assignments = generateAssignments(path, config);
    const stringAssignments: string[] = [];

    for (const { path, value } of assignments) {
      stringAssignments.push(`${cIdentifier<TI>(path as TokenPath<TI['component']>)}: ${value};`);
    }

    return stringAssignments;
  };
}
