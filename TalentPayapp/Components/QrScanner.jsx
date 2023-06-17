import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Vibration, View, Text } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

import * as Api from "../api";

export default function QrScanner({ navigation, target = "pay" }) {
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const barCodeReadHandle = (event) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    const data = event.nativeEvent.codeStringValue;

    let converted = {};
    try {
      converted = JSON.parse(data);
      alert(converted);
    } catch (err) {
      Alert.alert("오류", "유효하지 않은 QR코드입니다! 다시 시도해주세요", [
        { text: "확인", onPress: () => setScaned(true) },
      ]);
    }

    if (!converted) {
      Alert.alert("오류", "유효하지 않은 QR코드입니다! 다시 시도해주세요", [
        { text: "확인", onPress: () => setScaned(true) },
      ]);
    } else {
      navigation.push(target, { id: converted });
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
        학생의 QR 코드를 촬영해주세요!
      </Text>
      <View style={styles.container}>
        <Camera
          style={styles.scanner}
          ref={ref}
          cameraType={CameraType.Back} // Front/Back(default)
          // Barcode Scanner Props
          scanBarcode={true}
          showFrame={false}
          laserColor="rgba(0, 0, 0, 0)"
          frameColor="rgba(0, 0, 0, 0)"
          surfaceColor="rgba(0, 0, 0, 0)"
          onReadCode={barCodeReadHandle}
        />
      </View>
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
  },
  container: {
    width: 300,
    height: 300,

    borderRadius: 20,
    overflow: "hidden",
  },
  scanner: { flex: 1 },
});
