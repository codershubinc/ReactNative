import React from 'react'
import { Stack  } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="user_dashboard"
                options={
                    {
                        headerShown: false,
                        title: "User_dashboard",
                        headerTitleAlign: 'center',
                        statusBarStyle: "dark", 
                        statusBarTranslucent: true,
                    }}
            />
        </Stack>
    )
}

export default _layout