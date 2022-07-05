/// <reference path="../interfaces.d.ts" />

export interface Themthem {
  global: GlobalDesignTokenBox;
  component: ComponentDesignTokenBox;
}

export type TokenType = keyof Themthem;

export type TokenBox<T extends TokenType> = Themthem[T];
export type TokenBoxKey<T extends TokenType> = keyof TokenBox<T>;

export type Tokens<
  T extends TokenType,
  C extends TokenBoxKey<T>,
> = TokenBox<T>[C];
export type Token<T extends TokenType, C extends TokenBoxKey<T>> = Tokens<
  T,
  C
> extends string[]
  ? Tokens<T, C>[number]
  : never;
