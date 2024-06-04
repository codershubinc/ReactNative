import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from 'expo-router'

const _layout = () => {
    const navigate = useNavigation()
    const [login, setLogin] = useState(false)

    return (
        <View className='flex-1 justify-center items-center h-full w-full'>
            {login ? <Text>logged in </Text> : <Text>please Login</Text>}
            <Text className='text-red-500'>_layout</Text>
            <Link href={'/user'}>User</Link>
            <Button title='login' onPress={() => setLogin(true)} />
        </View>
    )
}

export default _layout