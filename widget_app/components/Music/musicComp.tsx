import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function M() {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isSoundLoaded, setIsSoundLoaded] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const tracks = [
        {
            uri: "https://aac.saavncdn.com/311/d60d7e9b00fb632d0518d4145e3f3eb1_320.mp4",
            title: "Track 1",
            artist: "Artist 1",
            album: "Album 1"
        },
        {
            uri: "https://aac.saavncdn.com/151/721480005dd141ab28912aa73691a96b_320.mp4",
            title: "Track 2",
            artist: "Artist 2",
            album: "Album 2"
        }
    ];

    // Load and play a sound
    async function loadAndPlaySound(trackIndex: number): Promise<void> {
        try {
            if (sound) {
                await sound.unloadAsync();
                setIsSoundLoaded(false);
            }

            console.log(`Loading Track ${trackIndex}`);
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: tracks[trackIndex].uri },
                { shouldPlay: true }
            );
            setSound(newSound);
            setIsSoundLoaded(true);

            // Set playback status update callback
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    console.log(`Playback status updated: ${status.positionMillis} / ${status.durationMillis}`);

                    setIsPlaying(status.isPlaying);
                    setCurrentPosition(status.positionMillis || 0);
                    setDuration(status.durationMillis || 0);
                } else if (status.error) {
                    console.log(`Playback error: ${status.error}`);
                    Alert.alert("Error", "Playback error occurred.");
                }
            });
        } catch (error) {
            console.error("Error loading sound:", error);
            Alert.alert("Error", "Could not load sound. Please check your connection or URL.");
        }
    }
    // tme updates 
    useEffect(() => {
        if (sound) {
            // Set playback status update callback for load and play/pause state changes
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    console.log(`Playback status: ${status.positionMillis} / ${status.durationMillis}`);
                    setIsPlaying(status.isPlaying);
                    setDuration(status.durationMillis || 0);
                } else if (status.error) {
                    console.log(`Playback error: ${status.error}`);
                    Alert.alert("Error", "Playback error occurred.");
                }
            });
        }

        // Set up a polling interval to fetch the current position every 1000ms
        const interval = setInterval(async () => {
            if (sound && isPlaying) {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    setCurrentPosition(status.positionMillis || 0);
                }
            }
        }, 1000);

        // Cleanup interval and status callback on unmount or when `sound` changes
        return () => {
            clearInterval(interval);
            sound?.setOnPlaybackStatusUpdate(null);
        };
    }, [sound, isPlaying]);

    // Toggle between play and pause
    async function togglePlayPause(): Promise<void> {
        if (sound) console.log('sound', sound);

        if (!sound) {
            await loadAndPlaySound(currentTrackIndex);
        } else if (isSoundLoaded) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        }
    }

    // Play the next track
    async function playNext(): Promise<void> {
        const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextTrackIndex);
        await loadAndPlaySound(nextTrackIndex);
    }

    // Play the previous track
    async function playPrevious(): Promise<void> {
        const prevTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(prevTrackIndex);
        await loadAndPlaySound(prevTrackIndex);
    }

    // Format time in mm:ss
    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Configure background audio mode and register hardware media button controls
    useEffect(() => {
        const enableAudioMode = async () => {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                allowsRecordingIOS: false,
                // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
            });
        };

        enableAudioMode();

        return () => {
            sound?.unloadAsync();
        };
    }, [sound, currentTrackIndex]);



    return (
        <View style={styles.container}>
            <Text>Track: {tracks[currentTrackIndex].title}</Text>
            <Text>Artist: {tracks[currentTrackIndex].artist}</Text>
            <Text>Album: {tracks[currentTrackIndex].album}</Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Track Duration: {formatTime(duration)}</Text>
                <Text style={{ fontSize: 18 }}>{formatTime(currentPosition)}</Text>
                <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayPause} />
            </View>
            <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayPause} />
            <Button title="Next" onPress={playNext} />
            <Button title="Previous" onPress={playPrevious} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
});
