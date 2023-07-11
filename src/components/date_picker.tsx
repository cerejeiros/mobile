import { FontAwesome } from "@expo/vector-icons";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Keyboard, StyleProp, StyleSheet, ViewStyle } from "react-native";
import colors from "../pallete";
import InputIcon from "./input_icon";

export interface DatePickerProps {
    text: string;
    style?: StyleProp<ViewStyle>;
    textState: Dispatch<SetStateAction<string>>;
    icon: boolean;
    label?: string;
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 15,
        color: colors.black_500,
        fontSize: 15,
    },
});

export default function DatePicker({
    text,
    textState,
    style,
    icon,
    label,
}: DatePickerProps) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === "dismissed") {
            setShow(false);
            return;
        }
        if (selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);
            setShow(false);
            textState(currentDate.toISOString().split("T")[0]);
        }
    };

    const openDatePicker = () => {
        setShow(true);
    };

    if (!icon && !label)
        throw Error("The DatePicker must have a Icon or a label.");

    return (
        <>
            <InputIcon
                style={style}
                onFocus={() => {
                    Keyboard.dismiss();
                    openDatePicker();
                }}
                onChangeText={textState}
                value={text}
                placeholder="AAAA-MM-DD"
                keyboardType="numeric"
                label={icon === false && label ? label : undefined}
                Icon={
                    (icon && (
                        <FontAwesome
                            name="calendar"
                            size={20}
                            color={colors.black_400}
                        />
                    )) ||
                    undefined
                }
            />

            {show && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour
                    maximumDate={new Date()}
                    minimumDate={new Date(1950, 1, 1)}
                    onChange={onChange}
                />
            )}
        </>
    );
}
