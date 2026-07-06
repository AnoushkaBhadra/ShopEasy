import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import LoadFonts from './src/theme/LoadFonts';

//import LoginScreen from './src/screens/Auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import  {Provider} from 'react-redux';
import RootStack from './src/navigation/RootStack'
import store from "./src/store/store";

export default function App() {

  const fontsLoaded = LoadFonts();
  if(!fontsLoaded) return null;
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
    </Provider>
  );
}


