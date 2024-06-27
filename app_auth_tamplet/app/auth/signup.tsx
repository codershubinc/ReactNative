import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';
import InputComp from '@/components/lib/input/Input';
import ButtonComp from '@/components/lib/button/Button';
import { checkIfUserExist } from '@/db/appwrite/verification/user_config_cheakes';
import authService from '@/db/appwrite/auth/user.auth';
import createUserConfig from '@/db/appwrite/userConfig/create_user_config';
import sendEmailVerificationLink from '@/db/appwrite/verification/send_email_verification_link';
import { Link } from 'expo-router';
import VerificationEmailSendPage from './verificationEmailSentPage';

const Signup = () => {
    // getting value from input and store it to useState
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isEmailVerifiedLinkSend, setIsEmailVerifiedLinkSend] = React.useState(false);

    const handleSubmit = async () => {
        setIsLoading(true)
        // >===> all field checkers
        if (!userName || !email || !password) {
            setError('Please fill all the fields');
            setIsLoading(false);
            return;
        }
        // >===> password checker
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            setIsLoading(false);
            return;
        }

        // >===> getting user by email query from appwrite database
        const isUserExist = await checkIfUserExist(email);
        if (isUserExist) {
            setError('User already exists , please login');
            setIsLoading(false);
            return;
        } else {
            const result = await authService.createAccount({ email, password, name: userName });
            console.log('user created', result);
            if (result) {
                const res = await authService.login({ email, password });
                if (res) {
                    const createNewUserConfig = await createUserConfig.createUserConfig({
                        userEmail: email,
                        isUserVerified: false,
                        userId: result.$id,
                        username: userName

                    })

                    const sendEmailVerificationLinkForUser = await sendEmailVerificationLink.sendEmailVerificationLink()

                    console.log('sendEmailVerificationLinkForUser', sendEmailVerificationLinkForUser);


                    if (createNewUserConfig) {
                        console.log('createNewUserConfig', createNewUserConfig);

                        const logOutUserForEmailVerification = await authService.logout()
                        console.log('logOutUserForEmailVerification', logOutUserForEmailVerification);

                        setError('user created successfully , to login please verify your email , check your email , link is sent to your email');

                        setIsLoading(false);
                        setIsEmailVerifiedLinkSend(true)


                    }

                }
            }
            setIsLoading(false);
        }





    }



    return (
        isEmailVerifiedLinkSend ?
            (<VerificationEmailSendPage />) :
            (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View
                                className='w-[96vw] text-white justify-center items-center rounded-2xl   border-solid border-gray-700 border-4 bg-slate-800 pb-4 shadow-md shadow-white'
                            >
                                <Text className='text-5xl text-white'>Signup</Text>
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
                                    title="Create  UserName"
                                    placeholder="UserName ..."
                                    keyboardType={"text"}
                                    style='m-1'
                                    titleColor='white'
                                    border={false}
                                    onValueChange={(val: string) => { setUserName(val) }}
                                />
                                <InputComp
                                    title="Create  PassWord"
                                    placeholder="PassWord ..."
                                    keyboardType={"password"}
                                    style='m-1'
                                    titleColor='white'
                                    border={false}
                                    onValueChange={(val: string) => { setPassword(val) }}
                                />
                                {/* <InputComp
                            title="Retype  PassWord"
                            placeholder="Retype PassWord ..."
                            keyboardType={"password"}
                            style='m-1'
                            titleColor='gray'
                            onValueChange={() => { }}
                        /> */}
                                <Text className='text-red-500'>{error}</Text>
                                <ButtonComp
                                    onClick={() => handleSubmit()}
                                    title="Submit"
                                    color=''
                                    isLoading={isLoading}
                                />



                                <Link href={'/auth/login'}>
                                    Login
                                </Link>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
    );
};

export default Signup;
