import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabs from './AppTabs';

//HOME
import ProductDetailsScreen from '../screens/Home/ProductDetailsScreen';
import SearchResultScreen from '../screens/Home/SearchResultScreen';

//CART - CHECKOUT
import CheckoutScreen from '../screens/Cart/CheckoutScreen';
import AddressSelectionScreen from '../screens/Cart/AddressSelectionScreen';
import PaymenScreen from '../screens/Cart/PaymenScreen';
import OrderConfirmationScreen from '../screens/Cart/OrderConfirmationScreen';

//ORDERS
import OrderHistoryScreen from '../screens/Orders/OrderHistoryScreen';

//PROFILE
import ImagePickerScreen from '../screens/Profile/ImagePickerScreen';

//SCANNER
import QRScanner from '../screens/Scanner/QRScanner';


const Stack = createNativeStackNavigator(); 


export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName='AppTabs' screenOptions={{headerShown: false}}>
        {/* Bottom Tabs */}
        <Stack.Screen name='AppTabs' component={AppTabs}/>
        {/* Home */}
        <Stack.Screen name='Product Details' component={ProductDetailsScreen}/>
        <Stack.Screen name='Search Result' component={SearchResultScreen} />

        {/* Checkout */}
        <Stack.Screen name='Address Selection' component={AddressSelectionScreen}/>
        <Stack.Screen name='Payment' component={PaymenScreen}/>
        <Stack.Screen name='Order' component={OrderConfirmationScreen} />

        {/* Orders */}
        <Stack.Screen name='Order History' component={OrderHistoryScreen}/>

        {/* Device Features */}
        <Stack.Screen name='QR Scanner' component={QRScanner}/>
        <Stack.Screen name='Image Picker' component={ImagePickerScreen}/>
    </Stack.Navigator>
  )
}
