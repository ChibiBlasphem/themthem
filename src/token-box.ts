/// <reference path="../interfaces.d.ts" />

export interface Themthem {
  global: GlobalDesignTokenBox;
  component: ComponentDesignTokenBox;
}

export type SimpleBox<Box> = Omit<Box, '$values' | '$modifiers'>;

export type TokenPath<Box> =
  | ('$values' extends keyof Box
      ? Box['$values'] extends string[]
        ? Box['$values'][number]
        : never
      : never)
  | ('$modifiers' extends keyof Box
      ? Box['$modifiers'] extends string[]
        ? `$${Box['$modifiers'][number]}`
        : never
      : never)
  | (Box extends object
      ? {
          [Key in keyof SimpleBox<Box>]: Key extends string
            ? SimpleBox<Box>[Key] extends object
              ? TokenPath<SimpleBox<Box>[Key]> extends `$${infer Modifier}`
                ? Key | `${Key}.$${Modifier}`
                : `${Key}.${TokenPath<SimpleBox<Box>[Key]>}`
              : never
            : never;
        }[keyof SimpleBox<Box>]
      : never);

type Prepend<Prefix extends string, Path extends string> = [Prefix] extends [never]
  ? `${Path}`
  : `${Prefix}.${Path}`;

export type PartialTokenPath<Box extends object, Prefix extends string = never> = Box extends any[]
  ? Prefix
  :
      | Prefix
      | {
          [Key in keyof Omit<Box, '$values' | '$modifiers'> & string]: Box[Key] extends object
            ? PartialTokenPath<Box[Key], Prepend<Prefix, Key>>
            : Prepend<Prefix, Key>;
        }[keyof Omit<Box, '$values' | '$modifiers'> & string];
