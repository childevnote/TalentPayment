import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";

const MockUp = [
  {
    id: "123456",
    name: "명하준",
    age: 15,
    team: 7,
    talent: 50000,
  },
];

export default function PayScreen({ route }) {
  const id = route.carams?.id ?? -1;
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [payAmount, setPayAmount] = useState(0);

  useEffect(() => {
    if (id !== -1) {
      getUser();
    }
  }, [id]);

  const getUser = useCallback((targetId) => {
    // 나중에 API 써서 쿼리하는 걸로 바꿔야 함
    const res = MockUp.filter((item) => item.id === targetId);
    if (res.length) return res;
  });

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            inner: {
              padding: 24,
              flex: 1,
              justifyContent: "space-around",
            },
          }}
        >
          <TextInput
            style={styles.input}
            value={text}
            placeholder="학생 ID를 입력해주세요(4자리)"
            keyboardType="numeric"
            onChangeText={(e) => {
              setText(e);
            }}
          />

          <View style={styles.btnContainer}>
            <Button
              title="조회하기"
              onPress={() => {
                if (text) {
                  const data = getUser(text);
                  const message = data[0].name + " 학생이 조회되었습니다!";
                  if (data?.length) Alert.alert("조회 성공", message);
                  setUserInfo(data[0]);
                  Keyboard.dismiss();
                } else {
                  Alert.alert(
                    "경고",
                    "아무 ID도 입력되지 않았어요! 다시 시도해주세요"
                  );
                }
              }}
            />
          </View>
          {userInfo?.name ? (
            <View style={{ padding: 15 }}>
              <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  {userInfo.team}조 {userInfo.name} 학생
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 24 }}>
                  보유 금액 : {userInfo.talent} 달란트
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                  borderWidth: 0,
                  borderColor: "#000",
                  borderTopWidth: 1,
                  padding: 15,
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 24 }}>결제할 금액을 입력해주세요</Text>
                <TextInput
                  style={{ ...styles.input, width: 350 }}
                  value={payAmount}
                  placeholder="얼마나 사용할까요?"
                  keyboardType="numeric"
                  onChangeText={(e) => {
                    setPayAmount(e);
                  }}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title="결제하기"
                  onPress={() => {
                    if (userInfo?.talent < payAmount)
                      Alert.alert("결제 실패", "승인 거부 : 잔고 부족");
                    else {
                      Alert.alert("추후 구현");
                    }
                  }}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    justifyContent: "center",
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFF",

    borderRadius: 10,
  },
  btnContainer: {
    marginTop: 0,
  },
});
