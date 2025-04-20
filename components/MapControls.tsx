import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter?: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onRecenter }: MapControlsProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { top: insets.top + 80 }]}>
      <View style={styles.controlsGroup}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={onZoomIn}
          activeOpacity={0.7}
        >
          <IconSymbol name="plus" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={onZoomOut}
          activeOpacity={0.7}
        >
          <IconSymbol name="minus" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {onRecenter && (
        <TouchableOpacity 
          style={[styles.controlButton, styles.recenterButton]}
          onPress={onRecenter}
          activeOpacity={0.7}
        >
          <IconSymbol name="location.fill" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 5,
  },
  controlsGroup: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 20,
    padding: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  recenterButton: {
    backgroundColor: '#0a7ea4',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#0a7ea4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
}); 