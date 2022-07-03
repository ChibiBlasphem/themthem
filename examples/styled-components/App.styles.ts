import { createGlobalStyles } from 'styled-components';
import { generateGlobalCSSVariables } from 'themthem';

const globalVariables = generateGlobalCSSVariables({
  colors: {
    black: '#000',
    white: '#fff',
    grey: '#888',
    green: '#1ea896',
  },
});

export const AppGlobalStyles = createGlobalStyles`
  :root {
    ${globalVariables}
  }
`;
