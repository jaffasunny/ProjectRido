import {View, Text, Image} from 'react-native';
import React from 'react';

const BookSuccess = () => {
  return (
    <View className="relative h-full items-center justify-center bg-red-300">
      <Image
        className="absolute -z-10"
        style={{width: '100%', height: '100%'}}
        source={require('./../../assets/loader.gif')}
      />

      <View className="text-center">
        <Text className="text-center text-2xl font-bold text-white">
          Your fare
        </Text>
        <Text className="text-center text-4xl font-bold text-white">
          Rs 175
        </Text>
      </View>
    </View>
  );
};

export default BookSuccess;
