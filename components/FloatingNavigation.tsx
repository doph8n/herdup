import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router, usePathname } from 'expo-router';
import { IconSymbol } from './ui/IconSymbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';

export function FloatingNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  
  // Check if we're on specific pages
  const isHomePage = pathname === '/';
  const isProfilePage = pathname.includes('profile');
  const isSettingsPage = pathname.includes('settings');
  
  const handlePress = (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Simple navigation without custom animations
    router.push(path as any);
  };

  // On profile or settings page: Show only home button
  if (isProfilePage || isSettingsPage) {
    return (
      <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <View style={styles.singleButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.homeButton]}
            onPress={() => handlePress('/')}
            activeOpacity={0.7}
          >
            <IconSymbol 
              name="house.fill" 
              size={26} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // On home page: Show profile and settings buttons (no home button)
  if (isHomePage) {
    return (
      <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handlePress('/(tabs)/profile')}
          activeOpacity={0.8}
        >
          <IconSymbol 
            name="person.fill" 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handlePress('/(tabs)/settings')}
          activeOpacity={0.8}
        >
          <IconSymbol 
            name="gear" 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
    );
  }
  
  // On any other page: Show all three buttons
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>      
      <TouchableOpacity
        style={[styles.button, isProfilePage && styles.activeButton]}
        onPress={() => handlePress('/(tabs)/profile')}
        activeOpacity={0.8}
      >
        <IconSymbol 
          name="person.fill" 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isHomePage && styles.activeButton]}
        onPress={() => handlePress('/')}
        activeOpacity={0.8}
      >
        <IconSymbol 
          name="house.fill" 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isSettingsPage && styles.activeButton]}
        onPress={() => handlePress('/(tabs)/settings')}
        activeOpacity={0.8}
      >
        <IconSymbol 
          name="gear" 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingVertical: 10,
    zIndex: 10,
  },
  singleButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#0a7ea4',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1.5,
    shadowColor: '#0a7ea4',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(30, 30, 30, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeButton: {
    backgroundColor: '#0a7ea4',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#0a7ea4',
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
}); 