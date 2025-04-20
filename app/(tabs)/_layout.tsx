import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FloatingNavigation } from '@/components/FloatingNavigation';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen 
          name="profile" 
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 250,
            gestureEnabled: true,
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="settings" 
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 250,
            gestureEnabled: true,
            gestureDirection: 'vertical',
          }}
        />
      </Stack>
      <FloatingNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
