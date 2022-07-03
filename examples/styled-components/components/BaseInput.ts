import styled from 'styled-components';
import { createCSSVariableGenerator, cssVariable } from 'themthem';

declare module 'themthem' {
  export interface ComponentDesignTokenBox {
    input: ['background-color', 'color', 'border-color'];
  }
}

// 'input' references the type ComponentDesignTokenBox['input']
export const generateInputVariables = createCSSVariableGenerator('input');

// Will generate [
//   '--input-background-color: var(--global-color-white)',
//   '--input-color: var(--global-color-black)',
//   '--input-border-color: var(--global-color-grey)',
// ]
const inputVariables = generateInputVariables({
  'background-color': cssVariable('global', 'color', 'white'),
  color: cssVariable('gloabl', 'color', 'black'),
  'border-color': cssVariable('gloabl', 'color', 'grey'),
});

export const BaseInput = styled.input`
  ${inputVariables}

  background-color: ${cssVariable('component', 'input', 'background-color')};
  color: ${cssVariable('component', 'input', 'color')};
  border: 1px solid ${cssVariable('component', 'input', 'border-color')};
`;
