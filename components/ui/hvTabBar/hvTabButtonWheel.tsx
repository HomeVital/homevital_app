import { TouchableOpacity, View, StyleSheet } from "react-native";
import HvLayeredIcon from "../hvLayeredIcon";
import { TAB_ICON_SIZE } from "@/constants/sizes";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface Props {
  state: boolean;
  bottom: number;
  roundness: number;
  radius: number;
  buttons: {
    icon: string;
    onPress: () => void;
  }[];
}

const HvTabButtonWheel = ({
  state,
  bottom,
  radius,
  roundness,
  buttons,
}: Props) => {
  var radianConverter = (index: number) => {
    return (
      ((index + 0.5) / buttons.length) * (Math.PI * (roundness * 2)) +
      Math.PI * ((1 - roundness * 2) / 2)
    );
  };

  var buttonAnimatedStyles = (index: number) => {
    return {
      bottom:
        Math.sin(radianConverter(index)) * Math.sqrt(buttons.length) * radius +
        bottom,
      left:
        Math.cos(radianConverter(index)) * Math.sqrt(buttons.length) * radius,
    };
  };

  return (
    <View style={Styles.container}>
      {buttons.map((button, index) => {
        const position = useSharedValue({ bottom: 0, left: 0 });

        // make the animation take 1 sec
        useEffect(() => {
          position.value = withTiming(
            state ? buttonAnimatedStyles(index) : { bottom: 0, left: 0 }
          );
        }, [state]);

        const buttonStyle = useAnimatedStyle(() => {
          return {
            bottom: position.value.bottom,
            left: position.value.left,
            position: "absolute",
          };
        });

        return (
          <TouchableOpacity key={index} onPress={button.onPress}>
            <Animated.View style={buttonStyle}>
              <HvLayeredIcon
                size={TAB_ICON_SIZE * 2}
                outerIcon={require("@/assets/svgs/filledCircle.svg")}
                innerIcon={button.icon}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    left: -TAB_ICON_SIZE,
    bottom: TAB_ICON_SIZE,
  },
  buttonClosed: {
    bottom: 0,
    left: 0,
  },
});

export default HvTabButtonWheel;
