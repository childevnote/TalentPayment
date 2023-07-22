import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SelectTheme() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (theme) => {
    setSelectedButton(theme);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
        {selectedButton
          ? `${selectedButton} 스태프 선생님, 반갑습니다👋`
          : "분야 정보를 선택해주세요."}
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "카페" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("카페")}
        >
          <Text style={styles.buttonText}>☕️카페</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "과자" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("과자")}
        >
          <Text style={styles.buttonText}>🍪과자</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "식당" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("식당")}
        >
          <Text style={styles.buttonText}>🍽️식당</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  container: {
    // flexDirection: 'row',
    width: "100%",
    marginTop: 10,
  },
  button: {
    width: "100%",
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#ECECEC",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: "#3377FF",
    color: "#FFF",
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
});
