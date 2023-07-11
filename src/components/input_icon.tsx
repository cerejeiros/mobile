// MIT License
//
// Copyright (c) 2023 cerejeiros
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { useRef } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

export interface InputProps extends TextInputProps {
    styleIconContainer?: StyleProp<ViewStyle>;
    styleContainer?: StyleProp<ViewStyle>;
    styleViewContainer?: StyleProp<ViewStyle>;
    position?: "left" | "right";
    Icon?: React.ReactElement;
    label?: string;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    input: {
        color: "red",
    },
    container_icon: {
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    labelInput: {
        color: "#808080",
    },
});

export default function InputIcon(props: InputProps) {
    const {
        allowFontScaling = true,
        keyboardType = "default",
        position = "left",
        autoComplete,
        autoCapitalize,
        inputMode,
        style,
        styleIconContainer,
        styleContainer,
        placeholder,
        Icon,
        value,
        secureTextEntry,
        onChangeText,
        onFocus,
        label,
        styleViewContainer,
    } = props;

    let direction: "column" | "row" | "column-reverse" | "row-reverse";
    switch (position) {
        case "left":
            direction = "row-reverse";
            break;
        case "right":
            direction = "row";
            break;
        default:
            throw Error(
                "Not given the correct parameter for InputIcon component."
            );
    }

    const inputRef = useRef<TextInput>(null);

    if (Icon && label)
        throw Error("A InputIcon can't have a label and a icon.");

    return (
        <View
            style={[
                styleViewContainer,
                {
                    flexDirection: "column",
                    // marginVertical: 15,
                },
            ]}
        >
            {Icon ? undefined : <Text style={styles.labelInput}>{label}</Text>}
            <View
                style={[
                    styles.container,
                    styleContainer,
                    Icon ? { flexDirection: direction } : null,
                ]}
            >
                <TextInput
                    ref={inputRef}
                    allowFontScaling={allowFontScaling}
                    style={[styles.input, style]}
                    autoCapitalize={autoCapitalize}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoComplete={autoComplete}
                    onChangeText={onChangeText}
                    inputMode={inputMode}
                    onFocus={onFocus}
                    value={value}
                    secureTextEntry={secureTextEntry}
                />
                {Icon && (
                    <Pressable
                        style={[styles.container_icon, styleIconContainer]}
                        onPress={() => inputRef.current?.focus()}
                    >
                        {Icon}
                    </Pressable>
                )}
            </View>
        </View>
    );
}
