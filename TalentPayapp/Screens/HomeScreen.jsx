import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import QrScanner from "../Components/QrScanner";
import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_x.png')} style={styles.logo} />
      </View>
      <QrScanner />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#DDE",
  },
  container: {
    width: 300,
    height: 300,

    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
  },
});
