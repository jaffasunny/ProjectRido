import {View, Text} from 'react-native';
import React from 'react';

const Avatar = ({size, rounded, title, backgroundColor}) => {
  const styles = {
    avatar: {
      backgroundColor: backgroundColor,
      padding: 5,
      borderRadius: 50,
    },
  };

  return (
    <View style={styles.avatar}>
      <Text className="text-white">{title}</Text>
    </View>
  );
};

export default Avatar;
