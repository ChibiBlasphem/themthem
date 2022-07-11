import type { DTBoxKey, DesignToken, Themthem } from './token-box';
import { cssToken } from './helpers';
import { getKeys } from './utils';

export function createCSSVariableGenerator<
  C extends DTBoxKey<'component'>,
  T extends Themthem = Themthem,
>(component: C) {
  return function generateCSSVariables(config: {
    [K in DesignToken<'component', C, T>]+?: string;
  }) {
    const variables: string[] = [];
    for (const key of getKeys(config)) {
      variables.push(
        `${cssToken('component', component, key)}: ${config[key]};`,
      );
    }
    return variables;
  };
}

export function generateGlobalCSSVariables<
  T extends Themthem = Themthem,
>(config: {
  [K in DTBoxKey<'global', T>]+?: {
    [TK in DesignToken<'global', K, T>]+?: string;
  };
}) {
  const variables: string[] = [];
  for (const key of getKeys(config)) {
    const configValue = config[key]!;
    for (const token of getKeys(configValue)) {
      const variable = configValue[token];
      variables.push(
        `${cssToken('global', key as never, token as never)}: ${variable};`,
      );
    }
  }
  return variables;
}
