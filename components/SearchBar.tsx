import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Where to...' }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.searchBar,
          isFocused && styles.searchBarFocused
        ]}
      >
        <IconSymbol name="magnifyingglass" size={20} color={Colors.dark.icon} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.dark.icon}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(35, 35, 35, 0.8)',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBarFocused: {
    borderColor: Colors.dark.tint,
    backgroundColor: 'rgba(35, 35, 35, 0.95)',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: Colors.dark.text,
    fontSize: 16,
  },
}); 