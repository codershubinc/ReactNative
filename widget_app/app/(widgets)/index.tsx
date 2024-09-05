import React from 'react';
import { StyleSheet, View } from 'react-native';
import BatteryWidget from '@/components/cust/BatteryWidget';
import NetworkWidget from '@/components/cust/NetworkWidget';
import TimeWidget from '@/components/cust/TimeWidget';

export default function App() {


    return (
        <View style={styles.container}>
            <BatteryWidget />
            <NetworkWidget/>
            <TimeWidget/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        height: "100%",
        width: "100%",
        borderBlockColor: 'white',
    },
});
