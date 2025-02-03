import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
// constants
import { LIGHT_GRAY } from '@/constants/colors';

const MainScreen = () => {
  return (
    <SafeAreaView style={Styles.container}>
    <HvHeader name="jakub" />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 20,
  },
});


export default MainScreen;