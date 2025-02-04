import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import { useSession } from '@/authentication/ctx';
import HvButton from "@/components/ui/hvButton";
// constants
import { LIGHT_GREEN } from "@/constants/colors";
import { WIN_WIDTH } from "@/constants/window";


const SignIn = () => {
  const { signIn } = useSession();

  return (
    <SafeAreaView style={Styles.container}>
      <Image
        source={require('@/assets/svgs/logo.svg')}
        contentFit="contain"
        style={Styles.homeImage}
      />
      <HvButton 
        text="Innskráning" 
        width={WIN_WIDTH * 0.75}
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}
      />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1, // take up entire screen
    justifyContent: "space-around", // center vertically
    alignItems: "center", // center horizontally
    backgroundColor: LIGHT_GREEN,
  },
  homeImage: {
    height: "50%",
    width: "70%",
  },
});

export default SignIn;
