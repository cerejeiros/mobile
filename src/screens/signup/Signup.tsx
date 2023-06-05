// This page allows the end-user to log-in directly within the application,
// It will give one input for a username or an email address (the distinction
// has to be made by a validator).
// And another input for a password, which will be hidden by default.
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";
import Input from "./input";
import Logo from "./logo";

// TODO: Make dimensions a global variable if, and only if width and height does
//       not switch when rotating the screen.
// const dimensions = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
        // borderWidth: 3.5,
        // borderColor: colors.blue[200],
        // borderRadius: 15,
        // backgroundColor: colors.blue[50],
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: -1,
    },
    titlecontainer: {
        marginLeft: 35,
    },

    title: {
        color: "#393939",
        fontSize: 35,
        fontWeight: "bold",
    },
    message: {},
    button: {
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    text: {
        backgroundColor: "transparent",
        fontSize: 15,
        color: "red",
    },
    warning: {
        alignSelf: "center",
        marginBottom: 30,
        flexDirection: "row",
        gap: 5,
    },
    link: {
        color: colors.blue_600,
    },
    /* circulo: {
        width: 400,
        height: 400,
        position: "absolute",
        top: -160,
        left: -100,
        backgroundColor: colors.rose[300],
        borderRadius: 200,
    }, */
});

function Signup() {
    const navigation = useNavigation<NavigationProp<AuthRoutes>>();
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Logo />
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Cadastre-se</Text>
                <Text style={styles.message}> Bem-vindo ao Bloom! </Text>
            </View>
            <Image
                style={styles.background}
                source={require("../../../assets/blurry-gradient-2.png")}
            />
            <Input />
            <View style={styles.warning}>
                <Text>Já cadastrado?</Text>
                <Text
                    onPress={() => {
                        navigation.navigate("signIn");
                    }}
                    style={styles.link}
                >
                    Logue-se
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Signup;
