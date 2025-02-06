import { View, StyleSheet, ViewProps } from "react-native";
// constants
import { LIGHT_THEME } from "@/constants/colors";

const HvInputFormContainer = (props: ViewProps) => {
  return (
    <View style={[Styles.itemsContainer, props.style]}>{props.children}</View>
  );
};

const Styles = StyleSheet.create({
  itemsContainer: {
    padding: 20,
    gap: 30,
    borderRadius: 10,
    backgroundColor: LIGHT_THEME,
  },
});

export default HvInputFormContainer;
