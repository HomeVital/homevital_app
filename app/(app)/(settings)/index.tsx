import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Switch } from "react-native-paper";
// components
import HvDivider from "@/components/ui/hvDivider";
import HvText from "@/components/ui/hvText";
// constants
import { BRIGHT_GREEN} from "@/constants/colors";
import { STYLES } from "@/constants/styles";

const MainSettings = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false); // TODO: change so that I don't have to use states

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView fadingEdgeLength={50}>
      <View style={STYLES.defaultView}>
        <HvDivider/>
        <HvText>Nafn</HvText>
        <HvText>Heimili: gata 123</HvText>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        {/* <Link href="/(app)/(measurements)/eitthvað"> */}
          <HvText>Tengiliðir</HvText>
        {/* </Link> */}
        <HvDivider/>
        {/* <Link href="/(app)/(measurements)/eitthvað"> */}
          <HvText>Tæki</HvText>
        {/* </Link> */}
        <HvDivider/>
        <View style={Styles.leftRightContainer}>
          <HvText>Tungumál</HvText>
          {/* tungumál takki með mynd */}
        </View>
        <View style={Styles.leftRightContainer}>
          <HvText>Áminningar</HvText>
          <Switch 
            value={isSwitchOn} 
            onValueChange={onToggleSwitch} 
            color={BRIGHT_GREEN}
          />
        </View>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
        <HvText>Sími: xxx-xxxx</HvText>
        <HvDivider/>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  leftRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
  
export default MainSettings;