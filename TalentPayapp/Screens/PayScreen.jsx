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
  ScrollView,
  Image,
  Pressable,
} from "react-native";

import * as API from "../api.js";

function CoinImage() {
  return (
    <Image
      style={{
        width: 50,
        height: 34,
      }}
      source={require("../assets/coin.png")}
    />
  );
}
function CoinsImage() {
  return (
    <Image
      style={{
        width: 50,
        height: 47,
      }}
      source={require("../assets/coins.png")}
    />
  );
}
function BillImage() {
  return (
    <Image
      style={{
        width: 50,
        height: 34,
      }}
      source={require("../assets/bill.png")}
    />
  );
}
function BillsImage() {
  return (
    <Image
      style={{
        width: 50,
        height: 31,
      }}
      source={require("../assets/bills.png")}
    />
  );
}

function PayElement({
  handleLog = () => {},
  handlePay = () => {},
  talent,
  imageType = "coin",
}) {
  return (
    <View style={styles.buttonWrapper}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          key={`positiveTalent{key}`}
          style={{
            ...styles.button,
            backgroundColor: talent >= 0 ? "#c2daff" : "#ffd8c2",
          }}
          onPress={() => handlePay(talent)}
        >
          {imageType == "coin" && <CoinImage />}
          {imageType == "coins" && <CoinsImage />}
          {imageType == "bill" && <BillImage />}
          {imageType == "bills" && <BillsImage />}
        </TouchableOpacity>
        <Text style={styles.buttonText}>
          {talent >= 0 ? talent : -talent} 달란트{" "}
        </Text>
      </View>
      <Pressable
        style={{
          backgroundColor: "#DDD",
          padding: 5,
          borderRadius: 10,
        }}
        onPress={() => {
          handlePay(talent);
          if (talent < 0) {
            handleLog(-talent);
          }
        }}
      >
        <Text style={{ fontSize: 20, color: "#444" }}>
          {" "}
          {talent >= 0 ? "충전하기" : "결제하기"}{" "}
        </Text>
      </Pressable>
    </View>
  );
}

export default function PayScreen({ route }) {
  const id = route.params?.id ?? -1;
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [payAmount, setPayAmount] = useState(0);
  const [isPayWait, setIsPayWait] = useState(false);

  const handleLog = useCallback(async (updateAmount) => {
    const updator = await API.post("log/create", {
      payby: userInfo.id,
      amount: updateAmount,
    });
  });

  const handlePay = useCallback(async (updateAmount) => {
    setIsPayWait(true);
    if (updateAmount < 0 && userInfo?.talent < -updateAmount) {
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
    setIsPayWait(false);
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
        <ScrollView
          vertical
          contentContainerStyle={{
            padding: 10,
          }}
        >
          {isPayWait && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24 }}>결제 시도중...</Text>
            </View>
          )}
          {userInfo?.id?.length > 0 ? (
            <View>
              <Text>다시 조회하기</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
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
            </View>
          )}
          {userInfo?.name ? (
            <View style={{ padding: 5 }}>
              <View
                style={{
                  // backgroundColor: "#FFF",
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
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
              </View>
              <View style={styles.payWrapper}>
                <View style={styles.payTitle}>
                  <Text style={styles.payTitleText}>결제하기</Text>
                </View>

                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={-1}
                  imageType="coin"
                />
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={-2}
                  imageType="coins"
                />
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={-3}
                  imageType="bill"
                />
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={-5}
                  imageType="bills"
                />
              </View>
              <View style={styles.payWrapper}>
                <View style={styles.payTitle}>
                  <Text style={styles.payTitleText}>충전하기</Text>
                </View>
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={+1}
                  imageType="coin"
                />
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={+2}
                  imageType="coins"
                />
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={+3}
                  imageType="bill"
                />
                <PayElement
                  handleLog={handleLog}
                  handlePay={handlePay}
                  talent={+5}
                  imageType="bills"
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgb(240, 242, 245)",
  },
  input: {
    width: "70%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#FFF",

    borderRadius: 10,
    borderColor: "#AAA",
    fontSize: 20,
  },
  btnContainer: {
    // width: "30%",
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  payWrapper: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 0,

    paddingHorizontal: 30,
    marginRight: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 28,
  },
  payTitle: {
    height: 50,
    justifyContent: "center",
  },
  payTitleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "#FA0",
    marginVertical: 10,
    justifyContent: "space-between",
  },
});
