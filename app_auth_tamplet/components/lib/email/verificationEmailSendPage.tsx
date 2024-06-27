import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const VerificationEmailSendPage = () => {
    return (
        <View className='flex flex-col justify-center items-center text-white'>
            <View
                className='flex flex-col justify-center items-center rounded-2xl text-white h-[50%]   w-[90%] border-2 border-white border-solid'
            >
                <View className='flex flex-row  justify-center items-center'>
                    <Image
                        source={require('@/assets/images/icons8_email.png')}
                        style={{ width: 64, height: 64, backgroundColor: 'transparent' }}
                    />
                    <Text className='text-2xl text-white'>

                        Email verification  link sent
                    </Text>
                </View>
                <View className='w-full  border-2 border-white border-solid '></View>
                <Text className='text-3xl text-red-400'>
                    After verification you can login
                </Text>
                <Link
                    href={'/auth/login'}
                    className='  text-blue-500 text-4xl'
                >Login</Link>
            </View>

        </View>
    )
}

 