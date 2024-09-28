import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={
                {
                    headerShown: false,
                    orientation: "landscape",
                    navigationBarHidden: true,
                    statusBarStyle: 'light',
                    statusBarTranslucent: false, 
                    statusBarColor: 'black',
                    statusBarHidden: true
                }
            } />
        </Stack>
    )

}

export default Layout