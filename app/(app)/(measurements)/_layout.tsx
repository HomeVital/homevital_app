
import { LIGHT_THEME } from '@/constants/colors';
import { Stack } from 'expo-router';

const MeasurementsLayout = () => {
  // This layout can be deferred because it's not the root layout.
  return (
    <Stack screenOptions={{ 
        headerShown: true,
        contentStyle: { backgroundColor: LIGHT_THEME },
        headerBackButtonDisplayMode: "default",
        headerStyle: {
            backgroundColor: LIGHT_THEME,
        },
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default MeasurementsLayout;
