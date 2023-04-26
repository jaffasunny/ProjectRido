import {Overlay} from '@rneui/themed';
import {Text, Image} from 'react-native';
import React from 'react';

const Modal = ({visible, toggleOverlay}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        width: 300,
        height: 200,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 8,
      }}>
      <Image
        style={{width: 200, height: 100}}
        source={require('./../../assets/loader2.gif')}
      />

      <Text className="font-bold text-black text-xl">Searching for a ride</Text>
    </Overlay>
  );
};

export default Modal;
