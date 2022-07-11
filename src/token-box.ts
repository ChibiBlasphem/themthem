/// <reference path="../interfaces.d.ts" />

export interface Themthem {
  global: GlobalDesignTokenBox;
  component: ComponentDesignTokenBox;
}

export type DTBoxType<T extends Themthem = Themthem> = keyof T;

export type DTBox<
  TType extends DTBoxType<T>,
  T extends Themthem = Themthem,
> = T[TType];

export type DTBoxKey<
  TType extends DTBoxType<T>,
  T extends Themthem = Themthem,
> = keyof DTBox<TType, T>;

export type DesignTokens<
  TType extends DTBoxType<T>,
  C extends DTBoxKey<TType, T>,
  T extends Themthem = Themthem,
> = DTBox<TType, T>[C];

export type DesignToken<
  TType extends DTBoxType<T>,
  C extends DTBoxKey<TType, T>,
  T extends Themthem = Themthem,
> = DesignTokens<TType, C, T> extends string[]
  ? DesignTokens<TType, C, T>[number]
  : never;
