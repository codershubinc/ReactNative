import React, { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import authService from '@/db/auth/appwrite.auth'

const _layout = () => {
    const [loaded] = useFonts({
        "myFont": require('@/assets/fonts/customFonts/cascadia-code/CascadiaCode.ttf'),
    })
    useEffect(() => {
        const FindCurrentUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser()
                console.log('currentUser', currentUser);
                console.log('we are here');

                if (!currentUser) {
                    router.push('/user')
                }
                router.push('profile')
            } catch (error: any) {
                console.log('error at 22', error)
                router.push('/user')

            }

        }

        FindCurrentUser()

    }, [])


    return (
        <SafeAreaProvider>
            <Stack

            >


                <Stack.Screen
                    name="index"
                    options={
                        {
                            headerShown: false,
                            title: "Home",
                            headerTitleAlign: 'center',
                            statusBarStyle: "dark",
                            statusBarHidden: true,
                            statusBarTranslucent: true,

                        }
                    }
                />
                <Stack.Screen
                    name="profile"
                    options={
                        {
                            headerShown: false,
                            title: "Home",
                            headerTitleAlign: 'center',
                            statusBarStyle: "dark",
                            statusBarHidden: true,
                            statusBarTranslucent: true,
                            orientation: "portrait",
                            
                        }
                    }
                />
                <Stack.Screen
                    name="user"
                    options={
                        {
                            headerShown: false,
                            title: "Home",
                            headerTitleAlign: 'center',
                            statusBarStyle: "dark",
                            statusBarHidden: true,
                            statusBarTranslucent: true,
                        }
                    }
                />
            </Stack >
        </SafeAreaProvider>
    )
}

export default _layout