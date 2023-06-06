import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Vibration, View, Text } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

import * as Api from "../api";

export default function QrScanner() {
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = (event) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    const data = event.nativeEvent.codeStringValue;

    let converted = {};
    try {
      converted = JSON.parse(data);
    } catch (err) {
      Alert.alert("오류", "유효하지 않은 QR코드입니다! 다시 시도해주세요", [
        { text: "확인", onPress: () => setScaned(true) },
      ]);
    }

    if (!converted.storeID || !converted.deviceNumber) {
      Alert.alert("오류", "유효하지 않은 QR코드입니다! 다시 시도해주세요", [
        { text: "확인", onPress: () => setScaned(true) },
      ]);
    } else if (!userInfo?.user.uid) {
      Alert.alert("계정 오류!", "로그인 후 다시 시도해주세요");
    } else {
      Alert.alert(
        "기기 로그인 성공!",
        `${converted?.storeID}호점 ${converted?.deviceNumber}번 기기가 활성화되었습니다!`,
        [
          {
            text: "확인",
            onPress: async () => {
              //   try {
              //     const res = await Api.post("kiosk/activate", {
              //       uid: userInfo?.user.uid,
              //       storeID: converted?.storeID,
              //       deviceNumber: converted?.deviceNumber,
              //     });
              //   } catch (err) {
              //     setScaned(true);
              //     Alert.alert("post error", err.message);
              //   }
              setScaned(true);
            },
          },
        ]
      );
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
          onReadCode={onBarCodeRead}
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
