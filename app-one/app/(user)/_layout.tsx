import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

const _layout = () => {

    const [isSingUp, setIsSignUp] = useState(false)
    const testBtn = () => {
        setIsSignUp(!isSingUp)
    }

    return (
        <View className='flex-1 items-center justify-center bg-black'>
            <Text className='text-3xl text-white'>{isSingUp ? "SignUp" : "Login"}</Text>
            <View className='text-3xl text-white w-[200px] absolute  bottom-[10%] '>
                <Button title='test' color={'blue'} onPress={testBtn} />
            </View>
        </View>
    )
}

export default _layout