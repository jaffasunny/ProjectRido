import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableLatestRenderer} from 'react-native-maps';

import StartSC from './screens/StartScreen/StartSC';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import MyDrawer from './utils/Drawer/Drawer';
import RideSharing from './screens/misc/RideSharing';
import Booking from './screens/misc/Booking';
import BookSuccess from './screens/misc/BookSuccess';
import Toast from 'react-native-toast-message';

import '../ignoreWarnings';
import {useSelector} from 'react-redux';

function App() {
  enableLatestRenderer();
  const Stack = createNativeStackNavigator();

  const state = useSelector(state => state);

  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            {!state?.user?.user?.token ? (
              <>
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
              </>
            ) : (
              <>
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
                <Stack.Screen
                  options={{headerShown: false}}
                  name="bookingScreen"
                  component={Booking}
                />
                <Stack.Screen
                  options={{headerShown: false}}
                  name="bookingSuccess"
                  component={BookSuccess}
                />
              </>
            )}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
