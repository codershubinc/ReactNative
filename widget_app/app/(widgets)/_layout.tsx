import { View, Text } from 'react-native'
import React from 'react'
import App from './index'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={
                {
                    headerShown: false,
                    orientation: "landscape",
                    navigationBarHidden: true,
                    statusBarHidden: true
                }
            } />
        </Stack>
    )

}

export default Layout