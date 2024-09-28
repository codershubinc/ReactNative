import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/inputs/input'
import ButtonComp from '@/components/button/button'
import authService from '@/db/auth/appwrite.auth'
import userConfig from '@/db/auth/userConfig.auth'
import sendUserVerificationLink from '@/db/auth/sendUserVerificationLink.auth'

const ToLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isLinkSend, setIsLinkSend] = useState(false)
    const login = async () => {
        console.log('email', email, 'password', password);
        console.log('logging in');
        setLoading(true)
        if (email === '' || password.length < 8) {
            setLoading(false)
            return setError('Please Enter valid Email or Password')

        }
        try {
            const findUserConfig = await userConfig.getUserConfigByQuery(email.toLowerCase())

            if (findUserConfig?.documents.length === 0) {
                setLoading(false)
                return setError('User Not Found')
            }

            console.log('findUserConfig', findUserConfig.documents[0]);
            console.log('findUserConfig isUserVerified', findUserConfig.documents[0]?.isUserVerified);
            const isUserVerified = findUserConfig.documents[0]?.isUserVerified

            if (isUserVerified) {
                setLoading(false)
                return setError('Your Email Is Already Verified Please Login')
            }

            console.log('user is not verified and can login and go to verify email');
            const login = await authService.login({ email, password })
            console.log('login', login);
            if (login) {
                const sendLink = await sendUserVerificationLink.sendUserVerificationLink()
                console.log('sendLink', sendLink);
                if (!sendLink) {
                    setLoading(false)
                    return setError('Error Sending Email')
                }
                const logOut = await authService.logout()
                console.log('logOut', logOut);
                setIsLinkSend(true)
            }
            setLoading(false)

        } catch (error: any) {
            console.log('login error', error);
            setLoading(false)
            setError(error.message)


        }
        setLoading(false)
    }
    if (isLinkSend) {
        return (

            <View
                className={`flex-1 justify-center items-center  h-full w-full bg-[#212121]`}
            >
                <Text>
                    Link Sent to your email
                </Text>
            </View>

        )
    }






    return (


        <View
            className={`flex-1 justify-center items-center  h-full w-full bg-[#212121]`}

        >
            <Text >
                {error && <Text className='text-red-500' >{error}</Text>}
            </Text>
            <View className='  w-[95vw] bg-black rounded-2xl  py-4 shadow-inner  shadow-[#FF6A3D]' >
                <Text
                    className='text-[#1f5b2e] text-xl font-extrabold text-center'
                >
                    To send verification link enter your email and password
                </Text>

                <Input
                    title='Email'
                    placeholder='Enter Email'
                    keyboardType='email-address'
                    style='m-2'
                    titleColor='#FF6A3D'
                    onValueChange={setEmail}
                />
                <Input
                    title='Create a Password'
                    placeholder='Create a Password'
                    keyboardType=' default'
                    style='m-2'
                    titleColor='#FF6A3D'
                    onValueChange={setPassword}
                />
                <View className='flex justify-center items-center min-w-full  mt-4'>
                    {/* <Button
                        onPress={signup}
                        title='Create Account'
                        color={'#FF6A3D'}
                    /> */}
                    <ButtonComp
                        title='Send Link'
                        color={'#FF6A3D'}
                        isLoading={loading}
                        onClick={login}
                    />



                </View>

            </View>

        </View>

    )
}

export default ToLogin      