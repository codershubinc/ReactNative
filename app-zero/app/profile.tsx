import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import authService from '@/db/auth/appwrite.auth'
import { router } from 'expo-router'
import { Image } from 'react-native'

const Profile = () => {
    const [currentUser, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const FindCurrentUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser()
                console.log('currentUser', currentUser);
                console.log('we are here');

                if (!currentUser) {
                    router.push('/user')
                }

                setLoading(false)
                setCurrentUser(currentUser)
            } catch (error: any) {
                console.log('error ', error)
                router.push('/user')
                setLoading(false)

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
        <View className='flex-1 justify-center  items-center bg-[#000000] h-full w-full'>
            <View
                className='flex-1 justify-center  items-center bg-[#000000] h-max w-max'
            >
                <Text className='text-white'>UserName = {currentUser?.name}</Text>
                <Text className='text-white'>Email = {currentUser?.email}</Text>
                <Image
                    source={{ uri: String(authService.getUserInitials(currentUser?.name)) }}
                    style={{ width: 100, height: 100 }}
                    className='m-3'
                />
            </View>
        </View>
    )
}

export default Profile