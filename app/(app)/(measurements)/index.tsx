import { StyleSheet, TouchableOpacity, View } from "react-native";
// components
import HvScrollView from "@/components/ui/HvScrollView";
// constants
import { STYLES } from "@/constants/styles";
import { WHITE } from "@/constants/colors";
import HvText from "@/components/ui/hvText";
import { Image } from "expo-image";
import { WIN_WIDTH } from "@/constants/window";
import { PADDING } from "@/constants/sizes";

const MainMeasurements = () => {
  return (
    <HvScrollView>
      <View style={STYLES.imageView}>
        <View style={Styles.container}>
          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="contain"
                style={Styles.itemImage}
              />
              <HvText>Blóðþrýstingur</HvText>
            </TouchableOpacity>
          </View>

          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="contain"
                style={Styles.itemImage}
              />
              <HvText>Súrefnismettun</HvText>
            </TouchableOpacity>
          </View>

          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="contain"
                style={Styles.itemImage}
              />
              <HvText>Þyngd</HvText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </HvScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    padding: PADDING,
  },
  itemContainer: {
    width: WIN_WIDTH / 2 - PADDING,
    height: WIN_WIDTH / 2 - PADDING,
    padding: PADDING,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: WHITE,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  itemImage: {
    width: "80%",
    minHeight: "80%",
  },
});

export default MainMeasurements;
