import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'; // battery life and such
import { Slot } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import { SessionProvider } from '@/authentication/ctx';
// constants
import { LIGHT_THEME } from '@/constants/colors';


const RootLayout = () => {
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
    OpenSansSemibold: require('../assets/fonts/OpenSans-Semibold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  // Set up the auth context and render our layout inside of it.
  return (
    <>
      <StatusBar style="dark" backgroundColor={LIGHT_THEME} />
      <View style={Styles.container}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default RootLayout;
