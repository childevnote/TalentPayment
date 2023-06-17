import { View, Text, StyleSheet, Button, Alert } from "react-native";
import QrScanner from "../Components/QrScanner";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
        학생의 QR 코드를 촬영해주세요!
      </Text>
      <View style={styles.container}>
        <QrScanner navigation={navigation} target={"pay"} />
      </View>
      <Button
        title="혹은, 직접 학생 ID를 입력할 수도 있어요!"
        onPress={() => {
          navigation.push("pay");
        }}
      />
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
  },
});
