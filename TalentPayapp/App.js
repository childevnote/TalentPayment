import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./Screens/HomeScreen";
import SettingScreen from "./Screens/SettingScreen";
import HelpScreen from "./Screens/HelpScreen";
import PayScreen from "./Screens/PayScreen";

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="mainhome"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="pay"
        component={PayScreen}
        options={{
          title: "결제하기",
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: "#694fad" }}
          options={{
            title: "홈",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={32} />
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
            title: "도움",
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
