import { View, Text, Image, SafeAreaView, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import authService from '@/db/appwrite/auth/user.auth';
import createUserConfig from '@/db/appwrite/userConfig/create_user_config';
import { router } from 'expo-router';
import ButtonComp from '@/components/lib/button/Button';
import backHandlerComp from '@/components/lib/handler/back_handler'

const User_dashboard = () => {
    const [user, setUser] = useState<any>();
    const [userConfig, setUserConfig] = useState<any>();
    const [userAvatarUri, setUserAvatarUri] = useState('');
    const [loading, setLoading] = useState(false);

    // >=====> get current user function 
    const getUser = async () => {
        setLoading(true);
        try {
            // >===> getting current user from appwrite
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);

            // >===> getting user config from appwrite
            const config = await createUserConfig.getUserConfig(currentUser.$id);
            setUserConfig(config);
            setLoading(false);
        } catch (error) {
            console.log('error', error);
            setLoading(false);
        }
    }
    // >=====> calling function that sets user and userConfig
    useEffect(() => {
        getUser();
    }, []);

    // >===> setting user avatar image from db on updating user and userConfig
    useEffect(() => {
        if (user && userConfig) {
            const avatarUri = userConfig.userAvatar
                ? `https://cloud.appwrite.io/v1/storage/buckets/66462360000d96376aa1/files/${userConfig.userAvatar}/preview?width=300&height=300&project=662ab42b7d237361fa26`
                : `https://cloud.appwrite.io/v1/avatars/initials?name=${user.name.replaceAll(' ', '++')}&width=200&height=200&project=console`;

            setUserAvatarUri(avatarUri);
        }
    }, [user, userConfig]);

    // >=====> logout user by user
    const logoutUser = async () => {
        await authService.logout();
        console.log('logged out');
        router.push('/');

    };

    // >====> on not user and userConfig set loading
    if (!user || !userConfig || loading) {
        return (
            <SafeAreaView
                style={{ marginTop: 25 }}
                className='bg-black h-screen justify-center items-center text-center '
            >
                <Image
                    source={require('@/assets/images/loading.gif')}
                    style={{ width: 200, height: 200 }}
                />
            </SafeAreaView>
        );
    }

    // >====> customizing on back btn pressed
    BackHandler.addEventListener(
        "hardwareBackPress",
        backHandlerComp,

    )

    return (
        <View className='flex flex-col   items-start h-screen pl-4 mt-10 w-full text-white'>

            <ButtonComp
                color='#22C55E'
                isLoading={false}
                onClick={() => getUser()}
                title='refresh'
            />

            {
                userAvatarUri
                    ?
                    (
                        <Image
                            source={{ uri: userAvatarUri }}
                            style={{ width: 300, height: 300 }}
                            className='mx-auto rounded-2xl'
                            onError={() => console.log('Error loading image')}
                        />
                    )
                    :
                    (
                        <Text className='text-white'>Loading Avatar...</Text>
                    )
            }

            <Text className='text-white text-3xl'>
                Welcome:
                {user.name || 'Loading ........'}
            </Text>
            <Text className='text-white text-3xl'>
                Email:
                <Text className='text-white text-2xl'>
                    {userConfig.userEmail || 'Loading ........'}
                </Text>
            </Text>

            <ButtonComp
                color='#EF4444'
                isLoading={false}
                onClick={() => logoutUser()}
                title='log out'
            />
        </View>
    );
};

export default User_dashboard;
