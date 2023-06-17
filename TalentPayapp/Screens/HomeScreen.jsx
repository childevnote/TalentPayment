import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import QrScanner from '../Components/QrScanner';

export default function HomeScreen() {
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
