import { View, Text, StyleSheet } from "react-native";
import QrScanner from "../Components/QrScanner";

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <QrScanner />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
});
