import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import fetchUser from './fetchUser.util';

const Index = () => {
    const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserFunc = async () => {
        try {
            setLoading(true);
            setError(null); // Clear any previous errors
            const userData = await fetchUser();
            setUser(userData?.data?.user);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserFunc();
    }, []);

    return (
        <View className="h-screen w-full justify-center items-center">
            {error && (
                <Text className="text-red-500 text-center mt-4">
                    {error}
                </Text>
            )}
            {user && (
                <>
                    <Image
                        className="w-48 h-48 rounded-3xl bg-white mb-9 "
                        source={{ uri: (user.avatar).replace('svg', 'png') }}
                    />
                    <Text
                        className="text-4xl text-slate-800 text-left"
                    >
                        { 'name :' +  user.name}
                    </Text>
                    <Text
                        className="text-4xl text-slate-800 text-left"
                    >
                        { 'email :' + user.email}
                    </Text>
                </>
            )}
            <Text
                className="text-4xl text-slate-800 absolute bottom-0 border border-slate-900 rounded-3xl p-2"
                onPress={fetchUserFunc}
            >
                {loading ? loading && <ActivityIndicator size="large" color="#57586f" /> : 'Fetch New User'}
            </Text>
        </View>
    );
};

export default Index;
