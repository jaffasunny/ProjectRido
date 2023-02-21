import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Button, Icon} from '@rneui/themed';

// function Feed({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

function Notifications({navigation}) {
  return (
    <View
      className="bg-white"
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function MyDrawer(props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
        },
        header: () => {
          return (
            <View className="w-full bg-white flex flex-row justify-between items-center">
              <Button color="#fff" onPress={() => navigation.openDrawer()}>
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
                containerStyle={{backgroundColor: 'blue', marginRight: 5}}
              />
            </View>
          );
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        // options={{
        //   headerTitle: props => {
        //     <Image
        //       style={{width: 50, height: 50}}
        //       source={require('./../../assets/logo3.png')}
        //     />;
        //   },
        // }}
      />
    </Drawer.Navigator>
  );
}
