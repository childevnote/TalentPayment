import { View, Text, StyleSheet } from "react-native";
import QrScanner from "../Components/QrScanner";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <QrScanner navigation={navigation} target={"pay"} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
});
