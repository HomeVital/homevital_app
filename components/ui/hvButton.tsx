import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DARK_GREEN, WHITE } from '@/constants/colors';


interface Props {
    text: string;
    width: number;
    onPress: () => void;
    style?: object; // optional
}


const HvButton = ({ text, width, onPress, style = {}}: Props) => {
  return (
    <View style={[{ width: width }, style]}>
      <TouchableOpacity 
        style={Styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={Styles.text}>{ text }</Text>
      </TouchableOpacity>
    </View>
  );
}


const Styles = StyleSheet.create({
    button: {
      height: 60, // expected 48
      backgroundColor: DARK_GREEN,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: WHITE,
      fontSize: 20, // expected 17,
      fontFamily: "OpenSans",
    }
});

export default HvButton;