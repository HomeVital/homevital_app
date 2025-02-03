
import { AppState, Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
// components
import { useSession } from '@/components/authentication/ctx';
import { TabRouter } from '@react-navigation/native';

const AppLayout = () => {
  const { session, isLoading, signOut } = useSession();

  // temporary sign out on app leave. TODO: CHANGE LATER
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string
    ) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log('App is in background, maybe inactive');
        signOut();
      }
    };
    // Listen for app state change, and deletes after state change to avoid duplicates
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default AppLayout;
