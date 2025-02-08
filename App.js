import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

import points from "./Reducers/Points";
import operatives from "./Reducers/Operatives";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMedal, faPersonRifle } from "@fortawesome/free-solid-svg-icons";

import { useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";

import OperativesScreen from "./Screens/OperativesScreen";
import PointsScreen from "./Screens/PointsScreen";

const Tab = createBottomTabNavigator();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  points,
  operatives,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default function App() {
  let [fontsLoaded] = useFonts({
    Oswald: Oswald_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let icon;

                if (route.name === "Points") {
                  icon = faMedal;
                } else if (route.name === "Operatives") {
                  icon = faPersonRifle;
                }

                return <FontAwesomeIcon icon={icon} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#c54c21",
              tabBarInactiveTintColor: "#343a40",
              headerShown: false,
              tabBarShowLabel: false,
            })}
          >
            <Tab.Screen name="Points" component={PointsScreen} />
            <Tab.Screen name="Operatives" component={OperativesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
