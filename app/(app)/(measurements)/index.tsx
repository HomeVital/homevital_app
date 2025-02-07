import { StyleSheet, TouchableOpacity, View } from "react-native";
// components
import HvScrollView from "@/components/ui/HvScrollView";
// constants
import { STYLES } from "@/constants/styles";
import { WHITE } from "@/constants/colors";
import HvText from "@/components/ui/hvText";
import { Image } from "expo-image";

const MainMeasurements = () => {
  return (
    <HvScrollView>
      <View style={STYLES.defaultView}>
        <View style={Styles.container}>
          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="cover"
                style={Styles.itemImage}
              />
            </TouchableOpacity>
          </View>

          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="cover"
                style={Styles.itemImage}
              />
            </TouchableOpacity>
          </View>

          <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.item}>
              <Image
                source={require("@/assets/svgs/handLeft.svg")}
                contentFit="cover"
                style={Styles.itemImage}
              />
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
  },
  itemContainer: {
    width: "50%",
    padding: 10,
  },
  item: {
    borderRadius: 10,
    backgroundColor: WHITE,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
});

export default MainMeasurements;
