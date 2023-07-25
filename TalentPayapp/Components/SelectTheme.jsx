import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SelectTheme({ selectedButton, setSelectedButton }) {
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
            selectedButton === "cafe" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("cafe")}
        >
          <Text style={styles.buttonText}>☕️ 카페</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "cookie" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("cookie")}
        >
          <Text style={styles.buttonText}>🍪 간식</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "restorant" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("restorant")}
        >
          <Text style={styles.buttonText}>🍽️ 식당</Text>
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
    paddingTop: 120,
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
