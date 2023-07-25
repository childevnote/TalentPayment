import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import QrScanner from "../Components/QrScanner";
import React from "react";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        source={require("../assets/camp_app_bg.png")}
      />
      {/* <View style={styles.logoContainer}>
        <Image source={require("../assets/logo_x.png")} style={styles.logo} />
      </View> */}
      <View style={{ backgroundColor: "#FFF" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            margin: 10,
          }}
        >
          학생의 QR 코드를 촬영해주세요!
        </Text>
      </View>
      <View style={styles.container}>
        <QrScanner navigation={navigation} target={"pay"} />
      </View>
      <View style={{ backgroundColor: "#FFF", marginTop: 5, borderRadius: 10 }}>
        <Button
          title="혹은, 직접 학생 ID를 입력할 수도 있어요!"
          onPress={() => {
            navigation.push("pay");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#DDE",
  },
  container: {
    width: 300,
    height: 300,

    borderRadius: 20,
    overflow: "hidden",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    left: 20,
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: "contain",
  },
});
