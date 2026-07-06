import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import LoadFonts from "./src/theme/LoadFonts";

import RootStack from "./src/navigation/RootStack";

import { store, persistor } from "./src/store/store";

export default function App() {
  const fontsLoaded = LoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}