import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/inputs/input'
import ButtonComp from '@/components/button/button'
import authService from '@/db/auth/appwrite.auth'
import sendUserVerificationLink from '@/db/auth/sendUserVerificationLink.auth'
import userConfig from '@/db/auth/userConfig.auth'
import { Link, router } from 'expo-router'

const ToLogin = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isVerifyLinkSend, setIsVerifyLinkSend] = useState(false)
    const [error, setError] = useState('')

    const signup = async () => {
        console.log('username', username, 'email', email, 'password', password);
        console.log('creating account');


        setLoading(true)
        try {
            const user = await authService.createAccount({
                email: email,
                name: username,
                password: password,
            })
            console.log('user', user);
            const loginUser = await authService.login({
                email: email,
                password: password
            })
            console.log('loginUser', loginUser);

            if (user) {
                const userConfigCreate = await userConfig.createUserConfig(
                    {
                        username: username,
                        userId: user.$id,
                        userEmail: email,
                        isUserVerified: false
                    }
                )
                console.log('userConfigCreate', userConfigCreate);


                if (userConfigCreate) {
                    const verify = await sendUserVerificationLink.sendUserVerificationLink()
                    console.log('verify', verify);
                    setIsVerifyLinkSend(true)
                    const logoutUser = await authService.logout()
                    console.log('logoutUser', logoutUser);


                }
            }

            setLoading(false)
        } catch (error: any) {
            setLoading(false)

            console.log('error', error);
            setError(error.message)

        }
    }

    if (true) {
        setTimeout(() => {
            // router.push('/user/login')
        }, 5000);
        return (
            <>
                <View
                    className='  w-full h-full bg-black   flex justify-center items-center  py-4 shadow-inner  shadow-[#FF6A3D]'
                >
                    <Text
                        className='text-3xl text-white   font-extrabold bg-black p-3    shadow-md shadow-white fill-indigo-700   '
                    >
                        A Verification Link Is Sent To Your Email ,
                    </Text>
                    <Text
                        className='text-red-500 text-2xl font-extrabold bg-black p-3    shadow-md shadow-white fill-indigo-700   '

                    >Check your email and click on link to verify your account</Text>
                </View>
            </>
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
                    className='text-[#c18573] text-3xl font-extrabold text-center'
                >
                    Create a Account
                </Text>
                <Input
                    title='Your Name'
                    placeholder='Enter Your Name'
                    keyboardType='name-phone-pad'
                    style='m-2'
                    titleColor='#FF6A3D'
                    onValueChange={setUsername}


                />
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
                        title='Create Account'
                        color={'#FF6A3D'}
                        isLoading={loading}
                        onClick={signup}
                    />
                    <Link
                        href="/user/login"
                        className='text-sm text-blue-600'
                    >
                        already have account ? , Login
                    </Link>


                </View>

            </View>

        </View>

    )
}

export default ToLogin