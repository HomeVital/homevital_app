import { View, StyleSheet, ViewProps } from "react-native";
// constants
import { WHITE } from "@/constants/colors";
import HvButton from "../hvButton";

interface Props extends ViewProps {
  onPress: () => void;
}

const HvInputForm = ({ onPress, ...props }: Props) => {
  return (
    <View style={[Styles.container, props.style]}>
      {props.children}
      <HvButton text="Vista" onPress={onPress} />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    gap: 20,
    borderRadius: 10,
    backgroundColor: WHITE,
    maxWidth: 500,
  },
});

export default HvInputForm;
