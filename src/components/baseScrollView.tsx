// Esse componente recebe todas as propriedades aplicáveis para o componente ScrollView do React Native, porém,
// já tem alguns presets padrões para o aplicativo.

import React, { ReactNode } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

export default function BaseScrollView({
    props,
    children,
}: {
    props?: ScrollViewProps;
    children: ReactNode;
}) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ScrollView keyboardShouldPersistTaps="always" {...props}>
            {children}
        </ScrollView>
    );
}
