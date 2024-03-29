import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';

export default function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
