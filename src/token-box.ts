/// <reference path="../interfaces.d.ts" />

export interface Themthem {
  global: GlobalDesignTokenBox;
  component: ComponentDesignTokenBox;
}

export type DTBoxType<ThemeInterface extends Themthem = Themthem> =
  keyof ThemeInterface;

export type DTBox<
  Type extends DTBoxType<ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
> = ThemeInterface[Type];

export type DTBoxKey<
  Type extends DTBoxType<ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
> = keyof DTBox<Type, ThemeInterface>;

export type DesignTokens<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
> = DTBox<Type, ThemeInterface>[Key];

export type DesignToken<
  Type extends DTBoxType<ThemeInterface>,
  Key extends DTBoxKey<Type, ThemeInterface>,
  ThemeInterface extends Themthem = Themthem,
> = DesignTokens<Type, Key, ThemeInterface> extends string[]
  ? DesignTokens<Type, Key, ThemeInterface>[number]
  : never;
