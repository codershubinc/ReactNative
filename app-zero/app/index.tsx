import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import authService from '@/db/auth/appwrite.auth'

const index = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const FindCurrentUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser()
                console.log('we are here');

                if (!currentUser) {
                    setLoading(false)
                    router.push('/user/login')
                }
            } catch (error: any) {
                console.log('error ', error)
                setLoading(false)
                router.push('/user')
            }
        }

        FindCurrentUser()
    }, [])

    if (loading) {
        return (
            <View className='flex-1 justify-center  items-center bg-[#000000] h-full w-full'>
                <Text className='text-white'>Loading...</Text>
            </View>
        )
    }


    return (
        <SafeAreaView className='flex-1 justify-center items-center bg-[#212121] '>
            <Text className=' text-4xl text-white'>_la fdgrgyout</Text>
            <Link href="/user" className='text-4xl text-blue-600'>Profile</Link>

        </SafeAreaView>
    )
}

export default index