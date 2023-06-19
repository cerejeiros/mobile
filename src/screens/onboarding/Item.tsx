import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from "react-native";
import colors from "../../pallete";
import { ItemData } from "./pages";

const styles = StyleSheet.create({
    container: {
        // flex: 2.5,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
        flexDirection: "column",
    },
    image: {
        // flex: 1,
        justifyContent: "center",
        // backgroundColor: "yellow",
    },
    text: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "900",
        fontSize: 45,
    },
    message: {
        fontSize: 25,
    },
    items: {
        // backgroundColor: "blue",
        flexDirection: "row",
        // flex: 0.5,
        gap: 10,
    },
    item_first_page: {
        //  backgroundColor: "pink"
    },
    item_second_page:{
        position: 'absolute',
    top: 200,
    transform: [{ translateX: -40 }]
    },
    item_third_page:{
        position: 'absolute',
        top: 80,
        transform: [{ translateX: -160 }],
        fontSize: 35,
    },
    item: {
        width: 115,
        height: 50,
        borderRadius: 15,
        backgroundColor: colors.blue_50,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        top: -100,
    },
    item_image: {
        // width: 75, // imagens 2 pag
        height: "40%",
        aspectRatio: 2 / 2,
    },
});

export default function Item(data: ItemData) {
    const { id, title, message, image, items } = data;

    const { width } = useWindowDimensions();
    return (
        <View
            style={[
                styles.container,
                { width },
                id === "1" && styles.item_first_page,
            ]}
        >
            {id === "1" ? (
                <Image
                    source={image}
                    style={[
                        styles.image,
                        {
                            width: width * 0.8,
                            height: width * 0.8,
                            resizeMode: "contain",
                            transform: [{ translateY: 300 }],
                        },
                    ]}
                />
            ) : (
                <Image
                    source={image}
                    style={[
                        styles.image,
                        {
                            width: width / 2,
                            height: width / 2,
                            resizeMode: "contain",
                        },
                    ]}
                />
                
            )}
            <View style={styles.text}>
                <Text style={[
                    styles.title, 
                    id === "1" && { marginTop: -500 },
                    id === "2" && { marginTop: -140},
                    id === "3" && styles.item_third_page,
                ]}>
                    {title}
                </Text>
                <Text style={[
                    styles.message,
                    id === "1" && { marginTop: 10 },
                    id === "2" && styles.item_second_page,
                ]}>
                    {message}
                </Text>
            </View>

            {items && (
                <View style={styles.items}>
                    {items.map((item) => (
                        <View style={styles.item} key={`${item.id}`}>
                            <Text>{item.top}</Text>
                            <Image
                                style={styles.item_image}
                                source={item.image}
                            />
                            <Text>{item.bottom}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}