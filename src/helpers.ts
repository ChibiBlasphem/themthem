import { DTBoxType, DTBoxKey, DesignToken, Themthem } from './token-box';

export type ThemthemVariable<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface> & string,
  Token extends DesignToken<Type, Key, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
> = Type extends 'global' ? `--global-${Key}-${Token}` : `--${Key}-${Token}`;

export type ThemthemVariableUsage<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface> & string,
  Token extends DesignToken<Type, Key, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
> = `var(${ThemthemVariable<Type, Key, Token, ThemeInterface>})`;

export function cssVariable<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface> & string,
  Token extends DesignToken<Type, Key, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
>(
  type: Type,
  key: Key,
  token: Token,
  options: { bare: true },
): ThemthemVariable<Type, Key, Token, ThemeInterface>;
export function cssVariable<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface> & string,
  Token extends DesignToken<Type, Key, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
>(
  type: Type,
  key: Key,
  token: Token,
  options?: { bare?: false },
): ThemthemVariableUsage<Type, Key, Token, ThemeInterface>;
export function cssVariable<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface> & string,
  Token extends DesignToken<Type, Key, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
>(
  type: Type,
  key: Key,
  token: Token,
  { bare = false }: { bare?: boolean } = {},
):
  | ThemthemVariable<Type, Key, Token, ThemeInterface>
  | ThemthemVariableUsage<Type, Key, Token, ThemeInterface> {
  const variable = (
    type === 'global' ? `--global-${key}-${token}` : `--${key}-${token}`
  ) as ThemthemVariable<Type, Key, Token, ThemeInterface>;

  return bare ? variable : `var(${variable})`;
}
