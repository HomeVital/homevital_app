import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import { useSession } from '@/components/authentication/ctx';


const MainScreen = () => {
  return (
    <SafeAreaView >
      <Text
        style={{ fontFamily: 'OpenSans', fontSize: 20 }}
      >
        Main Screen
      </Text>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default MainScreen;