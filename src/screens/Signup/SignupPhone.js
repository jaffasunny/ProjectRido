import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import GlobalStyles from '../../constants/GlobalStyles';
import {Button, Input, Icon} from '@rneui/themed';

const SignupPhone = ({navigation}) => {
  const [focusBorder, setfocusBorder] = useState(false);

  return (
    <SafeAreaView className="bg-white">
      <View className="flex items-center mt-16">
        <View className="w-80 h-full">
          <Text
            style={GlobalStyles.text}
            className="text-black font-bold text-4xl text-center">
            Signup
          </Text>
          <View className="mt-7 flex-[0.8]">
            <Text
              style={GlobalStyles.text}
              className="text-black font-medium text-sm mb-1">
              Phone number
            </Text>
            <Input
              name="phone"
              inputContainerStyle={{
                borderColor:
                  focusBorder[0] === 1 && focusBorder[1] ? 'blue' : '#D4D4D4',
                borderEndWidth: 1,
                borderStartWidth: 1,
                borderTopWidth: 1,
                padding: 0,
                borderRadius: 4,
              }}
              containerStyle={{
                height: 50,
                paddingHorizontal: 0,
              }}
              onFocus={e => setfocusBorder([1, true])}
              onBlur={e => setfocusBorder([1, false])}
            />
            <View className="flex-row justify-between items-center py-4 px-2 bg-indigo-400 rounded mt-9">
              <Icon name="info" color="#fff" />
              <Text className="text-white">
                Rido will send an OTP to verify the number
              </Text>
            </View>
          </View>

          <View className="mt-20 self-end">
            <View className="flex flex-row justify-between w-80">
              <Button
                title="Back"
                type="clear"
                color="#312E81"
                titleStyle={{
                  color: 'white',
                  fontSize: 16,
                }}
                style={{padding: 5}}
                onPress={() => navigation.navigate('signup')}>
                <Icon name="chevron-left" color="#312E81" />
                <Text className="text-base text-indigo-900 font-normal">
                  Back
                </Text>
              </Button>
              <Button
                title="Next"
                color="#312E81"
                buttonStyle={{borderRadius: 6, width: 100, height: 50}}
                titleStyle={{
                  color: 'white',
                  fontSize: 16,
                }}
                style={{padding: 5}}
                onPress={() => navigation.navigate('signup-verify')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupPhone;
