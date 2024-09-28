import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationHandler = () => {
    const [notification, setNotification] = useState<any>();

    // Function to handle notification reception
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log('Notification Received:', notification);
        });

        const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification Response:', response);
        });

        return () => {
            subscription.remove();
            responseSubscription.remove();
        };
    }, []);

    return (
        <View>
            <Text
            style={{
                color:'white'
            }}
            >Notification Data:</Text>
            <Text
            style={{
                color:'white'
            }}
            >{notification ? JSON.stringify(notification, null, 2) : 'No notifications received yet'}</Text>
        </View>
    );
};

export default NotificationHandler;
