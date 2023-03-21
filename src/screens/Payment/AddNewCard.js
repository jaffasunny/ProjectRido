import {View, Text} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import {Button, Icon, Input} from '@rneui/themed';

const AddNewCard = ({navigation}) => {
  const [focusBorder, setfocusBorder] = useState(false);

  return (
    <View className="bg-white h-full justify-start items-center">
      <View className="my-7 w-[90%]">
        <Text className="text-black font-medium text-sm mb-1">Card number</Text>
        <Input
          name="cardNumber"
          inputContainerStyle={{
            borderColor: focusBorder[0] === 1 ? 'blue' : '#D4D4D4',
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

      <View className="mb-7 w-[90%]">
        <Text className="text-black font-medium text-sm mb-1">
          Card holder’s name
        </Text>
        <Input
          name="cardHolderName"
          inputContainerStyle={{
            borderColor: focusBorder[0] === 2 ? 'blue' : '#D4D4D4',
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

      <View className="flex-row justify-between w-[90%]">
        <View className="w-[45%]">
          <Text className="text-black font-medium text-sm mb-1">
            Expiry date
          </Text>
          <Input
            name="expiryDate"
            inputContainerStyle={{
              borderColor: focusBorder[0] === 3 ? 'blue' : '#D4D4D4',
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
        <View className="mb-7 w-[45%]">
          <Text className="text-black font-medium text-sm mb-1">CVC</Text>
          <Input
            name="cvc"
            inputContainerStyle={{
              borderColor: focusBorder[0] === 4 ? 'blue' : '#D4D4D4',
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
      </View>

      <Button
        title="Save"
        color="#312E81"
        buttonStyle={{borderRadius: 6}}
        containerStyle={{width: '90%', height: 50}}
        titleStyle={{
          color: 'white',
          fontSize: 16,
        }}
        style={{padding: 5}}
        onPress={() => setSuccess(true)}
      />
    </View>
  );
};

export default AddNewCard;
