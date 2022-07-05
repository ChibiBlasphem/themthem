# Themthem

![License: MIT](https://img.shields.io/npm/l/themthem)

Themthem (pronounced like "temtem" `/temtem/`) is a library of tools which lets you manage your CSS variables and tokens based on a Typescript interface.

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
    colors: ['black', 'white', 'my-custom-color']
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

### Retrieve a token

`cssToken` is used to retrieve a token.  
Based on the interfaces above:
```ts
import { cssToken } from 'themthem';

cssToken('global', 'color', 'black'); // --global-color-black
cssToken('component', 'input', 'border-size'); // --input-border-size
```

### Using a variable

Using a variable works the same as retrieving a token, but you will use `cssVariable`

```ts
import { cssVariable } from 'themthem';

cssVariable('global', 'color', 'black'); // var(--global-color-black)
cssVariable('component', 'input', 'border-size'); // var(--input-border-size)
```

## Using with [`styled-components`](https://styled-components.com/)

Themthem works great with styled-component or other CSS-in-JS libraries that work the same way.
You can see an example [here](./examples/styled-components/)