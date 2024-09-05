import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const TimeWidget = () => {

    const [currentTime, setCurrentTime] = useState<string>('');

    // Function to get current time in hh:mm:ss format
    function updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString(); // Format: hh:mm:ss
        setCurrentTime(timeString);
    }

    useEffect(() => {
        // Update battery level, time, and network speed every 1 second
        updateCurrentTime();

        const interval = setInterval(() => {
            updateCurrentTime();
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
                    top: 30
                }}
            >
                {currentTime}
            </Text>
        </View>
    )
}

export default TimeWidget