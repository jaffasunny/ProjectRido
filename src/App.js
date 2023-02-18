import {SafeAreaProvider} from 'react-native-safe-area-context';
import StartSC from '@/screens/StartScreen/StartSC';

function App() {
  return (
    <SafeAreaProvider>
      <StartSC />
    </SafeAreaProvider>
  );
}

export default App;
