import { Pressable, Dimensions, Text, View } from "react-native";
import { Image } from 'expo-image';
import { StyleSheet } from "react-native";

import { DARK_GREEN, LIGHT_GREEN } from "@/constants/colors";


export default function IndexScreen() {
  return (
    <View
      style={allStyles.pageContainer}
    >
      <Image
        source={require('@/assets/svgs/homeVitalScalable.svg')}
        style={allStyles.image}
      />
       {/* LINK */}
      <Pressable style={allStyles.button}>
        <Text style={allStyles.text}>Innskráning</Text>
      </Pressable>
    </View>
  );
}

const allStyles = StyleSheet.create({
  pageContainer: {
    flex: 1, // take up entire screen
    justifyContent: "space-evenly", // center vertically
    alignItems: "center", // center horizontally
    // space between items


    backgroundColor: LIGHT_GREEN,
  },
  image: {
    width: Dimensions.get('window').width * 0.66,
    height: Dimensions.get('window').width * 0.66,
  },
  button: {
    backgroundColor: DARK_GREEN,
    padding: 10,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  }
});
