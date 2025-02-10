import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "expo-image";
import { RelativePathString, router } from "expo-router";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import HideWithKeyboard from "react-native-hide-with-keyboard";
// components
import HvTabItem from "./hvTabItem";
// constants
import { LIGHT_GRAY, WHITE } from "@/constants/colors";
import { TAB_ICON_SIZE } from "@/constants/sizes";
import HvLayeredIcon from "../hvLayeredIcon";
import HvTabItemAnimated from "./hvTabItemAnimated";

const HvTabBar = () => {
  const [stackName, setStackName] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  // for updating routes right
  const handleTabRoute = (route: string, prev: string) => {
    setAddOpen(false); // close add tab if open
    if (router.canGoBack()) {
      router.back();
      if (prev === route) {
        return route;
      }
    }
    router.push(route as RelativePathString);
    return route;
  };

  // animation value
  const opacity = useSharedValue<number>(0);

  useEffect(() => {
    opacity.value = withTiming(addOpen ? 1 : 0);
  }, [addOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      display: opacity.value === 0 ? "none" : "flex",
    };
  });

  return (
    <>
      <TouchableWithoutFeedback onPressOut={() => setAddOpen(false)}>
        <Animated.View style={[Styles.animatedContainer, animatedStyle]}>
          <TouchableOpacity
            onPress={() => {
              setStackName(handleTabRoute("/(app)/(bloodPressure)", stackName));
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
              setStackName(handleTabRoute("/(app)/(bloodOxygen)", stackName));
            }}
          >
            <HvLayeredIcon
              size={TAB_ICON_SIZE * 2}
              outerIcon={require("@/assets/svgs/filledCircle.svg")}
              innerIcon={require("@/assets/svgs/lungs.svg")}
              shiftUp={3}
            />
          </TouchableOpacity>
        </Animated.View>
      </TouchableWithoutFeedback>

      <HideWithKeyboard>
        <View style={Styles.container}>
          <HvTabItem
            onPress={() => {
              setStackName(handleTabRoute("/(app)/(measurements)", stackName));
            }}
            source={require("@/assets/svgs/barChart.svg")}
            text="Mælingar"
          />
          <HvTabItemAnimated
            onPress={() => setAddOpen(!addOpen)}
            source={require("@/assets/svgs/add.svg")}
            source2={require("@/assets/svgs/addRed.svg")}
            text="Skrá mælingu"
            addOpen={addOpen}
            large
          />
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

  animatedContainer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 130,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default HvTabBar;
