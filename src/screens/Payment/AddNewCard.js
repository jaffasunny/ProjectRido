import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/themed';

const AddNewCard = ({navigation, paymentDetails, setPaymentDetails}) => {
  const [focusBorder, setfocusBorder] = useState(false);

  return (
    <View className="bg-white h-full items-center">
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
          value={paymentDetails?.card_no}
          containerStyle={{
            height: 50,
            paddingHorizontal: 0,
          }}
          onFocus={e => setfocusBorder([1, true])}
          onBlur={e => setfocusBorder([1, false])}
          onChangeText={value => {
            setPaymentDetails({...paymentDetails, card_no: value});
          }}
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
          value={paymentDetails?.card_holder_name}
          containerStyle={{
            height: 50,
            paddingHorizontal: 0,
          }}
          onFocus={e => setfocusBorder([2, true])}
          onBlur={e => setfocusBorder([2, false])}
          onChangeText={value => {
            setPaymentDetails({
              ...paymentDetails,
              card_holder_name: value,
            });
          }}
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
            value={paymentDetails?.card_exp}
            containerStyle={{
              height: 50,
              paddingHorizontal: 0,
            }}
            onFocus={e => setfocusBorder([3, true])}
            onBlur={e => setfocusBorder([3, false])}
            onChangeText={value => {
              setPaymentDetails({...paymentDetails, card_exp: value});
            }}
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
            value={paymentDetails?.card_cvc}
            containerStyle={{
              height: 50,
              paddingHorizontal: 0,
            }}
            onFocus={e => setfocusBorder([4, true])}
            onBlur={e => setfocusBorder([4, false])}
            onChangeText={value => {
              setPaymentDetails({...paymentDetails, card_cvc: value});
            }}
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
        onPress={() => navigation.navigate('Payment method')}
      />
    </View>
  );
};

export default AddNewCard;
