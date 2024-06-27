import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ButtonComp from '../button/Button'
import authService from '@/db/appwrite/auth/user.auth'
import { router } from 'expo-router'

const LogOutBtn = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const logOutUser = async () => {
        setLoading(true)
        try {
            const result = await authService.logout()
            if (result) {
                setLoading(false)
                router.push('/auth/login')
            }

        } catch (error: any) {
            setLoading(false)
            setError(error.message)

        }

    }
    return (
        <View>
            <ButtonComp
                title={error || 'Log Out'}
                color='#212121'
                onClick={() => logOutUser()}
                isLoading={loading}

            />
        </View>
    )
}

export default LogOutBtn