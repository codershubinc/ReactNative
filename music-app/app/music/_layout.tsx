import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="all_playlist_page"
                options={
                    {
                        headerShown: false,
                        title: "all_playlist_page",
                        headerTitleAlign: 'center',
                        statusBarStyle: "dark",
                        statusBarTranslucent: true,
                    }}
            />
        
        </Stack>
    )
}

export default _layout