import React from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";
import { ItemData } from "./pages";

export interface Items {
    data: Array<ItemData>;
    scrollX: Animated.Value;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // height: 64,
        // backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "black",
        marginHorizontal: 8,
    },
});

export default function Paginator({ data, scrollX }: Items) {
    const { width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            {data.map((item, i) => {
                const inputRange = [
                    (i - 1) * width,
                    i * width,
                    (i + 1) * width,
                ];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: "clamp",
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });
                return (
                    <Animated.View
                        style={[styles.dot, { width: dotWidth, opacity }]}
                        key={item.id}
                    />
                );
            })}
        </View>
    );
}
