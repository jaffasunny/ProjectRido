import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Icon} from '@rneui/base';
import Modal from '../../components/Modal/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {RequestRide} from '../../Api/Post';
import {GetDrivers, GetRideDetails} from '../../Api/Get';
import {showToast} from '../../utils/ShowToast/ShowToast';
import {AddRideDetails} from '../../store/slice/slice';
import {Linking} from 'react-native';

const Booking = ({navigation}) => {
  let [isBooked, setIsBooked] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const previewRideData = useSelector(state => state.user.previewRideData);
  const state = useSelector(state => state);

  let riderID = state?.user?.user?.rider_id;
  let pickup_la = state?.user?.coords[0]?.latitude;
  let pickup_lo = state?.user?.coords[0]?.longitude;
  let dropoff_la = state?.user?.coords[1]?.latitude;
  let dropoff_lo = state?.user?.coords[1]?.longitude;

  const toggleOverlay = async () => {
    try {
      setVisible(true);

      let res = await RequestRide(
        riderID,
        pickup_la,
        pickup_lo,
        dropoff_la,
        dropoff_lo,
        state,
      );

      if (res?.status === 200) {
        while (true) {
          let drivers = await GetDrivers(state, setVisible);
          let _id = drivers?.data?.id;

          // setStatus(drivers?.status);
          if (drivers?.status === 202) {
            setVisible(false);
            showToast({msg: 'Sorry, no driver accepted your request'});
            navigation.navigate('drawerScreens');
            break;
          }

          if (drivers?.status === 200) {
            setVisible(false);

            while (true) {
              let getRideDetails = await GetRideDetails(state, _id);
              if (getRideDetails?.status === 200) {
                dispatch(AddRideDetails(getRideDetails?.data));
                setIsBooked(true);
              } else {
                navigation.navigate('bookingSuccess');
                break;
              }
            }
            break;
          }
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <Modal visible={visible} toggleOverlay={toggleOverlay} />

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
                  style={{
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  source={require('./../../assets/startToEnd.png')}
                />
              </View>

              <View className="min-h-28 justify-between">
                <View className="mb-2">
                  <Text className="font-bold text-black">Pick-up</Text>
                  <Text className="font-semibold text-black">
                    {previewRideData
                      ? previewRideData?.pickup_address
                      : '2972 Westheimer Rd. Santa Ana, Illinois 85486'}
                  </Text>
                </View>
                <View>
                  <Text className="font-bold text-black">Drop-off</Text>
                  <Text className="font-semibold text-black">
                    {previewRideData
                      ? previewRideData?.dropoff_address
                      : '2715 Ash Dr. San Jose, South Dakota 83475'}
                  </Text>
                </View>
              </View>
            </View>

            {isBooked ? (
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
                    <Text className="font-bold text-black text-xl">
                      {state?.user?.rideDetails?.driver_name || 'M Iqbal'}
                    </Text>
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
                    <Text className="font-medium text-[#171717]">
                      {state?.user?.rideDetails?.license_plate || 'LP700 - 4'}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            <View>
              {isBooked ? (
                <View className="flex-row justify-between mt-10 items-center">
                  <View>
                    <Text className="font-normal text-base text-black">
                      Total fare
                    </Text>
                  </View>
                  <View>
                    <Text className="font-bold text-base text-black">
                      Rs{' '}
                      {state?.user?.rideDetails
                        ? state?.user?.rideDetails?.total_fare
                        : '460'}
                    </Text>
                  </View>
                </View>
              ) : null}

              <View className={`${!isBooked ? 'h-4/5 justify-end' : ''}`}>
                <View className="flex-row justify-between mt-10 items-center">
                  <View>
                    <Text className="font-normal text-base text-black">
                      Your fare
                    </Text>
                  </View>
                  <View>
                    <Text className="font-bold text-2xl text-[#4338CA]">
                      Rs{' '}
                      {state?.user?.rideDetails
                        ? state?.user?.rideDetails?.rider_fare
                        : previewRideData
                        ? previewRideData?.fare
                        : '460'}
                    </Text>
                  </View>
                </View>

                <Text className="text-center font-bold text-[10px] text-[#535353] mt-8">
                  Fares may vary based on other people joining or leaving the
                  pool
                </Text>
              </View>

              {isBooked ? (
                <View className="flex-row items-center justify-between mt-8">
                  <Text className="text-center font-normal text-lg text-black">
                    You can call your driver
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `tel:${state?.user?.rideDetails?.driver_number}`,
                      )
                    }>
                    <Image
                      style={{
                        width: 44,
                        height: 44,
                        objectFit: 'contain',
                      }}
                      source={require('./../../assets/phone-call.png')}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>

          {/* Bottom */}
          <View
            className={`flex-row items-center ${
              !isBooked ? 'justify-end' : 'justify-between'
            }`}>
            {isBooked ? (
              <View className="flex-row items-center flex-1">
                <Image
                  style={{width: 45, height: 45}}
                  source={require('./../../assets/dummy.png')}
                />

                <Text className="text-xl text-black ml-2">
                  {state?.user?.rideDetails?.display_seats || '2/4'}
                </Text>
              </View>
            ) : null}
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
                onPress={() => toggleOverlay(navigation)}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Booking;
