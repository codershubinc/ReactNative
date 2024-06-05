import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="signUp"
                options={
                    {
                        headerShown: false, 
                    }}
            />
        </Stack>
    )
}

export default _layout