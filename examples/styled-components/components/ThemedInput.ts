import styled from 'styled-components';
import { cssVariable } from 'themthem';
import { generateInputVariables, BaseInput } from './BaseInput';

// Will generate [
//   '--input-background-color: var(--global-color-green)',
//   '--input-color: var(--global-color-white)',
//   '--input-border-color: var(--global-color-green)',
// ]
const inputVariables = generateInputVariables({
  'background-color': cssVariable('global', 'color', 'green'),
  color: cssVariable('gloabl', 'color', 'white'),
  'border-color': cssVariable('gloabl', 'color', 'green'),
});

export const ThemedInput = styled(BaseInput)`
  ${inputVariables}
`;
