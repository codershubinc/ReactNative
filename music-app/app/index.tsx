import { Text, SafeAreaView, View, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Link, router, useFocusEffect } from 'expo-router'
import authService from '@/db/appwrite/auth/user.auth'
import ButtonComp from '@/components/lib/button/Button'
import NetInfo from '@react-native-community/netinfo';
import App from '@/components/lib/network/is_net_connected'

const Index = () => {
    const [err, setErr] = React.useState(false)
    const [errMessage, setErrMessage] = React.useState('')
    const [isConnected, setIsConnected] = useState(true);



    const findCurrentUser = async () => {

        console.log('finding is net connected or not');

        const result = await App()
        if (!result) {
            console.log('net is not connected');

            setErr(true)
            setErrMessage('Please connect to internet')
            return
        }

        setErr(false)
        try {
            console.log('finding current user');
            
            const user = await authService.isUserLoggedIn()
            console.log('user', user);
            if (user) {
                console.log('user is logged in');
                
                router.push('/music/all_playlist_page')

            } else {
                router.push('/auth/login')
            }
        } catch (error: any) {
            console.log('index error', error);
            if (error === false) {
                router.push('/auth/login')
            }
            setTimeout(() => {
                setErr(true)
                setErrMessage(error.message)

            }, 2000)
        }

    }

    useFocusEffect(
        useCallback(() => {
            console.log('index page');
            findCurrentUser();
        }, [])
    );
    return (
        <SafeAreaView
            style={{ marginTop: 25 }}
            className='bg-black h-screen justify-center items-center text-center '
        >
            {err ?
                <>
                    <Text className='text-3xl text-red-600'>{errMessage} </Text>
                    <Text className='text-3xl text-red-600'>  please try again later</Text>
                    <ButtonComp
                        color=''
                        isLoading={false}
                        onClick={() => findCurrentUser()}
                        title='retry'
                    />
                </>
                :

                // <Text className='text-3xl text-red-600'> no err</Text>
                <Image
                    source={require('@/assets/images/loading.gif')}
                    style={{ width: 200, height: 200 }}
                />
            }

        </SafeAreaView>
    )
}

export default Index