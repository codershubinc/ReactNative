import { Text, SafeAreaView } from 'react-native'
import React from 'react'

const Index = () => {
    return (
        <SafeAreaView style={{ marginTop: 25 }} className='bg-black h-screen '>
            <Text
                className='text-5xl font-bold text-red-600 text-center justify-center self-center items-center mx-auto mt-3 pt-2 px-5 border-solid border-2 border-white max-w-fit   rounded-3xl   bg-slate-800'
            >
                Index
            </Text>

        </SafeAreaView>
    )
}

export default Index