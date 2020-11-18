import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import io from 'socket.io-client';
import {Card, Button} from 'react-native-paper';

import {socket_endpoint} from 'globals/constants';
import {WIDTH} from 'constants';
import styles from './location-styles';

const initialRegion = {
  latitude: 12.0,
  longitude: 78.0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function Location() {
  const socket = React.useRef();
  const mapView = React.useRef();
  const [markers, setMarkers] = React.useState({});

  React.useEffect(() => {
    socket.current = io(socket_endpoint, {
      reconnection: true,
    });
    socket.current.on('connect', () => {
      socket.current.on('admin-location', (data) => {
        if (data?.user?.id) {
          markers[data.user.id] = data;
          setMarkers({...markers});
        }
      });
    });
  }, []);

  function handleLocate(location) {
    mapView.current.animateToCoordinate(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        ref={mapView}
        initialRegion={initialRegion}>
        {Object.values(markers).map((marker) => (
          <Marker
            key={marker?.user?.id}
            coordinate={{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
            }}
            title={marker?.user?.name}
            description={`${marker?.user?.mobile} / ${marker?.user?.email}`}
          />
        ))}
      </MapView>
      <View style={styles.carousel}>
        <View style={styles.carousel_container}>
          {Object.values(markers).length ? (
            <Carousel
              onScrollAnimationEnd
              data={Object.values(markers)}
              itemWidth={WIDTH - 50}
              sliderWidth={WIDTH}
              renderItem={({item: {user, location}}) => (
                <Card style={{paddingVertical: 10}}>
                  <Card.Title
                    title={user?.name}
                    subtitle={`${user?.mobile} / ${user?.email}`}
                  />
                  <Card.Actions style={styles.card_actions}>
                    <Button
                      mode="contained"
                      icon="location-enter"
                      onPress={() => handleLocate(location)}>
                      LOCATE
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />
          ) : (
            <View style={styles.loading}>
              <Image
                resizeMode="contain"
                style={{height: '70%'}}
                source={require('../../../assets/loading.gif')}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default Location;
