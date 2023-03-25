import React from 'react';
import {View, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import GlobalStyles from './../../constants/GlobalStyles';
import {Button} from '@rneui/themed';

const StartSC = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex">
        <View className="flex-1 absolute w-full h-72">
          <Image
            className="w-full h-full"
            source={require('./../../assets/gradient.png')}
          />
        </View>
        <View className="justify-end items-center w-full h-60 ml-auto">
          <Image
            className="w-32 h-32"
            source={require('./../../assets/logo.png')}
          />
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
            className="text-black text-base text-center font-normal  mt-[26] mb-[90]">
            With Rido’s Ridesharing, you can now book the best rides and split
            the fare, and pay way less than traditional ride-hailing services.
          </Text>

          <View className="self-center mb-7">
            <View style={{width: 150}}>
              <Button
                title="Get started"
                color="#312E81"
                buttonStyle={{borderRadius: 6, width: 150, height: 50}}
                titleStyle={{
                  color: 'white',
                  fontSize: 16,
                }}
                style={{padding: 5}}
                onPress={() => navigation.navigate('signup')}
              />
            </View>
          </View>
          <Text className="text-base text-black text-center">
            Already have an account?
          </Text>
          <Button
            type="clear"
            title="Login"
            titleStyle={{
              color: '#312E81',
            }}
            onPress={() => navigation.navigate('login')}
            // onPress={() => navigation.navigate('drawerScreens')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartSC;
