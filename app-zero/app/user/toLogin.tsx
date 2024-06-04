import { View, Text } from 'react-native'
import React from 'react'
import Input from '@/components/inputs/input'

const ToLogin = () => {
    return (

        <View className='flex-1 justify-center items-center bg-[#212121] h-[80vh] w-full'>
            <Text
                className='text-3xl text-white absolute  top-[30px]  font-extrabold bg-black p-3 rounded-full  shadow-md shadow-white '
            >
                It Seems Your Not Logged In
            </Text>
            <View className='  w-[95vw] bg-black rounded-2xl  py-4' >
                <Text className='text-white text-3xl font-extrabold text-center'>Create a Account</Text>
                <Input
                    title='Your Name'
                    placeholder='Enter Your Name'
                    keyboardType='name-phone-pad'
                    style='m-2'
                />
                <Input
                    title='Email'
                    placeholder='Enter Email'
                    keyboardType='email-address'
                    style='m-2'
                />
                <Input
                    title='Create a Password'
                    placeholder='Create a Password'
                    keyboardType=' default'
                    style='m-2'
                />

            </View>
        </View>

    )
}

export default ToLogin