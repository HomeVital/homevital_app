import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Image } from 'expo-image';
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';
// components
import HvText from "../hvText";
// constants
import { ACTIVE_OPACITY, ANIMATION_CONFIG, FONT_SIZE } from "./constants";
import { TAB_BAR_PADDING, TAB_HEIGHT, TAB_ICON_SIZE, TAB_TEXT_HEIGHT } from "@/constants/sizes";


interface Props {
    onPress: () => void;
    source: string;
    text: string;
    large?: boolean;
    animated?: boolean;
    addOpen?: boolean;
}

const HvTabItem = ({ onPress, source, text, large=false, animated=false, addOpen=false }: Props) => {
    const icon = 
    <Image
    source={source}
    contentFit='contain'
    style={[large ? Styles.tabLogoLarge : Styles.tabLogo,
        (large && !animated) ? Styles.tabLogoLargeUnanimated : {},
    ]}
    />;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: large ? 'absolute' : 'relative',
            bottom: large ? (TAB_ICON_SIZE + TAB_TEXT_HEIGHT + (TAB_BAR_PADDING * 2)) - TAB_ICON_SIZE + 1 : 0,
            height: large ? TAB_ICON_SIZE * 2 : TAB_ICON_SIZE,
            width: "100%",
            rotation: withTiming(addOpen ? 45 : 0, ANIMATION_CONFIG),
        };
    });

    const animatedIcon =
    <Animated.View style={[ animatedStyle ]}>
        {icon}
    </Animated.View>;

    return (
        <TouchableOpacity 
        style={Styles.tabContainer}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onPress}
        >
            {animated ? animatedIcon : icon}
            {large ? <View style={{ height: TAB_ICON_SIZE}}/> : null}
            <HvText size={FONT_SIZE} style={Styles.tabText}>{text}</HvText>
        </TouchableOpacity>
    );
}


const Styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        paddingVertical: TAB_BAR_PADDING,
    },
    tabLogo: {
        width: '100%',
        height: TAB_ICON_SIZE,
    },
    tabLogoLarge: {
        width: '100%',
        height: TAB_ICON_SIZE * 2,
    },
    tabLogoLargeUnanimated: {
        position: 'absolute',
        bottom: TAB_HEIGHT - TAB_ICON_SIZE + 1,
    },
    tabText: {
        textAlign: 'center',
        height: TAB_TEXT_HEIGHT,
    },
});

export default HvTabItem;