import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import React from 'react';
import {useSelector} from 'react-redux';
import {GOOGLE_API_KEY} from '../../../env/Keys';
import {Button, Icon} from '@rneui/base';

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

const SelectRoute = ({navigation}) => {
  const {map} = useSelector(state => state.map);

  const edgePaddingValue = 70;

  const moveTo = async position => {
    const camera = await mapRef.current.getCamera();

    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000});
    }
  };

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
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
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'white',
        height: '100%',
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '90%',
        }}>
        <Button
          type="clear"
          color="#312E81"
          titleStyle={{
            color: 'white',
            fontSize: 16,
          }}
          style={{padding: 5}}
          onPress={() => navigation.navigate('drawerScreens')}>
          <Icon name="chevron-left" color="#312E81" />
        </Button>
      </View>
      <View style={styles.searchContainer}>
        <View style={{flex: 0.2, minHeight: 50}}>
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
        </View>

        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        {/* {distance && duration ? (
        <View>
          <Text>Distance : {distance.toFixed(2)}</Text>
          <Text>Duration : {Math.ceil(duration)} min</Text>
        </View>
      ) : (
        ''
      )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,

    flex: 0.9,
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

export default SelectRoute;
