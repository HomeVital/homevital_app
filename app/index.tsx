import { View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import HvButton from "@/components/ui/hvButton";
// constants
import { LIGHT_GREEN } from "@/constants/colors";
import { WIN_WIDTH } from "@/constants/window";


// export default function IndexScreen() {
const LoginPage = () => {
  return (
    <SafeAreaView
      style={Styles.pageContainer}
    >
      <Image
        source={require('@/assets/svgs/homeVitalScalable.svg')}
        contentFit="contain"
        style={Styles.homeImage}
      />
      {/* LINK */}
      <HvButton 
        text="Innskráning" 
        onPress={() => console.log("innskráning pressed")}
        width={WIN_WIDTH * 0.75}
      />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  pageContainer: {
    flex: 1, // take up entire screen
    justifyContent: "space-around", // center vertically
    alignItems: "center", // center horizontally
    backgroundColor: LIGHT_GREEN,
  },
  homeImage: {
    height: "50%",
    width: "70%",
  },
});

export default LoginPage;
