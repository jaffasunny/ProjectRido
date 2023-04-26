import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Icon} from '@rneui/base';

const RideSharing = ({navigation}) => {
  return (
    <SafeAreaView className="bg-white min-h-screen">
      {/* <View className="mx-3 mt-3">
        <TouchableOpacity
          className="items-start"
          onPress={() => navigation.navigate('startScreen')}>
          <Icon size={35} name="chevron-left" />
        </TouchableOpacity>
      </View> */}
      <View className="flex items-center justify-center">
        <View className="w-80 h-full gap-y-6">
          <Image
            style={{width: '100%', height: 350, objectFit: 'contain'}}
            source={require('./../../assets/group.png')}
          />
          <Text className="text-black font-bold text-2xl text-center">
            Travel in shared rides and split fare
          </Text>

          <Text className="text-black font-bold text-sm text-center mb-6">
            Ridesharing enables you to allow other people along your route to
            travel with you to destinations that are close to your own. This
            way, your fare is split between you and your co-passengers according
            to the distances travelled.{' '}
          </Text>

          <Button
            title="Start Ridesharing"
            color="#312E81"
            buttonStyle={{borderRadius: 6, width: '100%', height: 50}}
            titleStyle={{
              color: 'white',
              fontSize: 16,
            }}
            style={{padding: 5}}
            onPress={() => navigation.navigate('drawerScreens')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideSharing;
