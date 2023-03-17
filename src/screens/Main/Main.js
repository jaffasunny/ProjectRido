import {View, Text, Image} from 'react-native';
import React from 'react';
import Map from './../../components/Map/Map';

const Main = ({navigation}) => {
  return (
    <View className="h-full bg-white">
      <View className="flex-row justify-between p-2">
        <View
          className="w-44 h-36 relative"
          onPress={() => navigation.naivate('')}>
          <Image
            className="w-full h-full absolute"
            source={require('./../../assets/bgGradient1.png')}
          />
          <Text className="absolute text-normal text-xl text-black p-3 w-24">
            Book a ride
          </Text>
          <View className="w-full h-full justify-end items-end pr-3 pb-3">
            <Image className="" source={require('./../../assets/Car.png')} />
          </View>
        </View>
        <View className="w-44 h-36 relative">
          <Image
            className="w-full h-full absolute"
            source={require('./../../assets/bgGradient2.png')}
          />
          <Text className="absolute text-normal text-xl text-black p-3 w-24">
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
      <View className="mt-6 pl-2">
        <Text className="font-bold text-2xl text-black">Places around you</Text>

        <Map />
      </View>
    </View>
  );
};

export default Main;
