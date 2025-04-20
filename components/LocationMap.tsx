import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Platform, Alert, Keyboard } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Colors } from '@/constants/Colors';
import { MapControls } from './MapControls';

interface LocationMapProps {
  style?: object;
}

export function LocationMap({ style }: LocationMapProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setLocation(location);
        
        // Set initial region
        const initialRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(initialRegion);
        
      } catch (error) {
        setErrorMsg('Could not get your location');
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleZoomIn = () => {
    if (mapRef.current && region) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      };
      mapRef.current.animateToRegion(newRegion, 300);
      setRegion(newRegion);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current && region) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      };
      mapRef.current.animateToRegion(newRegion, 300);
      setRegion(newRegion);
    }
  };

  const handleRecenter = () => {
    if (mapRef.current && location) {
      const centerRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(centerRegion, 500);
      setRegion(centerRegion);
    }
  };

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </View>
    );
  }

  if (errorMsg) {
    console.error(errorMsg);
    return <View style={[styles.container, style]} />;
  }

  if (!location || !region) {
    return <View style={[styles.container, style]} />;
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        showsCompass
        rotateEnabled
        scrollEnabled
        zoomEnabled
        onPanDrag={() => Keyboard.dismiss()}
        onPress={() => Keyboard.dismiss()}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />
      </MapView>
      
      <MapControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
}); 