import { DTBoxType, DTBoxKey, DesignToken, Themthem } from './token-box';

export type ThemthemToken<
  TType extends DTBoxType<T>,
  K extends DTBoxKey<TType, T> & string,
  TToken extends DesignToken<TType, K, T>,
  T extends Themthem = Themthem,
> = TType extends 'global' ? `--global-${K}-${TToken}` : `--${K}-${TToken}`;

export type ThemthemVariable<
  TType extends DTBoxType<T>,
  K extends DTBoxKey<TType, T> & string,
  TToken extends DesignToken<TType, K, T>,
  T extends Themthem = Themthem,
> = `var(${ThemthemToken<TType, K, TToken, T>})`;

export function cssToken<
  TType extends DTBoxType<T>,
  K extends DTBoxKey<TType, T> & string,
  TToken extends DesignToken<TType, K, T>,
  T extends Themthem = Themthem,
>(type: TType, key: K, token: TToken): ThemthemToken<TType, K, TToken, T> {
  return (
    type === 'global' ? `--global-${key}-${token}` : `--${key}-${token}`
  ) as ThemthemToken<TType, K, TToken, T>;
}

export function cssVariable<
  TType extends DTBoxType<T>,
  K extends DTBoxKey<TType, T> & string,
  TToken extends DesignToken<TType, K, T>,
  T extends Themthem = Themthem,
>(type: TType, key: K, token: TToken): ThemthemVariable<TType, K, TToken, T> {
  return `var(${cssToken<TType, K, TToken, T>(type, key, token)})`;
}
