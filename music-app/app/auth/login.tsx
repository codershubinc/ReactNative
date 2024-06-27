import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import InputComp from '@/components/lib/input/Input'
import ButtonComp from '@/components/lib/button/Button'
import createUserConfig from '@/db/appwrite/userConfig/create_user_config'
import authService from '@/db/appwrite/auth/user.auth'
import sendEmailVerificationLink from '@/db/appwrite/verification/send_email_verification_link'
import App from '@/components/lib/network/is_net_connected'

const LoginPage = () => {

    // getting value from input and store it to useState
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');


    // >===> getting user by email query from appwrite database
    const handleSubmit = async () => {
        setError('')
        try {
            setIsLoading(true)
            // >===> all field checkers
            // >===> password and email is entered or not
            if (!email || !password) {
                setError('Please fill all the fields')
                console.log('Please fill all the fields');

                setIsLoading(false)
                return
            }
            const findUser = await createUserConfig.getUserConfigByQuery(email)
            if (!findUser?.documents[0]) {
                console.log('no user found');
                setError('no user found , please create account')
                setIsLoading(false)
                return
            }

            if (findUser?.documents[0].isUserVerified === false) {
                console.log('user not verified');

                // >===> user not verified
                // >===> login user to send verification link
                const loginUserForSendingVerificationLink = await authService.login(
                    {
                        email,
                        password
                    }
                )

                if (loginUserForSendingVerificationLink) {
                    // >===> send email verification link
                    const sendVerifyLinkToEmail = await sendEmailVerificationLink.sendEmailVerificationLink()
                    console.log('sendVerifyLinkToEmail', sendVerifyLinkToEmail);

                    // >===> logout user after sending verification link
                    const logOutUserForEmailVerification = await authService.logout()
                    console.log('logOutUserForEmailVerification', logOutUserForEmailVerification);


                    setIsLoading(false)
                    setError('')
                    router.push('/auth/verificationEmailSentPage')
                    return


                }
                console.log(' user not verified')
                setError(' user not verified')
                setIsLoading(false)
                return
            }
            console.log('userFound you can log in now', findUser?.documents[0]);

            // >===> login user after all checkers are passed
            const loginUser = await authService.login({ email, password })
            console.log('user login successfully', loginUser);

            // >===> redirecting to user dashboard
            router.push('/')


            setIsLoading(false)
        } catch (error: any) {
            console.log('error', error);
            setError(error.message)
            setIsLoading(false)

        } finally {

            setIsLoading(false)

        }


    }





    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View
                        className='w-[96vw] text-white justify-center items-center rounded-2xl   border-solid border-gray-700 border-4 bg-slate-800 pb-4 '
                    >
                        <Text className='text-5xl text-white'>Login</Text>
                        <InputComp
                            title="Email"
                            placeholder="Email ..."
                            keyboardType={"email-address"}
                            style='m-1'
                            titleColor='white'
                            border={false}
                            onValueChange={(val: string) => { setEmail(val) }}
                        />

                        <InputComp
                            title="Enter  PassWord"
                            placeholder="PassWord ..."
                            keyboardType="visible-password"
                            style='m-1'
                            titleColor='white'
                            border={false}
                            onValueChange={(val: string) => { setPassword(val) }}
                        />
                        <Text className='text-red-500 text-xl'>{error}</Text>
                        <ButtonComp
                            onClick={() => handleSubmit()}
                            title="Login"
                            color=''
                            isLoading={isLoading}
                        />

                    </View>
      
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default LoginPage