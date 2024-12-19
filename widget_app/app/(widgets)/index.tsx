import React from 'react';
import { StyleSheet, View } from 'react-native';
import BatteryWidget from '@/components/cust/BatteryWidget';
import { useKeepAwake } from 'expo-keep-awake';
import TimeWidget from '@/components/cust/TimeWidget';
import M from '@/components/Music/musicComp';


export default function App() {

    useKeepAwake()


    return (
        <View style={styles.container}>
            <View
                style={styles.topWidget}
            >
                <BatteryWidget />
                <M />
                <TimeWidget />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        height: "100%",
        width: '100%',
        
    },
    topWidget: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    }
});
