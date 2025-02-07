import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducers/User";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMedal, faPersonRifle } from "@fortawesome/free-solid-svg-icons";

import { useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";

import OperativesScreen from "./Screens/OperativesScreen";
import PointsScreen from "./Screens/PointsScreen";

const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
});

export default function App() {
  let [fontsLoaded] = useFonts({
    Oswald: Oswald_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
