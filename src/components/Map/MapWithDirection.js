import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Dimensions,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '../../../env/Keys';

function InputAutocomplete({label, placeholder, onPlaceSelected}) {
  return (
    <>
      <Text>{label}</Text>
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

const MapWithDirection = () => {
  // 67.0644496, 24.9196887
  const defaultCoordinates = [67.0644496, 24.9196887];
  const [location, setLocation] = useState(defaultCoordinates);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

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
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation([
              position?.coords?.longitude,
              position?.coords?.latitude,
            ]);
            console.log(location);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const mapRef = useRef(null);

  const moveTo = async position => {
    const camera = await mapRef.current.getCamera();

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

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
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
    <>
      <MapView
        ref={mapRef}
        style={{width: '100%', height: '80%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location[1],
          longitude: location[0],
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
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
      </MapView>

      <View style={styles.searchContainer}>
        <InputAutocomplete
          label="Origin"
          placeholder="Search"
          onPlaceSelected={details => {
            onPlaceSelected(details, 'origin');
          }}
        />
        <InputAutocomplete
          label="Destination"
          placeholder="Search"
          onPlaceSelected={details => {
            onPlaceSelected(details, 'destination');
          }}
        />

        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance : {distance.toFixed(2)}</Text>
            <Text>Duration : {Math.ceil(duration)} min</Text>
          </View>
        ) : (
          ''
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: StatusBar.currentHeight,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default MapWithDirection;
