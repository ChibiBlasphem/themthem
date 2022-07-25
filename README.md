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
    colors: ['black', 'white', 'my-custom-color'];
    sizes: ['sm', 'md', 'lg', 'xl']
}
```

### Define component design tokens

To define component token you need to augment `ComponentDesignTokenBox`. It's recommended to create a new definition file (`.d.ts`) aside your component when defining a new component design tokens (for example: `Input.themthem.d.ts`).

```ts
/// <reference types="themthem/interfaces" />

interface ComponentDesignTokenBox {
    Input: ['background-color', 'color', 'border-color', 'border-size']
}
```

## API

All the functions of the API is based on `GlobalDesignTokenBox` and `ComponentDesignTokenBox` by default.  
So the example on this section will all be based on the augmentation done in the [Usage](#usage) section.

### `cssVariable(type, key, token, options?)`

Generate a CSS Variable based on your theme.

| Parameter | Type | Description | Default value |
|---|---|---|---|
| type | `'global' \| 'component'` | The type of token you want. `'global'` for GlobalDesignTokens or `'component'` for ComponentDesignToken ||
| key  | `keyof Themthem[typeof type]` | The global design token category or component name ||
| token | `Themthem[typeof type][typeof key][number]` | The token token inside the category/component ||
| options | `{ bare?: boolean } \| undefined` | Whether you want the bare css variable or it's usage | `{ bare: false }` |

`@returns {string} The bare CSS variable or CSS variable usage`

```ts
import { cssVariable } from 'themthem';

cssVariable('global', 'color', 'black', { bare: true }); // "--global-color-black"
cssVariable('global', 'color', 'black'); // "var(--global-color-black)"
```

### generateGlobalCSSVariables(config)

Generate CSS variables assignments for you global design tokens based on your theme.

| Parameter | Type | Description | Default value |
|---|---|---|---|
| config | Object | A 2-level deep object assigning values to your global design tokens ||

`@returns {string[]} An array of CSS variables declarations`

```ts
import { generateGlobalCSSVariables } from 'themthem';

const globalVariablesAssignments = generateGlobalCSSVariables({
    colors: {
        black: '#000',
        white: '#fff',
        'my-custom-color': '#298af3'
    },
    sizes: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
    }
});

// [
//   '--global-colors-black: #000;',
//   '--global-colors-white: #fff;',
//   '--global-colors-my-custom-color: #298af3;',
//   '--global-sizes-sm: 4px;',
//   '--global-sizes-md: 8px;',
//   '--global-sizes-lg: 12px;',
//   '--global-sizes-xl: 20px;'
// ]
```

### createCSSVariableGenerator(component)

Create a function which lets you generate CSS variables assignments for a component.

| Parameter | Type | Description | Default value |
|---|---|---|---|
| component | `keyof Themthem['component']` | The name of the component ||

`@returns {(config): string[]} A function which generates CSS variables assignments for the specified component`

```ts
import { createCSSVariablesGenerator } from 'themthem';

const generateInputCSSVariables = createCSSVariablesGenerator('Input');

const inputVariablesAssignments = generateInputCSSVariables({
    'background-color': cssVariable('global', 'colors', 'white'),
    'color': 'black',
    'border-color': '#333',
    'border-size': '1px'
});

// [
//   '--input-background-color: var(--global-colors-white);',
//   '--input-color: black;',
//   '--input-border-color: #333;',
//   '--input-border-size: 1px;',
// ]
```