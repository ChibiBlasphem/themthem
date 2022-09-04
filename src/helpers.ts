import type { Themthem, TokenPath } from './token-box';

export type Segments<Keys extends string> = Keys extends `${infer Key}.${infer RestKeys}`
  ? RestKeys extends `$default`
    ? Key
    : RestKeys extends `$${infer R}`
    ? `${Key}__${Segments<R>}`
    : `${Key}-${Segments<RestKeys>}`
  : Keys;

export type ThemthemGlobalVariableName<
  Box extends object,
  Keys extends TokenPath<Box>,
> = `--global-${Segments<Keys>}`;

export type ThemthemComponentVariableName<
  Box extends object,
  Keys extends TokenPath<Box>,
> = `--component-${Segments<Keys>}`;

export type DefaultValuePart<DefaultValue extends string | undefined> = DefaultValue extends
  | ''
  | undefined
  ? ''
  : `, ${DefaultValue}`;

export type ThemthemVariableUsage<
  Variable extends string,
  DefaultValue extends string | undefined,
> = `var(${Variable}${DefaultValuePart<DefaultValue>})`;

function variabilize<Path extends string>(path: Path): Segments<Path> {
  return path.split('.').reduce((acc, s) => {
    return s === '$default' ? acc : s.startsWith('$') ? `${acc}__${s.slice(1)}` : `${acc}-${s}`;
  }) as Segments<Path>;
}

export function gIdentifier<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['global']> = TokenPath<TI['global']>,
>(path: Path): ThemthemGlobalVariableName<TI['global'], Path> {
  return `--global-${variabilize(path)}`;
}

export function gVar<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['global']> = TokenPath<TI['global']>,
  DefaultValue extends string = string,
>(
  path: Path,
  defaultValue?: DefaultValue,
): ThemthemVariableUsage<ThemthemGlobalVariableName<TI['global'], Path>, DefaultValue> {
  return `var(${gIdentifier<TI, Path>(path)}${
    (defaultValue ? `, ${defaultValue}` : '') as DefaultValuePart<DefaultValue>
  })`;
}

export function cIdentifier<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['component']> = TokenPath<TI['component']>,
>(path: Path): ThemthemComponentVariableName<TI['component'], Path> {
  return `--component-${variabilize(path)}`;
}

export function cVar<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['component']> = TokenPath<TI['component']>,
  DefaultValue extends string = string,
>(
  path: Path,
  defaultValue?: DefaultValue,
): ThemthemVariableUsage<ThemthemComponentVariableName<TI['component'], Path>, DefaultValue> {
  return `var(${cIdentifier<TI, Path>(path)}${
    (defaultValue ? `, ${defaultValue}` : '') as DefaultValuePart<DefaultValue>
  })`;
}
