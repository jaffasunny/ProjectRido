import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from './../../../env/Keys';
import {useEffect, useRef, useState} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

// https://docs.expo.dev/versions/latest/sdk/map-view/
// https://www.npmjs.com/package/react-native-google-places-autocomplete
// https://www.npmjs.com/package/react-native-maps-directions

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

function InputAutocomplete({placeholder, onPlaceSelected}) {
  return (
    <>
      <GooglePlacesAutocomplete
        styles={{textInput: styles.input}}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
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
  const [postionCoord, setPostionCoord] = useState({
    latitude: 40.76711,
    longitude: -73.979704,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
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
        mapRef.current.animateToRegion(region, 1000);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    origin && destination ? setIsDisabled(false) : '';

    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
  }, [origin, destination]);

  const moveTo = async position => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000});
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = args => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <InputAutocomplete
          placeholder="Current location"
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
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={postionCoord}>
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
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
          onPress={() => navigation.navigate('bookingScreen')}
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
