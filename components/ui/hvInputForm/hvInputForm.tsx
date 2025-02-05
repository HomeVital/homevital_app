import { View, StyleSheet, TouchableOpacity } from 'react-native';
// components
import HvText from '../hvText';
// constants
import { DARK_GREEN } from '@/constants/colors';
import HvButton from '../hvButton';


interface Props {
    onPress: () => void;
}


const HvInputForm = ({ onPress }: Props) => {
  return (
    <View>
      <HvButton text='Vista' onPress={onPress} />
    </View>
  );
}


// const Styles = StyleSheet.create({

// });

export default HvInputForm;