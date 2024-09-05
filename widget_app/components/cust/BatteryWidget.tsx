import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getBatteryLevelAsync, getBatteryStateAsync, BatteryState, addBatteryStateListener } from 'expo-battery';

const BatteryWidget = () => {
    const [batteryLevel, setBatteryLevel] = useState<number>(0);
    const [isCharging, setIsCharging] = useState<boolean>(false);

    // Function to fetch battery level
    async function fetchBatteryLevel() {
        const level = await getBatteryLevelAsync();
        setBatteryLevel(level);
    }

    // Function to fetch battery charging state
    async function fetchBatteryState() {
        const state = await getBatteryStateAsync();
        setIsCharging(state === BatteryState.CHARGING);
    }

    useEffect(() => {
        // Fetch the initial battery level and charging state
        fetchBatteryLevel();
        fetchBatteryState();

        // Set up an interval to fetch the battery level every 1 second (1000 ms)
        const interval = setInterval(() => {
            fetchBatteryLevel();
        }, 1000);

        // Set up battery state listener to update charging state dynamically
        const subscription = addBatteryStateListener(({ batteryState }) => {
            setIsCharging(batteryState === BatteryState.CHARGING);
        });

        // Clean up the interval and subscription when the component is unmounted
        return () => {
            clearInterval(interval);
            subscription.remove();
        };
    }, []);

    return (
        <View
            style={{
                borderStyle: 'solid',
                borderColor: 'white',
                borderWidth: 1,
                padding: 5,
                marginLeft: 10,
                borderRadius: 5,
                width: 'auto',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    color: 'white',
                    position: 'absolute',
                    top: 0,
                }}
            >
                {isCharging ? '⚡' : '🔋'} {batteryLevel === 0 ? '⚡' : (batteryLevel * 100).toFixed(0)}%
                {' isCharging => ' + isCharging}
            </Text>z
        </View>
    );
};

export default BatteryWidget;
