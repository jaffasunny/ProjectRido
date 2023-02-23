import {View, Text, Image} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';

const Main = () => {
  return (
    <View className="h-full bg-white">
      <View className="flex-row justify-between p-2">
        <View className="w-40 h-32 relative">
          <Image
            className="w-full absolute"
            source={require('./../../assets/bgGradient1.png')}
          />
          <Text className="absolute text-normal text-xl p-3 w-24">
            Book a ride
          </Text>
          <View className="w-full h-full justify-end items-end pr-3 pb-3">
            <Image className="" source={require('./../../assets/Car.png')} />
          </View>
        </View>
        <View className="w-40 h-32 relative">
          <Image
            className="w-full absolute"
            source={require('./../../assets/bgGradient2.png')}
          />
          <Text className="absolute text-normal text-xl p-3 w-24">
            Shared ride
          </Text>
          <View className="w-full h-full justify-end items-end pr-3 pb-3">
            <Image
              className=""
              source={require('./../../assets/carWithPeople.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Main;
