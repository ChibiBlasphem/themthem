import { TokenType, TokenBoxKey, Token } from './token-box';

export type ThemthemToken<
  Type extends TokenType,
  K extends TokenBoxKey<Type> & string,
  TToken extends Token<Type, K>,
> = Type extends 'global' ? `--global-${K}-${TToken}` : `--${K}-${TToken}`;

export type ThemthemVariable<
  Type extends TokenType,
  K extends TokenBoxKey<Type> & string,
  TToken extends Token<Type, K>,
> = `var(${ThemthemToken<Type, K, TToken>})`;

export function cssToken<
  Type extends TokenType,
  K extends TokenBoxKey<Type> & string,
  TToken extends Token<Type, K>,
>(type: Type, key: K, token: TToken): ThemthemToken<Type, K, TToken> {
  return (
    type === 'global' ? `--global-${key}-${token}` : `--${key}-${token}`
  ) as ThemthemToken<Type, K, TToken>;
}

export function cssVariable<
  Type extends TokenType,
  K extends TokenBoxKey<Type> & string,
  TToken extends Token<Type, K>,
>(type: Type, key: K, token: TToken): ThemthemVariable<Type, K, TToken> {
  return `var(${cssToken(type, key, token)})`;
}
