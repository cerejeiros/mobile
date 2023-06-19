import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import colors from "../../pallete";

export interface NextProps {
    percentage: number;
    scrollTo: () => void;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "5%",
        
    },
    button: {
        position: "absolute",
        backgroundColor: colors.white_50,
        borderRadius: 100,
        padding: 20,
    },
});

const enum defaults {
    PI = 3.141592653589793,
    size = 64 + 32,
    strokeWidth = 2,
    center = size / 2,
    radius = size / 2 - strokeWidth / 2,
    circumference = 2 * PI * radius,
}

export default function Next({ percentage, scrollTo }: NextProps) {
    const progressAnimation = React.useRef(new Animated.Value(0)).current;
    // FIXIT: To change any to Circle
    //        https://github.com/facebook/react-native/issues/36848
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const progressRef = React.useRef<any>(null);

    const animation = React.useCallback(
        (toValue: number) => {
            return Animated.timing(progressAnimation, {
                toValue,
                duration: 200,
                useNativeDriver: true,
            }).start();
        },
        [progressAnimation]
    );

    React.useEffect(() => {
        animation(percentage);
    }, [animation, percentage]);

    React.useEffect(() => {
        progressAnimation.addListener((data) => {
            const strokeDashoffset =
                defaults.circumference -
                (defaults.circumference * data.value) / 100;

            if (progressRef?.current) {
                progressRef.current.setNativeProps({ strokeDashoffset });
            }
        });

        return () => {
            progressAnimation.removeAllListeners();
        };
    }, [progressAnimation, percentage]);

    return (
        <View style={styles.container}>
            <Svg width={defaults.size} height={defaults.size}>
                <G rotation="-90" origin={defaults.center}>
                    <Circle
                        stroke={colors.blue_300}
                        cx={defaults.center}
                        cy={defaults.center}
                        r={defaults.radius}
                    />
                    <Circle
                        ref={progressRef}
                        stroke={colors.white_500}
                        cx={defaults.center}
                        cy={defaults.center}
                        r={defaults.radius}
                        strokeWidth={defaults.strokeWidth}
                        strokeDasharray={defaults.circumference}
                        /* strokeDashoffset={
                            defaults.circumference -
                            (defaults.circumference * 60) / 100
                        } */
                    />
                </G>
            </Svg>
            <TouchableOpacity
                onPress={scrollTo}
                style={styles.button}
                activeOpacity={0.6}
            >
                <AntDesign name="arrowright" size={32} color="#f0f" />
            </TouchableOpacity>
        </View>
    );
}
