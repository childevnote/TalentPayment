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
  TouchableOpacity,
} from "react-native";

import * as API from "../api.js";

export default function PayScreen({ route }) {
  const id = route.params?.id ?? -1;
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [payAmount, setPayAmount] = useState(0);

  const handlePay = useCallback(async (updateAmount) => {
    if (userInfo?.talent < updateAmount) {
      Alert.alert("결제 실패", "잔액이 부족합니다");
    } else {
      const newData = await API.post("user/update", {
        id: userInfo.id,
        updateAmount,
      });

      const { id, name, talent, team } = newData.data.user.UPDATED;

      if (updateAmount > 0)
        Alert.alert("충전 완료", `잔액은 ${talent} 달란트 입니다`);
      else Alert.alert("결제 완료", `잔액은 ${talent} 달란트 입니다`);

      setUserInfo({
        id,
        name,
        talent,
        team,
      });
    }
  });

  useEffect(() => {
    if (id !== -1) {
      res = getData(id);
      if (res?.length) setUserInfo(res[0]);
    }
  }, [id]);

  const getData = async function (id) {
    const data = await API.post("user/find", {
      id,
    });

    const { username, talent, team } = data.data;

    if (!username) {
      alert("조회 실패");
      return;
    }

    const message = username + "이(가) 조회되었습니다!";
    if (data?.length) Alert.alert("조회 성공", message);

    // {
    //   id: "123456",
    //   name: "명하준",
    //   age: 15,
    //   team: 7,
    //   talent: 50000,
    // },

    setUserInfo({
      id,
      name: username,
      talent,
      team,
    });
    Keyboard.dismiss();
  };

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
                getData(text);
              }}
            />
          </View>
          {userInfo?.name ? (
            <View style={{ padding: 15 }}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  marginBottom: 5,
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  {userInfo?.team == -1
                    ? `${userInfo.name}`
                    : `${userInfo.team}조 ${userInfo.name}`}{" "}
                </Text>
                <Text style={{ fontSize: 28 }}>님의 잔고는</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 24 }}>
                  {userInfo.talent} 달란트 입니다
                </Text>
              </View>
              <View style={styles.payWrapper}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {[1, 2, 3].map((talent, idx) => (
                    <TouchableOpacity
                      key={`positiveTalent{key}`}
                      style={{ ...styles.button, backgroundColor: "#ffd8c2" }}
                      onPress={() => handlePay(-talent)}
                    >
                      <Text style={styles.buttonText}>-{talent} </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  key={"postivieTalent5"}
                  style={{ ...styles.button, backgroundColor: "#ffbc8f" }}
                  onPress={() => handlePay(-5)}
                >
                  <Text style={styles.buttonText}>-5 달란트</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {[1, 2, 3].map((talent, idx) => (
                    <TouchableOpacity
                      key={`negativeTalent${idx}`}
                      style={{ ...styles.button, backgroundColor: "#c2daff" }}
                      onPress={() => handlePay(talent)}
                    >
                      <Text style={styles.buttonText}>+{talent} </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: "#8fbaff" }}
                  onPress={() => handlePay(5)}
                >
                  <Text style={styles.buttonText}>+5 달란트</Text>
                </TouchableOpacity>
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
  payWrapper: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
