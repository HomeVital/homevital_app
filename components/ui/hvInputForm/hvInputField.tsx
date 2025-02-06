import { View, StyleSheet, TextInput } from "react-native";
// components
import HvText from "@/components/ui/hvText";
// constants
import { DARK_GREEN, WHITE } from "@/constants/colors";

interface Props {
  itemState: string;
  setItemState: (value: string) => void;
  header?: string;
  description: string;
  metric: string;
}

const HvInputField = ({
  itemState,
  setItemState,
  description,
  metric,
  header = "",
}: Props) => {
  return (
    <View style={Styles.itemContainer}>
      <HvText weight="light" size="xl">
        {header}
      </HvText>
      <View style={Styles.inputContainer}>
        <View style={Styles.descriptionContainer}>
          <HvText weight="semibold" size="xxl">
            {description}
          </HvText>
          <HvText size="xs">{metric}</HvText>
        </View>
        <View style={Styles.inputShadow}>
          <TextInput
            value={itemState}
            keyboardType="numeric"
            maxLength={3}
            // placeholder='ex. 120'
            selectTextOnFocus={true}
            textAlign="right"
            // enterKeyHint='next'
            onChangeText={(text) => setItemState(text)}
            style={Styles.textInput}
          />
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  itemContainer: {
    gap: 4,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionContainer: {
    justifyContent: "center",
  },
  inputShadow: {
    width: 120,
    height: 60,
    marginRight: 20,
    borderRadius: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  textInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: WHITE,
    fontSize: 24,
    fontFamily: "OpenSansSemiBold",
    color: DARK_GREEN,
  },
});

export default HvInputField;
