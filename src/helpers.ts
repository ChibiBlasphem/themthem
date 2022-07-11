import { DTBoxType, DTBoxKey, DesignToken } from './token-box';

export type ThemthemToken<
  Type extends DTBoxType,
  K extends DTBoxKey<Type> & string,
  TToken extends DesignToken<Type, K>,
> = Type extends 'global' ? `--global-${K}-${TToken}` : `--${K}-${TToken}`;

export type ThemthemVariable<
  Type extends DTBoxType,
  K extends DTBoxKey<Type> & string,
  TToken extends DesignToken<Type, K>,
> = `var(${ThemthemToken<Type, K, TToken>})`;

export function cssToken<
  Type extends DTBoxType,
  K extends DTBoxKey<Type> & string,
  TToken extends DesignToken<Type, K>,
>(type: Type, key: K, token: TToken): ThemthemToken<Type, K, TToken> {
  return (
    type === 'global' ? `--global-${key}-${token}` : `--${key}-${token}`
  ) as ThemthemToken<Type, K, TToken>;
}

export function cssVariable<
  Type extends DTBoxType,
  K extends DTBoxKey<Type> & string,
  TToken extends DesignToken<Type, K>,
>(type: Type, key: K, token: TToken): ThemthemVariable<Type, K, TToken> {
  return `var(${cssToken(type, key, token)})`;
}
