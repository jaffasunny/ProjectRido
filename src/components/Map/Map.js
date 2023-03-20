import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Map = () => {
  const [position, setPosition] = useState({
    latitude: 24.822783779404638,
    longitude: 67.03416793551688,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const mapRef = useRef();

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
        setPosition(region);
        mapRef.current.animateToRegion(region, 1000);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        ref={ref => {
          mapRef.current = ref;
        }}
        pitchEnabled={true}
        rotateEnabled={true}>
        <Marker
          title="Yor are here"
          description="This is a description"
          coordinate={position}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 500,
    width: 370,
    borderRadius: 20,
    alignSelf: 'center',
  },
  map: {
    flex: 1,
  },
});

export default Map;
