import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../../components/button";
import InputIcon from "../../components/input_icon";
import { GlobalContext } from "../../context/GlobalContext";
import checkPassword from "../../helpers/relevantFunctions";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black_500,
        fontSize: 15,
    },
    border_input: {
        borderBottomColor: colors.black_400,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    title: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    label: {
        paddingTop: 40,
        color: "black",
    },
    button: {
        margin: 10,
        backgroundColor: colors.rose_300,
    },
    button_text: {
        color: colors.white_50,
    },
    button_out: {
        margin: 10,
        borderColor: colors.rose_100,
        backgroundColor: colors.rose_50,
    },
    button_out_text: {
        color: colors.rose_300,
    },
    divider: {
        alignSelf: "center",
        marginVertical: 5,
        textTransform: "lowercase",
    },
    link: {
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "flex-end",
        color: colors.blue_600,
        fontSize: 12.5,
        fontWeight: "bold",
    },
});

function EmailInput({
    text,
    textState,
}: {
    text: string;
    textState: Dispatch<SetStateAction<string>>;
}) {
    return (
        <View style={styles.border_input}>
            <InputIcon
                style={styles.input}
                onChangeText={textState}
                value={text}
                placeholder="Email ou Usuário"
                keyboardType="default"
                autoComplete="email"
                inputMode="email"
                position="left"
                Icon={
                    <FontAwesome
                        name="user-o"
                        size={20}
                        color={colors.black_400}
                    />
                }
            />
        </View>
    );
}

function PasswordInput({
    password,
    setPassword,
}: {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
}) {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [iconNamePassword, seticonNamePassword] = useState("eye");

    return (
        <View
            style={[
                styles.border_input,
                {
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "red",
                    marginTop: 30,
                },
            ]}
        >
            <InputIcon
                styleViewContainer={{ flex: 1 }}
                // styleContainer={{ backgroundColor: "blue" }}
                style={
                    styles.input
                    // { backgroundColor: "green" },
                }
                onChangeText={setPassword}
                // onEndEditing={(e: any) => handlePasswordChange(password)}
                placeholder="Senha"
                secureTextEntry={passwordVisibility}
                value={password}
                position="left"
                Icon={
                    <FontAwesome
                        name="lock"
                        size={20}
                        color={colors.black_400}
                    />
                }
            />
            <Pressable
                onPress={() => {
                    setPasswordVisibility(!passwordVisibility);
                    if (iconNamePassword === "eye")
                        seticonNamePassword("eye-off");
                    else seticonNamePassword("eye");
                }}
                style={{
                    width: 25,
                    alignSelf: "flex-end",
                    aspectRatio: 1,
                    // backgroundColor: "pink",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Feather
                    name={iconNamePassword as never}
                    size={20}
                    color={colors.black_400}
                />
            </Pressable>
        </View>
    );
}

export default function LoginInput() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, signUp, signOut } = useContext(GlobalContext);

    return (
        <View style={styles.container}>
            <EmailInput text={email} textState={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <Text style={styles.link}>Esqueceu sua senha?</Text>
            <Button
                style={styles.button}
                onPress={async () => {
                    if (email && checkPassword(password)) {
                        try {
                            await signIn(email, password);
                        } catch (e) {
                            window.alert("Informações de login Incorretas");
                        }
                    } else {
                        console.error(
                            "Por favor preencha os campos que não estão preenchidos"
                        );
                    }
                }}
                title="Entrar"
                titleStyle={styles.button_text}
            />
        </View>
    );
}
