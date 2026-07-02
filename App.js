import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadFonts from './src/theme/LoadFonts';

import LoginScreen from './src/screens/Auth/LoginScreen';
export default function App() {

  const fontsLoaded = LoadFonts();
  if(!fontsLoaded) return null;
  return (
    <>
      <LoginScreen />
    </>
  );
}


