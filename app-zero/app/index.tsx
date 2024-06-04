import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
    return (
        <SafeAreaView className='flex-1 justify-center items-center bg-[#212121] '>
            <Text className=' text-4xl text-white'>_la fdgrgyout</Text>
            <Link href="/user" className='text-4xl text-blue-600'>Profile</Link>

        </SafeAreaView>
    )
}

export default index