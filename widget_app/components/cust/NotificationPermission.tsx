import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationWidget = () => {
    // Function to request notification permissions
    async function requestNotificationPermission() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // If permission is not granted, ask for it
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // Alert the user about the permission status
        if (finalStatus !== 'granted') {
            Alert.alert('Permission not granted', 'You will not receive notifications.');
            return false;
        }

        return true;
    }

    useEffect(() => {
        // Ask for notification permission when the component mounts
        requestNotificationPermission();
    }, []);

    return  <></>
}



export default NotificationWidget;
