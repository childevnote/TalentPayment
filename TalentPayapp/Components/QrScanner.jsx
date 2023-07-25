import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Vibration, View, Text } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";
import { useIsFocused } from "@react-navigation/native";

export default function QrScanner({ navigation, target = "pay" }) {
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    setScaned(true);
  }, [isFocused]);

  const onBarCodeRead = (event) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    const data = event.nativeEvent.codeStringValue;

    try {
      dataNumber = Number(data);
      navigation.push("pay", { id: dataNumber });
    } catch (err) {
      alert(err);
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
      onReadCode={onBarCodeRead}
    />
  );
}

const styles = StyleSheet.create({
  scanner: { flex: 1 },
});
