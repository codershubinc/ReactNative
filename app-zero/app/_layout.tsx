import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack >

            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "Home", headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name="profile"
                options={{ headerShown: false, title: "profile", headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name="user"
                options={{ headerShown: false, title: "Home", headerTitleAlign: 'center' }}
            />
        </Stack >
    )
}

export default _layout