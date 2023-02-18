import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StartSC from './screens/StartScreen/StartSC';

// import StartSC from '~/screens/StartScreen/StartSC';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StartSC />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
