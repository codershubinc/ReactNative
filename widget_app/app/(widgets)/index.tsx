import React from 'react';
import { StyleSheet, View } from 'react-native';
import BatteryWidget from '@/components/cust/BatteryWidget';
import { useKeepAwake } from 'expo-keep-awake';
import NotificationWidget from '@/components/cust/NotificationPermission';

export default function App() {

    useKeepAwake()


    return (
        <View style={styles.container}>
            <BatteryWidget />
            <NotificationWidget />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        justifyContent: 'space-between',
        height: 20,
        width: '100%',
    },
});
