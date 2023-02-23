import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Button, Icon} from '@rneui/themed';
import {DrawerActions} from '@react-navigation/native';
import Main from '../../screens/Main/Main';

function Feed({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Hello World"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function MyDrawer({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
        },
        header: () => {
          return (
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
              <Avatar
                size={32}
                rounded
                title="Rd"
                containerStyle={{backgroundColor: '#059669'}}
              />
            </View>
          );
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Welcome" component={Main} />
    </Drawer.Navigator>
  );
}
