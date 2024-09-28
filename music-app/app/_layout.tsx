import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Signup from './auth/signup';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme} >
      <Stack>

        <Stack.Screen
          name= "index"
          options={
            {
              headerShown: false,
              title: "Home",
              headerTitleAlign: 'center',
              statusBarStyle: "dark", 
              statusBarTranslucent: true,
              statusBarColor: "black",
              

            }
          }
        />
        



        <Stack.Screen
          name="auth"
          options={
            {
              headerShown: false,
              title: "Auth",
              headerTitleAlign: 'center',
              statusBarStyle: "dark",
              statusBarHidden: true,
              statusBarTranslucent: true,
              statusBarColor: "black"

            }
          }
        />

        <Stack.Screen
          name="user"
          options={
            {
              headerShown: false,
              title: "Auth",
              headerTitleAlign: 'center',
              statusBarStyle: "dark",
              statusBarHidden: true,
              statusBarTranslucent: true,
              statusBarColor: "black"

            }
          }
        />
        <Stack.Screen
          name="music"
          options={
            {
              headerShown: false,
              title: "music",
              headerTitleAlign: 'center',
              statusBarStyle: "dark",
              statusBarHidden: true,
              statusBarTranslucent: true,
              statusBarColor: "black"

            }
          }
        />

        
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
