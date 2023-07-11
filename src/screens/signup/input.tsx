import { FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import DatePicker from "../../components/date_picker";
import InputIcon from "../../components/input_icon";
import { GlobalContext } from "../../context/GlobalContext";
import checkPassword from "../../helpers/relevantFunctions";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input_container: {
        marginBottom: 5,
    },
    input: {
        // backgroundColor: "red",
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        color: colors.black_500,
        fontSize: 15,
        flex: 1,
    },
    input_border: {
        marginBottom: 20,
        marginTop: 10,
        paddingBottom: 7.5,
        borderBottomWidth: 1,
        borderBottomColor: colors.black_400,
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
    button_text: { color: colors.white_50 },
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

export default function CadastroInput() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirth] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const { signUp } = useContext(GlobalContext);

    const checkUsernameDuplicated = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", username)
            .returns<{ username: string }[] | null>();

        if (error)
            throw Error(`signUp: checkUsernameDuplicated -> ${error.message}`);

        return data && data?.length > 0;
    };

    const handleSubmit = async () => {
        if (!email) {
            alert("O email é obrigatório");
            return false;
        }

        if (!username) {
            alert("O username é obrigatório");
            return false;
        }

        const usernameIsDuplicated = await checkUsernameDuplicated();
        if (usernameIsDuplicated) {
            alert(`O username ${username} já existe`);
            return false;
        }

        if (!birthday) {
            alert(`A data é obrigatória`);
            return false;
        }

        if (!checkPassword(password)) return false;

        if (!password) {
            alert("A senha é obrigatória");
            return false;
        }

        setIsLoading(true);
        await signUp(email, password, username, birthday);
        setIsLoading(false);
        return true;
    };

    return (
        <View style={styles.container}>
            <View style={styles.input_border}>
                <InputIcon
                    styleContainer={styles.input_container}
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType="default"
                    autoComplete="email"
                    inputMode="email"
                    Icon={
                        <Fontisto
                            name="email"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
            </View>
            <View style={styles.input_border}>
                <InputIcon
                    styleContainer={styles.input_container}
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Usuário"
                    keyboardType="default"
                    Icon={
                        <FontAwesome
                            name="user-o"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
            </View>

            <View style={styles.input_border}>
                <DatePicker
                    style={[styles.input, { flex: 1 }]}
                    text={birthday}
                    textState={setBirth}
                    icon
                />
            </View>

            <View style={styles.input_border}>
                <InputIcon
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    Icon={
                        <FontAwesome
                            name="lock"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
            </View>
            <Button
                style={styles.button}
                onPress={handleSubmit}
                disabled={isloading}
                loading={isloading}
                textColor={styles.button_text.color}
            >
                Cadastrar
            </Button>
        </View>
    );
}
