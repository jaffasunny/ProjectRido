import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Icon} from '@rneui/base';

const Booking = ({navigation}) => {
  let [isBooked, setIsBooked] = useState(false);
  console.log('isBooked', isBooked);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('bookingSuccess');
    }, 3000);

    // clearTimeout(timeout);
  }, [isBooked]);

  return (
    <SafeAreaView className="bg-white">
      <View className="mx-3 my-3">
        <TouchableOpacity
          className="items-start"
          onPress={() => navigation.navigate('drawerScreens')}>
          <Icon size={35} name="chevron-left" />
        </TouchableOpacity>
      </View>

      <View className="flex items-center">
        <View className="h-full gap-y-6">
          <View className="w-80 h-[75%]">
            <View className="flex-row">
              <View className="h-24">
                <Image
                  style={{height: '100%', objectFit: 'contain'}}
                  source={require('./../../assets/startToEnd.png')}
                />
              </View>

              <View className="h-28 justify-between">
                <View>
                  <Text className="font-bold text-black">
                    Pick-up - <Text className="font-normal">05:36 pm</Text>
                  </Text>
                  <Text className="font-semibold text-black">
                    2972 Westheimer Rd. Santa Ana, Illinois 85486
                  </Text>
                </View>
                <View>
                  <Text className="font-bold text-black">
                    Drop-off - <Text className="font-normal">07:13 pm</Text>
                  </Text>
                  <Text className="font-semibold text-black">
                    2715 Ash Dr. San Jose, South Dakota 83475
                  </Text>
                </View>
              </View>
            </View>

            <View className="w-full flex-row bg-[#EFF2FF] h-28 mt-8 justify-between px-3 py-2">
              <View className="w-24 flex-row align-center justify-between">
                <Image
                  className="w-3/6"
                  style={{
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  source={require('./../../assets/carImg.png')}
                />

                <View className="align-middle justify-center ml-3">
                  <Text className="font-bold text-black text-xl">M Iqbal</Text>
                  <View className="items-center justify-center flex-row">
                    <View className="w-5 h-5 rounded-xl bg-[#FB923C] mr-2" />
                    <Text className="font-medium text-[#404040]">
                      4.5 stars
                    </Text>
                  </View>
                </View>
              </View>

              <View className="justify-center">
                <Text className="text-base text-black font-normal">
                  Plate no.
                </Text>

                <View className="bg-[#FCD34D] rounded-md w-20 h-6 items-center">
                  <Text className="font-medium text-[#171717]">LP700-4</Text>
                </View>
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mt-10 items-center">
                <View>
                  <Text className="font-normal text-base text-black">
                    Total fare
                  </Text>
                </View>
                <View>
                  <Text className="font-bold text-base text-black">Rs 460</Text>
                </View>
              </View>

              <View className="flex-row justify-between mt-10 items-center">
                <View>
                  <Text className="font-normal text-base text-black">
                    Your fare
                  </Text>
                </View>
                <View>
                  <Text className="font-bold text-2xl text-[#4338CA]">
                    Rs 460
                  </Text>
                </View>
              </View>

              <Text className="text-center font-normal text-[10px] text-[#535353] mt-8">
                Fares may vary based on other people joining or leaving the pool
              </Text>

              {isBooked ? (
                <Text className="text-center font-normal text-[10px] text-[#535353] mt-8">
                  Captain will arrive soon
                </Text>
              ) : (
                ''
              )}
            </View>
          </View>

          {/* Bottom */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1">
              <Image
                style={{width: 45, height: 45}}
                source={require('./../../assets/dummy.png')}
              />

              <Text className="text-xl text-black ml-2">2/4</Text>
            </View>

            {isBooked ? (
              <Button
                title="Cancel Ride"
                color="#fff"
                buttonStyle={{
                  borderRadius: 6,
                  width: '90%',
                  height: 50,
                  alignSelf: 'flex-end',
                  borderWidth: 1,
                  borderColor: '#D4D4D4',
                }}
                titleStyle={{
                  color: 'black',
                  fontSize: 16,
                }}
                onPress={() => setIsBooked(false)}
                style={{padding: 5}}
              />
            ) : (
              <Button
                title="Book this ride"
                color="#312E81"
                buttonStyle={{
                  borderRadius: 6,
                  width: '90%',
                  height: 50,
                  alignSelf: 'flex-end',
                }}
                titleStyle={{
                  color: 'white',
                  fontSize: 16,
                }}
                style={{padding: 5}}
                onPress={() => setIsBooked(true)}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Booking;
