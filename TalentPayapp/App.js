import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./Screens/HomeScreen";
import SettingScreen from "./Screens/SettingScreen";
import HelpScreen from "./Screens/HelpScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: "#694fad" }}
          options={{
            headerShown: false,
            title: "홈",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: "#694fad" }}
          options={{
            headerShown: false,
            title: "설정하기",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Help"
          component={HelpScreen}
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: "#694fad" }}
          options={{
            headerShown: false,
            title: "도움요청",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="comment-alert"
                color={color}
                size={32}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
