import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Force dark theme for web
 */
export function useColorScheme() {
  return 'dark';
}
