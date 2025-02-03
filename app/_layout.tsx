import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'; // battery life and such
import { Slot } from "expo-router";
// components
import { SessionProvider } from '@/components/authentication/ctx';
// constants
import { LIGHT_GRAY } from '@/constants/colors';


const RootLayout = () => {
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
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
      <StatusBar style="dark" backgroundColor={LIGHT_GRAY} />
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </>
  );
}

export default RootLayout;
