import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import colors from "../pallete";

export default function BackgroundGradient({
    style,
}: {
    style?: StyleProp<ViewStyle>;
}) {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[
                colors.rose_100,
                "transparent",
                colors.blue_100,
                "transparent",
                "transparent",
                colors.rose_100,
                "transparent",
            ]}
            style={[
                {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                },
                style,
            ]}
        />
    );
}
