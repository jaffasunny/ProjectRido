import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import GlobalStyles from '@/constants/GlobalStyles';

const StartSC = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex">
        <View className="flex-1 absolute w-full h-72">
          <Image
            className="w-full h-full"
            source={require('@/assets/gradient.png')}
          />
        </View>
        <View className="justify-end items-center w-full h-60 ml-auto">
          <Image className="w-32 h-32" source={require('@/assets/logo.png')} />
        </View>
      </View>
      <View className="flex items-center">
        <Text
          style={GlobalStyles.text}
          className="font-bold text-4xl text-center text-[#141414]">
          Affordable quality rides made easy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default StartSC;
