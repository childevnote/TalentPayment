import { View, Text, StyleSheet } from 'react-native';

export default function Info() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.info}>
                <Text style={{ fontWeight: "bold" }}>문제가 발생했을 경우 아래 연락처로 문의 주시기 바랍니다.</Text>
                <Text>📞 010-7216-1580</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: "100%",
    },
    info: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        margin: 10,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 7,
        elevation: 3,
    },
});

