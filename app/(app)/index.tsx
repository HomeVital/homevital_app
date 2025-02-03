// components
import HvHeader from '@/components/homeScreen/hvHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = () => {
  return (
    <SafeAreaView>
      <HvHeader name="jakub" />
    </SafeAreaView>
  );
}

export default MainScreen;