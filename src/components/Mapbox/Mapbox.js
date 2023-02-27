import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import {Button} from '@rneui/themed';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFmZmFzdW5ueSIsImEiOiJjbDM2Ympic28xbXNzM2NxdjJvNDV1ZXVhIn0.gdTsu3o8vCJu6DL4cJkR7w',
);

const defaultStyle = {
  version: 8,
  name: 'Land',
  sources: {
    map: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      minzoom: 1,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#f2efea',
      },
    },
    {
      id: 'map',
      type: 'raster',
      source: 'map',
      paint: {
        'raster-fade-duration': 100,
      },
    },
  ],
};

// 24.919691, 67.064531

const Mapbox = () => {
  const defaultCoordinates = [63, 24];
  const [location, setLocation] = useState(defaultCoordinates);

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
    MapboxGL.setTelemetryEnabled(false);

    getLocation();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          showUserLocation
          style={styles.map}
          styleJSON={JSON.stringify(defaultStyle)}>
          {/* <MapboxGL.UserLocation visible={true} /> */}
          <MapboxGL.Camera
            zoomLevel={16}
            // centerCoordinate={location}
            centerCoordinate={location}
          />
          <MapboxGL.PointAnnotation
            id="point"
            // coordinate={location}
            coordinate={location}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default Mapbox;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    height: 500,
    width: 370,
    borderRadius: 20,
  },
  map: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
