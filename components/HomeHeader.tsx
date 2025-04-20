import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from './SearchBar';

export function HomeHeader() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <SearchBar onSearch={(text) => console.log('Search:', text)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
}); 