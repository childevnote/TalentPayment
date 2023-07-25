import { View, Image, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useCallback, useState } from "react";
import Info from "../Components/Info";
import SelectTheme from "../Components/SelectTheme";

import * as API from "../api.js";

export default function HelpScreen() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleHelp = useCallback(async () => {
    console.log(selectedButton);
    await API.get(`help/${selectedButton}`);

    koreanMap = { cafe: "카페", cookie: "간식", restorant: "식당" };
    Alert.alert(
      `${koreanMap[selectedButton]} 팀 도움 요청됨`,
      "엔지니어를 호출했습니다"
    );
  });
  return (
    <View style={styles.wrapper}>
      <View>
        <SelectTheme
          setSelectedButton={setSelectedButton}
          selectedButton={selectedButton}
        />
      </View>
      <Pressable
        style={{
          position: "absolute",

          bottom: 0,
          left: "50%",
          transform: [{ translateX: -50 }],

          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,

          backgroundColor: "#e6e600",

          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleHelp}
      >
        <Text style={{ fontSize: 64 }}>🚨</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
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
