import { ImageRequireSource } from "react-native";

export interface ItemData {
    id: string;
    title: string;
    message: string;
    image: ImageRequireSource;
    items?: Array<{
        id: string;
        top: string;
        image: ImageRequireSource;
        bottom: string;
    }>;
}

export default [
    {
        id: "1",
        title: "  Bem vindos ao \n         Bloom!",
        message: "            seu app de rotina",
        image: require("../../../assets/logo_sun.png"),
       
    },
    {
        id: "2",
        title: "Nosso alvo",
        message:
            " O Bloom veio para renovar o cenário de apps de rotina, contando com:",
            image: require("../../../assets/logo_sun.png"),
        items: [
            {
                id: "1",
                top: "Desafios",
                image: require("../../../assets/char_pin_light.png"),
                bottom: "diários",
            },
            {
                id: "2",
                top: "Estatísticas",
                image: require("../../../assets/cup_3.png"),
                bottom: "precisas",
            },
            {
                id: "3",
                top: "Recompensas",
                image: require("../../../assets/sun_mountain.png"),
                bottom: "diárias",
            },
        ],
    },
    {
        id: "3",
        title: " Desfrute dessa nova forma de florescer e\n    progredir em sua \n           rotina \n  Acesse o Bloom!",
        message: "",
        image: require("../../../assets/logo_sun.png"),
    },
] satisfies Array<ItemData>;
