import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import StarRating from 'react-native-star-rating';
import {Button} from '@rneui/themed';
import { useSelector } from 'react-redux';

const BookSuccess = ({navigation}) => {
  const [starRating, setStarRating] = useState(4);

  const state = useSelector(state => state);

  return (
    <View className="relative h-full items-center justify-between">
      <Image
        className="absolute -z-10"
        style={{width: '100%', height: '100%'}}
        source={require('./../../assets/loader.gif')}
      />

      <View className="h-5/6 justify-center">
        <View className="text-center mb-5">
          <Text className="text-center text-2xl font-bold text-white">
            Your fare
          </Text>
          <Text className="text-center text-6xl font-bold text-white mt-5">
            Rs {state?.user?.rideDetails?.rider_fare || "175"}
          </Text>
        </View>

        <View>
          <Text className="mx-auto text-[20px] text-white font-bold">
            Rate your trip
          </Text>

          <StarRating
            disabled={false}
            maxStars={5}
            rating={starRating}
            selectedStar={rating => setStarRating(rating)}
            fullStarColor={'#F3C205'}
          />
        </View>
      </View>

      <View className="w-5/6 mb-20">
        <Button
          title="Back home"
          color="#fff"
          buttonStyle={{
            borderRadius: 6,
            width: '100%',
            height: 50,
            alignSelf: 'flex-end',
            borderWidth: 1,
            borderColor: '#D4D4D4',
          }}
          titleStyle={{
            color: '#5B21B6',
            fontSize: 16,
            fontWeight: 500,
          }}
          onPress={() => navigation.navigate('rideSharing')}
          style={{padding: 5}}
        />
      </View>
    </View>
  );
};

export default BookSuccess;
