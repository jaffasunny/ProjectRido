import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableLatestRenderer} from 'react-native-maps';

import StartSC from './screens/StartScreen/StartSC';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import MyDrawer from './utils/Drawer/Drawer';
import RideSharing from './screens/misc/RideSharing';

function App() {
  enableLatestRenderer();

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
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="rideSharing"
            component={RideSharing}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="drawerScreens"
            component={MyDrawer}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
