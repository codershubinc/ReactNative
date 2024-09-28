import { NativeModules } from 'react-native';

const { MusicInfo } = NativeModules;

async function getMusicInfo() {
    try {
        const trackInfo = await MusicInfo.getCurrentPlayingTrack();
        console.log("Currently playing:", trackInfo);
    } catch (error) {
        console.log('music info err' , MusicInfo);
        
        console.log("Error fetching track info:", error);
    }
}

export default getMusicInfo