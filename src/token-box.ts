/// <reference path="../interfaces.d.ts" />

export interface Themthem {
  global: GlobalDesignTokenBox;
  component: ComponentDesignTokenBox;
}

export type BareToken<Box> = Box extends string[] ? Exclude<Box[number], ''> : TokenPath<Box>;

export type TokenPath<Box> = Box extends string[]
  ? Box[number]
  : Box extends object
  ? {
      [Key in keyof Box]: Key extends string
        ? '' extends TokenPath<Box[Key]>
          ? `${Key}` | `${Key}.${BareToken<Box[Key]>}`
          : `${Key}.${TokenPath<Box[Key]>}`
        : never;
    }[keyof Box]
  : never;

type Prepend<Prefix extends string, Path extends string> = [Prefix] extends [never]
  ? `${Path}`
  : `${Prefix}.${Path}`;

export type PartialTokenPath<Box extends object, Prefix extends string = never> = Box extends any[]
  ? Prefix
  :
      | Prefix
      | {
          [Key in keyof Box & string]: Box[Key] extends object
            ? PartialTokenPath<Box[Key], Prepend<Prefix, Key>>
            : Prepend<Prefix, Key>;
        }[keyof Box & string];
