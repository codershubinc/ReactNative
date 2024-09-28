import { NativeModules, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const { MusicInfo } = NativeModules;

const MusicControlCenterInfo = () => {
    const [trackInfo, setTrackInfo] = useState('');

    const fetchTrackInfo = async () => {
        try {
            const info = await MusicInfo.getCurrentPlayingTrack();
            setTrackInfo(info);
        } catch (error) {
            console.log('music info err' , MusicInfo);
            
            console.log("Error fetching track info:", error);
        }
    };
    useEffect(() => {

        fetchTrackInfo();
    }, []);

    return (
        <View>
            <Text
            style={{
                color:'white'
            }}
            >{trackInfo || "No music playing"}</Text>
        </View>
    );
};

export default MusicControlCenterInfo;
