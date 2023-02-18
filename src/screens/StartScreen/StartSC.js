import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Linking} from 'react-native';

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
      <View className="flex items-center mt-16">
        <View className="w-5/6">
          <Text
            style={GlobalStyles.text}
            className="text-black font-bold text-4xl text-center ">
            Affordable quality rides made easy
          </Text>
          <Text
            style={GlobalStyles.text}
            className="text-black text-base text-center font-normal  mt-[26] mb-[100]">
            With Rido’s Ridesharing, you can now book the best rides and split
            the fare, and pay way less than traditional ride-hailing services.
          </Text>

          <View className="self-center mb-7">
            <View style={{width: 150}}>
              {/* <Button
                title="Get started"
                color="#312E81"
                titleStyle={{
                  color: 'black',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}
              /> */}
              <TouchableOpacity
                className="bg-indigo-900 py-2"
                onPress={() => {}}>
                <Text className="text-base text-white text-center">
                  Get started
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-base text-black text-center">
            Already have an account?
          </Text>
          <Text
            className="text-center text-base text-indigo-900"
            onPress={() => Linking.openURL('https://google.com')}>
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartSC;
