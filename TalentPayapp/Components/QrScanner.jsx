import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Vibration, View, Text } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

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
      converted = Number(JSON.parse(data));
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
  );
}

const styles = StyleSheet.create({
  scanner: { flex: 1 },
});
