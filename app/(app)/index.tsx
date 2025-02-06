import { SafeAreaView } from "react-native-safe-area-context";
// components
import HvHeader from "@/components/homeScreen/hvHeader";

const MainScreen = () => {
  return (
    <SafeAreaView>
      <HvHeader name="jakub" />
    </SafeAreaView>
  );
};

export default MainScreen;
