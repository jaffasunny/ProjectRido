import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from './../../../env/Keys';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {Overlay} from '@rneui/themed';
import {PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

// https://docs.expo.dev/versions/latest/sdk/map-view/
// https://www.npmjs.com/package/react-native-google-places-autocomplete
// https://www.npmjs.com/package/react-native-maps-directions

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function InputAutocomplete({inputRef, placeholder, onPlaceSelected, flag}) {
  return (
    <>
      <GooglePlacesAutocomplete
        styles={{textInput: styles.input}}
        placeholder={placeholder || ''}
        fetchDetails
        debounce={200}
        ref={inputRef}
        onPress={(data, details = null) => {
          onPlaceSelected(details, flag);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'pt-BR',
        }}
      />
    </>
  );
}

export default function App({navigation}) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showDirections, setShowDirections] = useState(false);
  // 24.919624, 67.064371
  const [postionCoord, setPostionCoord] = useState({
    latitude: 40.76711,
    longitude: -73.979704,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currLocationName, setCurrLocationName] = useState({});

  const mapRef = useRef(null);
  const inputRef = useRef(null);

  Geocoder.init(GOOGLE_API_KEY);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;

            const region = {
              latitude,
              longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
            setPostionCoord(region);
            setCurrLocationName('');
            mapRef.current?.animateToRegion(region, 1000);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setPostionCoord(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useLayoutEffect(() => {
    // Setting current location name in the Google Places Input as default value
    if (!currLocationName.long_name) {
      Geocoder.from(postionCoord.latitude, postionCoord.longitude)
        .then(json => {
          setCurrLocationName(json?.results[0]?.formatted_address);
        })
        .catch(error => console.warn(error));
    }
    if (inputRef?.current && currLocationName) {
      inputRef?.current?.setAddressText(`${currLocationName}`);
      // onPlaceSelected(postionCoord, 'origin');
      setOrigin(postionCoord);
    }
  }, [currLocationName]);

  useEffect(() => {
    origin && destination ? setIsDisabled(false) : '';

    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
  }, [origin, destination]);

  const toggleOverlay = () => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);

      navigation.navigate('bookingScreen');
    }, 3000);
  };

  const moveTo = async position => {
    try {
      const camera = await mapRef?.current?.getCamera();
      if (camera) {
        camera.center = position;
        mapRef?.current?.animateToRegion(
          {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1000,
        );
      }
    } catch (error) {
      console.error('move to', error);
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  // const traceRouteOnReady = args => {
  //   if (args) {
  //     setDistance(args.distance);
  //     setDuration(args.duration);
  //   }
  // };

  const onPlaceSelected = (details, flag) => {
    const set = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry?.location?.lat
        ? details?.geometry.location.lat || 0
        : details?.latitude || 0,
      longitude: details?.geometry?.location?.lng
        ? details?.geometry.location.lng || 0
        : details?.longitude || 0,
    };

    set(position);
    moveTo(position);
  };

  const token = useSelector(state => state.user.token);
  console.log('token', token);

  return (
    <View style={styles.container}>
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

        <Text className="font-bold text-black text-xl">
          Searching for a ride
        </Text>
      </Overlay>

      <View style={styles.searchContainer}>
        <InputAutocomplete
          inputRef={inputRef}
          onPlaceSelected={details => {
            onPlaceSelected(details, 'origin');
          }}
        />
        <InputAutocomplete
          placeholder="Where to?"
          onPlaceSelected={details => {
            onPlaceSelected(details, 'destination');
          }}
        />

        {/* {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        ) : null} */}
      </View>

      <MapView
        showsUserLocation={true}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={postionCoord}>
        {origin && <Marker title="Origin" coordinate={origin} />}
        {destination && <Marker title="Destination" coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            // onReady={traceRouteOnReady}
          />
        )}
        {origin || destination ? (
          ''
        ) : (
          <Marker
            title="Yor are here"
            description="This is a description"
            coordinate={postionCoord}
          />
        )}
      </MapView>

      <View className="w-5/6 h-1/5">
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: isDisabled ? '#ADABCD' : '#312E81',
          }}
          onPress={() => {
            toggleOverlay();
          }}
          disabled={isDisabled}>
          <Text style={styles.buttonText}>Find a ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  map: {
    width: Dimensions.get('window').width - 50,
    height: '60%',
    marginTop: '40%',
    zIndex: -1,
  },
  searchContainer: {
    width: '90%',
    minHeight: 20,
    position: 'absolute',
    top: StatusBar.currentHeight,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});
