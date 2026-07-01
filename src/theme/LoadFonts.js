import { useFonts } from "expo-font";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

export default function LoadFonts() {
  const [fontsLoaded] = useFonts({
    "Arsenal-Regular": require("../assets/fonts/Arsenal-Regular.ttf"),
    "Arsenal-Bold": require("../assets/fonts/Arsenal-Bold.ttf"),

    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,

    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  return fontsLoaded;
}