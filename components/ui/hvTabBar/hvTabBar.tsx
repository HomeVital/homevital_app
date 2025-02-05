import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { RelativePathString, router} from 'expo-router';
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';
// components
import HvTabItem from "./hvTabItem";
// constants
import { LIGHT_GRAY, WHITE } from "@/constants/colors";
import { TAB_BAR_PADDING, TAB_ICON_SIZE, TAB_TEXT_HEIGHT } from "@/constants/sizes";
import { ANIMATION_CONFIG } from "./constants";


// for updating routes right
const handleTabRoute = (route: string, prev: string) => {
    if (router.canDismiss() && prev !== route) {
        router.dismiss();
    }
    router.push(route as RelativePathString);
    return route;
}


const HvTabBar = () => {
    const [stackName, setStackName] = useState("");
    const [addOpen, setAddOpen] = useState(false);

    const toggleAddTab = () => {
        setAddOpen(!addOpen);
    }

    // hidden style
    const hiddenStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            bottom: withTiming(addOpen ? 150 : 29, ANIMATION_CONFIG),
            height: 80,
            width: "100%",
            opacity: withTiming(addOpen ? 1 : 0, ANIMATION_CONFIG),
            hidden: addOpen ? 0 : 1,
        };
    });

    return (
        <>
        <Animated.View style={[Styles.tabContainer, hiddenStyle]}>
        <Image
        source={require('@/assets/svgs/add.svg')}
        contentFit='contain'
        style={[ Styles.tabLogoLarge ]}
        />
        <Image
        source={require('@/assets/svgs/add.svg')}
        contentFit='contain'
        style={[ Styles.tabLogoLarge, { position: 'absolute', left: 90, top: 50 } ]}
        />
        <Image
        source={require('@/assets/svgs/add.svg')}
        contentFit='contain'
        style={[ Styles.tabLogoLarge, { position: 'absolute', right: 90, top: 50} ]}
        />
        </Animated.View>

        <View style={Styles.container}>
            <HvTabItem
            onPress={() => {setStackName(handleTabRoute("/(app)/(measurements)", stackName))}} 
            source={require('@/assets/svgs/barChart.svg')}
            text='Mælingar'
            />

            <HvTabItem
            onPress={toggleAddTab}
            source={require('@/assets/svgs/add.svg')}
            text='Skrá mælingu'
            large
            animated
            addOpen={addOpen}
            />

            <HvTabItem
            onPress={() => {setStackName(handleTabRoute("/(app)/(settings)", stackName))}} 
            source={require('@/assets/svgs/manUser.svg')}
            text='Stillingar'
            />
        </View>
        </>
    );
}

const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: LIGHT_GRAY,
  },
  tabContainer: {
    flex: 1,
    paddingVertical: TAB_BAR_PADDING,
    justifyContent: 'flex-end',
  },
  tabText: {
    textAlign: 'center',
    height: TAB_TEXT_HEIGHT,
  },
  tabLogo: {
    width: '100%',
    height: TAB_ICON_SIZE,
  },
  tabLogoLarge: {
    width: '100%',
    height: TAB_ICON_SIZE * 2,
  }
});

export default HvTabBar;