import {View, Text, Image} from 'react-native';
import React from 'react';

const About = () => {
  return (
    <View className="bg-white h-full justify-start items-center">
      <Image
        style={{
          objectFit: 'contain',
          alignSelf: 'flex-start',
          marginTop: 50,
        }}
        className="w-full"
        source={require('./../../assets/logo2.png')}
      />

      <View className="w-[80%]">
        <Text className="text-center text-black text-sm font-normal mt-10 mb-5">
          Rido is a product of a small team for Final Year Project of Computer
          Science program.
        </Text>

        <Text className="text-center text-black text-sm font-normal mb-5">
          Rido is meant to demonstrate the teams ability to pick a real-world
          problem and craft a solution that meets industry standards and solves
          the problem, all while providing a viable business plan.
        </Text>

        <Text className="text-center text-black text-sm font-normal">
          The team of Rido includes Syed Jaffer Sunny, Muhammad Khizar Khan and
          Muzammil Hashmi, working under the supervision of Prof Sadiq Ali Khan.
        </Text>
      </View>
    </View>
  );
};

export default About;
