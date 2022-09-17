# Themthem

![License: MIT](https://img.shields.io/npm/l/themthem)

Themthem (pronounced like "temtem" `/temtem/`) is a library of tools which lets you manage your CSS variables and tokens based on a Typescript interface.

## Work In Progress

> Note that themthem API is currently not stable and can or will be changed until it's in a stable version 1.

## Install

```shell
npm install --save themthem
```

or using yarn

```shell
yarn add themthem
```

## Usage

For a better usage of `themthem` it's recommended to use TypeScript.  
All the helpers of the API are based on type to augment from `themthem`.

### Define your global design tokens

In the root of your sources (eg: `./src`) create a `themthem-interfaces.d.ts` and augment the `GlobalDesignTokenBox` interface of `themthem`.

```ts
/// <reference types="themthem/interfaces" />

interface GlobalDesignTokenBox {
  // This is a Values object and show that 'black', 'white' and 'my-custom-color' are values
  palette: { $values: ['black', 'white', 'my-custom-color'] };
  tokens: {
    colors: { $values: ['base', 'accent'] };
    sizes: { $values: ['sm', 'md', 'lg', 'xl'] };
  };
}
```

### Define component design tokens

To define component token you need to augment `ComponentDesignTokenBox`. It's recommended to create a new definition file (`.d.ts`) aside your component when defining a new component design tokens (for example: `Input.themthem.d.ts`).

```ts
/// <reference types="themthem/interfaces" />

interface ComponentDesignTokenBox {
  Input: {
    // This is a Values object and show that 'color' is a value
    $values: ['color'];
    border: {
      // This is a Modifiers object and show that 'size'
      // can have a "$default" value and a "$focus" value
      size: {
        $modifiers: ['focus'];
      };
      color: {
        $modifiers: ['focus'];
      };
    };
  };
}
```

All the final tokens of your Token Box must be either a Value object or a Modifiers object.

## API

All the functions of the API is based on `GlobalDesignTokenBox` and `ComponentDesignTokenBox` by default.  
So the example on this section will all be based on the augmentation done in the [Usage](#usage) section.

### Global theme

#### `gVar(path)`

Generate a CSS variable usage (`var(--variable)`) based on your `GlobalDesignTokenBox`.

| Parameter | Type     | Description            | Default value |
| --------- | -------- | ---------------------- | ------------- |
| path      | `string` | The path to your token |               |

`@returns {string} The CSS variable usage of your token`

```ts
import { gVar } from 'themthem/global';

gVar('palette.black'); // "var(--global-palette-black)"
gVar('tokens.colors.accent'); // "var(--global-tokens-colors-accent)"
```

#### `gIdentifier(path)`

Generate a CSS variable identifier (`--variable`) based on your `GlobalDesignTokenBox`.

| Parameter | Type     | Description            | Default value |
| --------- | -------- | ---------------------- | ------------- |
| path      | `string` | The path to your token |               |

`@returns {string} The CSS variable identifier of your token`

```ts
import { gIdentifier } from 'themthem/global';

gIdentifier('palette.black'); // "--global-palette-black"
gIdentifier('tokens.colors.accent'); // "--global-tokens-colors-accent"
```

#### `generateVars(config)`

Generate CSS variables assignments for you global design tokens based on your theme.

| Parameter | Type   | Description                                                   | Default value |
| --------- | ------ | ------------------------------------------------------------- | ------------- |
| config    | Object | A config object assigning values to your global design tokens |               |

`@returns {string[]} An array of CSS variables declarations`

```ts
import { generateVars } from 'themthem/global';

const globalVars = generateVars({
  palette: {
    black: '#000',
    white: '#fff',
    'my-custom-color': '#298af3',
  },
  tokens: {
    colors: {
      base: gVar('palette.black'),
      accent: gVar('palette.my-custom-color'),
    },
    sizes: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '20px',
    },
  },
});

// Returns:
//
// [
//   '--global-palette-black: #000;',
//   '--global-palette-white: #fff;',
//   '--global-palette-my-custom-color: #298af3;',
//   '--global-tokens-colors-base: var(--global-palette-black);',
//   '--global-tokens-colors-accent: var(--global-palette-my-custom-color);',
//   '--global-tokens-sizes-sm: 4px;',
//   '--global-tokens-sizes-md: 8px;',
//   '--global-tokens-sizes-lg: 12px;',
//   '--global-tokens-sizes-xl: 20px;',
// ]
```

#### `createGenerator(path)`

Create a function which lets you generate CSS variables assignments for a part of your global design tokens.

| Parameter | Type     | Description                                             | Default value |
| --------- | -------- | ------------------------------------------------------- | ------------- |
| path      | `string` | The path to the part of the theme you want to configure |               |

`@returns {(config): string[]} A function which generates CSS variables assignments for the specified part of your global design`

```ts
import { createGenerator } from 'themthem/global';

const generateColorsVars = createGenerator('tokens.colors');

const lightThemeColorsTokens = generateColorsVars({
  base: gVar('palette.black'),
  accent: gVar('palette.my-custom-color'),
});

// Returns:
//
// [
//   '--global-tokens-colors-base: var(--global-palette-black);',
//   '--global-tokens-colors-accent: var(--global-palette-my-custom-color);',
// ]

const darkThemeColorsTokens = generateColorsVars({
  base: gVar('palette.white'),
  accent: gVar('palette.my-custom-color'),
});

// Returns:
//
// [
//   '--global-tokens-colors-base: var(--global-palette-white);',
//   '--global-tokens-colors-accent: var(--global-palette-my-custom-color);',
// ]
```

### Component Theme

#### `cVar(path)`

Generate a CSS variable usage (`var(--variable)`) based on your `ComponentDesignTokenBox`.

| Parameter | Type     | Description            | Default value |
| --------- | -------- | ---------------------- | ------------- |
| path      | `string` | The path to your token |               |

`@returns {string} The CSS Variable usage of your token`

```ts
import { cVar } from 'themthem/component';

cVar('Input.border.color'); // "var(--component-Input-border-color)"
cVar('Input.border.color.$focus'); // "var(--component-Input-border-color__focus)"
```

#### `cIdentifier(path)`

Generate a CSS variable identifier (`--variable`) based on your `ComponentDesignTokenBox`.

| Parameter | Type     | Description            | Default value |
| --------- | -------- | ---------------------- | ------------- |
| path      | `string` | The path to your token |               |

`@returns {string} The CSS variable identifier of your token`

```ts
import { cIdentifier } from 'themthem/component';

cIdentifier('Input.border.color'); // "--component-Input-border-color"
cIdentifier('Input.border.color.$focus'); // "--component-Input-border-color__focus"
```

#### `createGenerator(path)`

Create a function which lets you generate CSS variables assignments for a component.

| Parameter | Type                          | Description               | Default value |
| --------- | ----------------------------- | ------------------------- | ------------- |
| path | `string` | The path to the part of the component you want to configure |               |

`@returns {(config): string[]} A function which generates CSS variables assignments for the specified component`

```ts
import { createGenerator } from 'themthem/component';

const generateInputVars = createGenerator('Input');

const inputVars = generateInputVars({
  border: {
    // Input.border.color -> { $modifiers: ['focus'] }
    color: {
      $default: gVar('palette.black'),
      $focus: gVar('tokens.colors.accent'),
    },
    // Input.border.size -> { $modifiers: ['focus'] }
    size: {
      $default: '1px',
      $focus: '2px',
    },
  },
});

// [
//   '--component-Input-border-color: var(--global-palette-black);',
//   '--component-Input-border-color__focus: var(--global-tokens-colors-accent);',
//   '--component-Input-border-size: 1px;',
//   '--component-Input-border-size__focus: 2px;',
// ]
```
