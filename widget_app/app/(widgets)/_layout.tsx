import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={
                {
                    headerShown: false, 
                    orientation: 'all',
                    navigationBarHidden: true,
                    statusBarStyle: 'dark',
                    statusBarTranslucent: true, 
                    statusBarColor: 'black',
                    statusBarHidden: true,

                    
                }
            } />
        </Stack>
    )

}

export default Layout