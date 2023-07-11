// This component is usefull to avoid pages when we want to close Custom Keyboard types like numeric, it don't close when clicking outside the inoutø

import { ReactNode } from "react";
import React, { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function DismissKeyboard({ children }: { children: ReactNode }) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}
