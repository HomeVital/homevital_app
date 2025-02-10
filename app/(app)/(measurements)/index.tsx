import { StyleSheet, TouchableOpacity, View } from "react-native";
// components
import HvScrollView from "@/components/ui/HvScrollView";
// constants
import { STYLES } from "@/constants/styles";
import { WHITE } from "@/constants/colors";
import HvText from "@/components/ui/hvText";
import { Image } from "expo-image";
import { WIN_WIDTH } from "@/constants/window";

const MainMeasurements = () => {
  return (
    <HvScrollView>
      <View style={STYLES.defaultView}>
        <View style={Styles.container}>
          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="contain"
                style={Styles.itemImage}
              />
              <HvText center>Blóðþrýstingur</HvText>
            </TouchableOpacity>
          </View>

          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="contain"
                style={Styles.itemImage}
              />
              <HvText center>Súrefnismettun</HvText>
            </TouchableOpacity>
          </View>

          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="contain"
                style={Styles.itemImage}
              />
              <HvText center>Þyngd</HvText>
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
  },
  itemContainer: {
    // since grid doesn't work, I force height height to be same as width
    width: WIN_WIDTH / 2 - 20,
    height: WIN_WIDTH / 2 - 20,
    padding: 10,
  },
  item: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: WHITE,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  itemImage: {
    width: "100%",
    height: "70%",
  },
});

export default MainMeasurements;
