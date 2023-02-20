import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import GlobalStyles from '../../constants/GlobalStyles';
import {Button, Input, Icon, CheckBox} from '@rneui/themed';

const Signup = ({navigation}) => {
  const [focusBorder, setfocusBorder] = useState(false);
  const [selectedIndex, setIndex] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex items-center mt-16">
        <View className="w-80">
          <Text
            style={GlobalStyles.text}
            className="text-black font-bold text-4xl text-center">
            Signup
          </Text>
          <View className="mt-7">
            <Text
              style={GlobalStyles.text}
              className="text-black font-medium text-sm mb-1">
              Full name
            </Text>
            <Input
              name="fullname"
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
          </View>
          <View className="mt-3">
            <Text
              style={GlobalStyles.text}
              className="text-black font-medium text-sm mb-1">
              Email address
            </Text>
            <Input
              name="email"
              inputContainerStyle={{
                borderColor:
                  focusBorder[0] === 2 && focusBorder[1] ? 'blue' : '#D4D4D4',
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
              onFocus={e => setfocusBorder([2, true])}
              onBlur={e => setfocusBorder([2, false])}
            />
          </View>
          <View className="mt-3">
            <Text
              style={GlobalStyles.text}
              className="text-black font-medium text-sm mb-1">
              Password
            </Text>
            <Input
              name="password"
              secureTextEntry={true}
              inputContainerStyle={{
                borderColor:
                  focusBorder[0] === 3 && focusBorder[1] ? 'blue' : '#D4D4D4',
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
              onFocus={e => setfocusBorder([3, true])}
              onBlur={e => setfocusBorder([3, false])}
            />
          </View>
          <View className="mt-3">
            <Text
              style={GlobalStyles.text}
              className="text-black font-medium text-sm mb-1">
              Retype Password
            </Text>
            <Input
              name="repassword"
              secureTextEntry={true}
              inputContainerStyle={{
                borderColor:
                  focusBorder[0] === 4 && focusBorder[1] ? 'blue' : '#D4D4D4',
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
              onFocus={e => setfocusBorder([4, true])}
              onBlur={e => setfocusBorder([4, false])}
            />
          </View>
          <View className="mt-3">
            <CheckBox
              title="Agree to meet terms and conditions"
              checked={selectedIndex === 1}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{
                paddingHorizontal: 0,
                marginHorizontal: 0,
              }}
            />
          </View>

          <View className="self-center mt-20">
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
                onPress={() => navigation.navigate('startScreen')}>
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
                onPress={() => navigation.navigate('signup-phone')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
