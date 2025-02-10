import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface Props {
  size: number;
  innerIcon: string;
  outerIcon: string;
  shiftUp?: number;
}

const HvLayeredIcon = ({ size, outerIcon, innerIcon, shiftUp = 0 }: Props) => {
  const topShift = -0.8 * size - shiftUp;

  return (
    <View style={{ width: size, height: size }}>
      <Image source={outerIcon} style={Styles.outer} />
      <Image source={innerIcon} style={[Styles.inner, { top: topShift }]} />
    </View>
  );
};

const Styles = StyleSheet.create({
  outer: {
    width: "100%",
    height: "100%",
  },
  inner: {
    width: "60%",
    height: "60%",
    left: "20%",
    position: "relative",
  },
});

export default HvLayeredIcon;
