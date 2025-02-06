import { DARK_GREEN, WHITE } from '@/constants/colors';
import { Text, TextProps, StyleSheet } from 'react-native';



interface Props extends TextProps {
    weight?: string; // Allows overriding if needed
    size?: string; // Allows overriding if needed
    color?: string;
}


const HvText = ({ ...props }: Props) => {
    let fontWeight;
    let fontSize;
    let fontColor;

    switch (props.weight) {
        case "semibold":
            fontWeight = Styles.semibold;
            break;
        case "light":
            fontWeight = Styles.light;
            break;
        default:
            fontWeight = Styles.regular;
            break;
    }

    switch (props.size) {
        case "xs":
            fontSize = Styles.xs;
            break;
        case "s":
            fontSize = Styles.s;
            break;
        case "m":
            fontSize = Styles.m;
            break;
        case "l":
            fontSize = Styles.l;
            break;
        case "xl":
            fontSize = Styles.xl;
            break;
        case "xxl":
            fontSize = Styles.xxl;
            break;
        default:
            fontSize = Styles.m;
            break;
    }

    switch (props.color) {
        case "white":
            fontColor = Styles.white;
            break;
        case "darkGreen":
            fontColor = Styles.darkGreen;
            break;
        default:
            fontColor = Styles.darkGreen;
            break
    }

    return (
        <Text 
        style={[
            fontWeight,
            fontSize,
            fontColor,
            props.style
        ]}
        >
            {props.children}
        </Text>
    );
}


const Styles = StyleSheet.create({
    regular: {
        fontFamily: "OpenSans",
    },
    semibold: {
        fontFamily: "OpenSansSemibold",
    },
    light: {
        fontFamily: "OpenSansLight",
    },
    xs: {
        fontSize: 12,
    },
    s: {
        fontSize: 14,
    },
    m: {
        fontSize: 16,
    },
    l: {
        fontSize: 18,
    },
    xl: {
        fontSize: 20,
    },
    xxl: {
        fontSize: 24,
    },
    darkGreen: {
        color: DARK_GREEN,
    },
    white: {
        color: WHITE,
    },
});

export default HvText;