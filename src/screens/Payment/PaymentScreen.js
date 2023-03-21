import {View, Text, Image} from 'react-native';
import React from 'react';
import {Button, Icon} from '@rneui/themed';

const PaymentScreen = ({navigation}) => {
  return (
    <View className="bg-white h-full justify-center items-center">
      <Image
        style={{width: 177, objectFit: 'contain'}}
        source={require('./../../assets/CreditCard.png')}
      />

      <Text
        style={{width: '70%'}}
        className="text-center text-black text-2xl font-bold mb-7 mt-11">
        Paying fare made easy with card
      </Text>

      <Text
        style={{width: '90%'}}
        className="text-center text-black text-sm mb-7">
        Add your debit card right now and enjoy seamless payment on regular and
        shared rides.
      </Text>

      <Button
        title="Add Debit Card"
        color="#312E81"
        buttonStyle={{borderRadius: 6}}
        containerStyle={{width: '90%', height: 50}}
        titleStyle={{
          color: 'white',
          fontSize: 16,
        }}
        style={{padding: 5}}
        onPress={() => navigation.navigate('Add new card')}
      />
    </View>
  );
};

export default PaymentScreen;
