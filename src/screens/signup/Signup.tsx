// This page allows the end-user to log-in directly within the application,
// It will give one input for a username or an email address (the distinction
// has to be made by a validator).
// And another input for a password, which will be hidden by default.

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import BackgroundGradient from "../../components/background_gradient";
import BaseScrollView from "../../components/baseScrollView";
import { GlobalContext } from "../../context/GlobalContext";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";
import CadastroInput from "./input";
import Logo from "./logo";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        marginVertical:"25%",
        height: "100%",
        justifyContent: "space-around",
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
});

function Signup() {
    const navigation = useNavigation<NavigationProp<AuthRoutes>>();
    const { height, width } = React.useContext(GlobalContext);
    const statusBarHeight = StatusBar.currentHeight ?? 0;
    console.log(statusBarHeight);
    return (
        <View>
            <BackgroundGradient
                style={{ height: height + (statusBarHeight*2), width }}
            />
            <KeyboardAvoidingView style={styles.container}>
                <BaseScrollView>
                    <Logo />
                    <View style={styles.titlecontainer}>
                        <Text style={styles.title}>Cadastre-se</Text>
                        <Text style={styles.message}>
                            {" "}
                            Bem-vindo ao Bloom!{" "}
                        </Text>
                    </View>
                    <CadastroInput />
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
                </BaseScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

export default Signup;
