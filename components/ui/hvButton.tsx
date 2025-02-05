import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DARK_GREEN } from '@/constants/colors';
// components
import HvText from './hvText';
// import { TouchableRipple } from 'react-native-paper';


interface Props {
    text: string;
    width: number;
    onPress: () => void;
    style?: object; // optional
}


const HvButton = ({ text, width, onPress, style = {}}: Props) => {
  return (
    <View style={[{ width: width, borderRadius: 10 }, style]}>
      <TouchableOpacity
        style={Styles.button}
        onPress={onPress}
        activeOpacity={0.7}
        // rippleColor="rgba(0, 0, 0, .32)"
        // borderless={true}
      >
        <HvText size="l" color="white" weight="semibold">{ text }</HvText>
      </TouchableOpacity>
    </View>
  );
}


const Styles = StyleSheet.create({
    button: {
      // height: 56, // expected 48
      backgroundColor: DARK_GREEN,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
});

export default HvButton;