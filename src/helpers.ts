import type { Themthem, TokenPath } from './token-box';

export type Segments<Keys extends string> = Keys extends `${infer Key}.${infer RestKeys}`
  ? `${Key}-${Segments<RestKeys>}`
  : Keys;

export type ThemthemGlobalVariable<
  Box extends object,
  Keys extends TokenPath<Box>,
> = `--global-${Segments<Keys>}`;

export type ThemthemComponentVariable<
  Box extends object,
  Keys extends TokenPath<Box>,
> = `--component-${Segments<Keys>}`;

export type ThemthemVariableUsage<Variable extends string> = `var(${Variable})`;

export function gIdentifier<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['global']> = TokenPath<TI['global']>,
>(path: Path): ThemthemGlobalVariable<TI['global'], Path> {
  const token = path.split('.').join('-') as Segments<Path>;
  return `--global-${token}`;
}

export function gVar<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['global']> = TokenPath<TI['global']>,
>(path: Path): ThemthemVariableUsage<ThemthemGlobalVariable<TI['global'], Path>> {
  return `var(${gIdentifier<TI, Path>(path)})`;
}

export function cIdentifier<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['component']> = TokenPath<TI['component']>,
>(path: Path): ThemthemComponentVariable<TI['component'], Path> {
  const token = path.split('.').join('-') as Segments<Path>;
  return `--component-${token}`;
}

export function cVar<
  TI extends Themthem = Themthem,
  Path extends TokenPath<TI['component']> = TokenPath<TI['component']>,
>(path: Path): ThemthemVariableUsage<ThemthemComponentVariable<TI['component'], Path>> {
  return `var(${cIdentifier<TI, Path>(path)})`;
}
