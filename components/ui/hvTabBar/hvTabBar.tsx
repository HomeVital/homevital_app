import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { RelativePathString, router } from "expo-router";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import HideWithKeyboard from "react-native-hide-with-keyboard";
// components
import HvTabItem from "./hvTabItem";
// constants
import { LIGHT_GRAY, WHITE } from "@/constants/colors";
import {
  TAB_BAR_PADDING,
  TAB_ICON_SIZE,
  TAB_TEXT_HEIGHT,
} from "@/constants/sizes";
import { ANIMATION_CONFIG } from "./constants";
import HvLayeredIcon from "../hvLayeredIcon";

// for updating routes right
const handleTabRoute = (route: string, prev: string) => {
  if (router.canDismiss()) {
    router.dismiss();
    if (prev === route) {
      return route;
    }
  }
  router.push(route as RelativePathString);
  return route;
};

const HvTabBar = () => {
  const [stackName, setStackName] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const toggleAddTab = () => {
    setAddOpen(!addOpen);
  };

  // // hidden style
  // const hiddenStyle = useAnimatedStyle(() => {
  //   return {
  //     position: "absolute",
  //     bottom: withTiming(addOpen ? 150 : 29, ANIMATION_CONFIG),
  //     height: 80,
  //     width: "100%",
  //     left: "40%",
  //     opacity: withTiming(addOpen ? 1 : 0, ANIMATION_CONFIG),
  //     borderBlockColor: "black",
  //     borderBlockWidth: 1,
  //     zIndex: -10,
  //   };
  // });

  return (
    <>
      <HideWithKeyboard>
        <View style={Styles.container}>
          <HvTabItem
            onPress={() => {
              setStackName(handleTabRoute("/(app)/(measurements)", stackName));
            }}
            source={require("@/assets/svgs/barChart.svg")}
            text="Mælingar"
          />
          <HvTabItem
            onPress={toggleAddTab}
            source={require("@/assets/svgs/add.svg")}
            text="Skrá mælingu"
            large
            // animated
            // addOpen={addOpen}
          >
            {/* <Animated.View style={[Styles.tabContainer, hiddenStyle]}>
              <TouchableOpacity
                onPress={() => {
                  setStackName(
                    handleTabRoute("/(app)/(bloodPressure)", stackName)
                  );
                }}
              >
                <HvLayeredIcon
                  size={TAB_ICON_SIZE * 2}
                  outerIcon={require("@/assets/svgs/filledCircle.svg")}
                  innerIcon={require("@/assets/svgs/heart.svg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStackName(handleTabRoute("/(app)/(weight)", stackName));
                }}
              >
                <HvLayeredIcon
                  size={TAB_ICON_SIZE * 2}
                  outerIcon={require("@/assets/svgs/filledCircle.svg")}
                  innerIcon={require("@/assets/svgs/scale.svg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStackName(
                    handleTabRoute("/(app)/(bloodOxygen)", stackName)
                  );
                }}
              >
                <HvLayeredIcon
                  size={TAB_ICON_SIZE * 2}
                  outerIcon={require("@/assets/svgs/filledCircle.svg")}
                  innerIcon={require("@/assets/svgs/lungs.svg")}
                  shiftUp={3}
                />
              </TouchableOpacity>
            </Animated.View> */}
          </HvTabItem>
          <HvTabItem
            onPress={() => {
              setStackName(handleTabRoute("/(app)/(settings)", stackName));
            }}
            source={require("@/assets/svgs/manUser.svg")}
            text="Stillingar"
          />
        </View>
      </HideWithKeyboard>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: LIGHT_GRAY,
  },

  tabContainer: {
    flex: 1,
    // paddingVertical: TAB_BAR_PADDING,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default HvTabBar;
