import type { DTBoxKey, DesignToken, Themthem } from './token-box';
import { cssVariable } from './helpers';
import { getKeys } from './utils';

export function createCSSVariablesGenerator<
  Key extends DTBoxKey<'component', ThemeInterface> & string,
  ThemeInterface extends Themthem = Themthem,
>(component: Key) {
  return function generateCSSVariables(config: {
    [Token in DesignToken<'component', Key, ThemeInterface>]+?: string;
  }) {
    const variables: string[] = [];
    for (const key of getKeys(config)) {
      variables.push(
        `${cssVariable<'component', Key, typeof key, ThemeInterface>(
          'component',
          component,
          key,
          { bare: true },
        )}: ${config[key]};`,
      );
    }
    return variables;
  };
}

export function generateGlobalCSSVariables<
  ThemeInterface extends Themthem = Themthem,
>(config: {
  [Key in DTBoxKey<'global', ThemeInterface> & string]+?: {
    [Token in DesignToken<'global', Key, ThemeInterface>]+?: string;
  };
}) {
  const variables: string[] = [];
  for (const key of getKeys(config)) {
    const configValue = config[key]!;
    for (const token of getKeys(configValue)) {
      const variable = configValue[token];
      variables.push(
        `${cssVariable('global', key as never, token as never, {
          bare: true,
        })}: ${variable};`,
      );
    }
  }
  return variables;
}
