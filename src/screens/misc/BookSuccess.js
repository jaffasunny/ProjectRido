import {View, Text, Image} from 'react-native';
import React from 'react';

const BookSuccess = () => {
  return (
    <View>
      <Image
        style={{width: '50%', height: '50%'}}
        source={require('./../../assets/loader.gif')}
      />
    </View>
  );
};

export default BookSuccess;
