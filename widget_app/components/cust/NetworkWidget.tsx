import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Network from 'expo-network';

const NetworkWidget = () => {
    const [networkSpeed, setNetworkSpeed] = useState<string>('Unknown');

    // Function to get network speed (type and effective speed)
    async function updateNetworkSpeed() {
        const networkState = await Network.getNetworkStateAsync();
        const speed = networkState.type;
        setNetworkSpeed(speed || 'Unknown');
    }
    useEffect(() => {
        // Update battery level, time, and network speed every 1 second
        updateNetworkSpeed();

        const interval = setInterval(() => {
            updateNetworkSpeed();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <Text
            style={{
                fontSize: 30,
                color: 'white',
                position: 'absolute',
                top: 0,
            }}
            >
                {networkSpeed}
            </Text>
        </View>
    )
}

export default NetworkWidget