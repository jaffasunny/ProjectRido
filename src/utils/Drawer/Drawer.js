import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button, Icon} from '@rneui/themed';
import {DrawerActions, useRoute} from '@react-navigation/native';
import Main from '../../screens/Main/Main';
import Avatar from '../Avatar/Avatar';
import PaymentScreen from '../../screens/Payment/PaymentScreen';
import {useSelector} from 'react-redux';
import {getHeaderTitle} from '@react-navigation/elements';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        display: 'flex',
        height: '100%',
      }}>
      <DrawerItemList {...props} />

      <View className="items-center justify-end h-3/5 mb-7">
        <Button
          title="Log out"
          color="#FEF2F2"
          buttonStyle={{
            borderWidth: 1,
            borderColor: '#B91C1C',
            borderRadius: 6,
            height: 50,
          }}
          containerStyle={{width: '90%', textAlign: 'center'}}
          titleStyle={{
            color: '#B91C1C',
            fontSize: 16,
            fontWeight: 500,
          }}
          style={{padding: 5}}
          onPress={() => props.navigation.navigate('startScreen')}
        />
      </View>

      <View className="items-start">
        <Image
          style={{objectFit: 'contain', alignSelf: 'flex-start'}}
          className="w-full"
          source={require('./../../assets/logo2.png')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function MyDrawer({navigation}) {
  // const title = getHeaderTitle(options, route.name);
  // console.log(title);

  return (
    <Drawer.Navigator
      // screenOptions={{
      //   drawerStyle: {
      //     backgroundColor: '#fff',
      //   },
      //   header: () => (
      //     <View className="w-full bg-white flex flex-row justify-between items-center p-2">
      //       <Button
      //         color="#fff"
      //         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      //         style={{backgroundColor: 'lightBlue'}}>
      //         <Icon name="menu" color="#000" />
      //       </Button>
      //       <Image
      //         className="w-30 h-30"
      //         source={require('./../../assets/logo3.png')}
      //       />
      //       <Avatar size={32} rounded title="Rd" backgroundColor="#059669" />
      //     </View>
      //   ),
      // }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Welcome"
        options={{
          header: () => (
            <View className="w-full bg-white flex flex-row justify-between items-center p-2">
              <Button
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{backgroundColor: 'lightBlue'}}>
                <Icon name="menu" color="#000" />
              </Button>
              <Image
                className="w-30 h-30"
                source={require('./../../assets/logo3.png')}
              />
              <Avatar size={32} rounded title="Rd" backgroundColor="#059669" />
            </View>
          ),
        }}
        component={Main}
      />
      <Drawer.Screen
        name="Payment method"
        component={PaymentScreen}
        options={{
          header: () => (
            <View className="w-full bg-white flex flex-row justify-between items-center p-2">
              <Button
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{backgroundColor: 'lightBlue'}}>
                <Icon name="menu" color="#000" />
              </Button>
              <Text className="font-bold text-lg">Payment method</Text>
              <Avatar size={32} rounded title="Rd" backgroundColor="#059669" />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
