import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartSC from './screens/StartScreen/StartSC';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import SignupPhone from './screens/Signup/SignupPhone';
import SignupVerify from './screens/Signup/SignupVerify';
import Main from './screens/Main/Main';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="startScreen"
            component={StartSC}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="signup"
            component={Signup}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="signup-phone"
            component={SignupPhone}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="signup-verify"
            component={SignupVerify}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="main"
            component={Main}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
