import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import GlobalStyles from '../../constants/GlobalStyles';
import {Button, Input, Icon} from '@rneui/themed';

const SignupVerify = ({navigation}) => {
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
              Enter OTP
            </Text>
            <Input
              name="OTP"
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
            <Button
              title="Verify"
              type="outline"
              color="#312E81"
              buttonStyle={{
                borderRadius: 6,
                width: 100,
                height: 50,
                borderColor: '#818CF8',
              }}
              containerStyle={{
                marginTop: 26,
              }}
              titleStyle={{
                color: 'white',
                fontSize: 16,
                color: '#3730A3',
              }}
              style={{padding: 5}}
              onPress={() => navigation.navigate('Signup')}
            />
            <View className="flex-row items-center py-4 px-2 bg-[#10B981] rounded mt-9">
              <Icon name="info" color="#fff" />
              <Text className="text-white ml-2">Verification Successful</Text>
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
                onPress={() => navigation.navigate('signup-phone')}>
                <Icon name="chevron-left" color="#312E81" />
                <Text className="text-base text-indigo-900 font-normal">
                  Back
                </Text>
              </Button>
              <Button
                title="Complete Signup"
                color="#312E81"
                buttonStyle={{borderRadius: 6, width: 150, height: 50}}
                titleStyle={{
                  color: 'white',
                  fontSize: 16,
                }}
                style={{padding: 5}}
                onPress={() => navigation.navigate('main')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupVerify;
