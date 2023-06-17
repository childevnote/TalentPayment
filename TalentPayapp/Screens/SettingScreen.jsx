import { View, Image, StyleSheet } from "react-native";
import SelectTheme from "../Components/SelectTheme";

export default function SettingScreen() {
  return (<View style={styles.wrapper}>
    <View style={styles.logoContainer}>
      <Image source={require('../assets/logo_x.png')} style={styles.logo} />
    </View>
    <SelectTheme />
  </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
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
