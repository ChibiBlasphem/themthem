import { AppGlobalStyles } from './App.styles';
import { BaseInput } from './components/BaseInput';
import { ThemedInput } from './components/ThemedInput';

export function App() {
  return (
    <>
      <AppGlobalStyles />
      <div>
        <BaseInput />
        <ThemedInput />
      </div>
    </>
  );
}
