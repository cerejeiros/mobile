import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie } from "victory-native";
import { GlobalContext } from "../../context/GlobalContext";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";
import months from "../../shared/months";
import info from "./phrases";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 160,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        justifyContent: "flex-end",
        padding: 50,
        alignSelf: "center",
        width: "100%",
        position: "absolute",
        alignContent: "center",
    },
    headerText: {
        fontSize: 25,
        borderRadius: 10,
        textAlign: "center",
        color: colors.white_500,
        backgroundColor: colors.white_300,
    },
    imagecontainer: {
        position: "absolute",
        top: -450,
        alignSelf: "center",
    },
    sun: {
        transform: [{ rotate: "165deg" }],
    },

    cerej: {
        position: "absolute",
        margin: 0,
        top: 120,
        right: 0,
    },
    date: {
        position: "absolute",
        marginLeft: 60,
        height: 90,
        top: 120,
        flexDirection: "column",
    },
    day: {
        fontSize: 80,
        color: colors.white_500,
    },
    month: {
        fontSize: 15,
        textTransform: "uppercase",
        color: colors.white_500,
        alignSelf: "center",
    },
    containerDayPhrase: {
        width: "90%",
        minHeight: 90,
        maxHeight: 180,
        rowGap: 5,
        margin: 25,
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.white_300,
    },
    dayPhrase: {
        opacity: 1,
        textAlign: "left",
        fontSize: 20,
        color: colors.white_500,
    },
    dayPhraseAuthor: {
        textAlign: "left",
        fontSize: 12,
        color: colors.white_100,
    },
    dayPhraseLink: {
        fontSize: 18,
        color: colors.white_600,
    },
    containerStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        borderRadius: 10,
        margin: 15,
        padding: 20,
        backgroundColor: colors.white_300,
    },
    textStats: {
        textAlign: "left",
        fontSize: 20,
    },
    containerbuttons: {
        width: "100%",
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        width: 140,
        height: 80,
        borderRadius: 10,
        margin: 15,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white_300,
    },
    containerStatsDescription: {
        alignContent: "center",
        justifyContent: "space-evenly",
        width: "40%",
        flexDirection: "row",
        rowGap: 10,
        flexWrap: "wrap",
    },
    containerstatsbutton: {
        padding: 8,
    },
    textbutton: {
        fontSize: 10,
        textAlign: "center",
    },
    blueCircle: {
        width: 20,
        backgroundColor: colors.blue_300,
        borderRadius: 100,
    },
    redCircle: {
        width: 20,
        backgroundColor: colors.rose_400,
        borderRadius: 100,
    },
});

export default function Home() {
    const { userData } = useContext(GlobalContext);

    const navigation = useNavigation<StackNavigatorRoutesProps>();
    const date = new Date();
    const frase = info[date.getUTCDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return (
        <ScrollView>
            <View style={styles.imagecontainer}>
                <Image
                    style={styles.sun}
                    source={require("../../../assets/luasol.png")}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Olá, {userData?.username}</Text>
            </View>
            <Image
                style={styles.cerej}
                source={require("../../../assets/cereje.png")}
            />
            <View style={styles.date}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.month}>de {month.month}</Text>
            </View>

            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.containerDayPhrase}
                    activeOpacity={1}
                >
                    <Text style={styles.dayPhrase}>{frase.phrase}</Text>
                    <Text style={styles.dayPhraseAuthor}>{frase.author}</Text>
                    <Text
                        style={styles.dayPhraseLink}
                        onPress={() => Linking.openURL(frase.podcast)}
                    >
                        Clique aqui para ver o podcast recomendado de hoje
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.containerStats}
                    onPress={() => navigation.navigate("Status")}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Status")}
                    >
                        {userData?.habits ? (
                            <VictoryPie
                                width={150}
                                height={150}
                                padAngle={3}
                                innerRadius={50}
                                padding={0}
                                colorScale={[colors.blue_300, colors.rose_400]}
                                data={[
                                    {
                                        x: " ",
                                        y: userData?.tasks.reduce(
                                            (accumulator, currentValue) =>
                                                currentValue.completed
                                                    ? accumulator + 1
                                                    : accumulator,
                                            0
                                        ),
                                    },
                                    {
                                        x: " ",
                                        y: userData?.tasks.reduce(
                                            (accumulator, currentValue) =>
                                                !currentValue.completed
                                                    ? accumulator + 1
                                                    : accumulator,
                                            0
                                        ),
                                    },
                                ]}
                            />
                        ) : (
                            <Text> CARREGANDO </Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.containerStatsDescription}>
                        <Text> Concluído </Text>
                        <View style={styles.blueCircle} />
                        <Text> Em progresso </Text>
                        <View style={styles.redCircle} />
                    </View>
                </TouchableOpacity>

                <View style={styles.containerbuttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Tasks");
                        }}
                    >
                        <Text style={styles.textbutton}>Crie um hábito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Today");
                        }}
                    >
                        <Text style={styles.textbutton}>
                            Acompanhe seus Habitos
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
