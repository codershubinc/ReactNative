import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import allMusicPlaylist from '@/db/appwrite/music/getMusicPlayList'
import { Link } from 'expo-router'
import LogOutBtn from '@/components/lib/logOutBtn/LogOutBtn'
import Sound from 'react-native-sound'

const All_playlist_page = () => {
    // >=====> get all playlists
    const [allPlaylists, setAllPlaylists] = useState<any>([])

    // ========================================================
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const AllPlaylists = async () => {
            const res = (await allMusicPlaylist.getMusicPlayList()).documents

            setAllPlaylists(res);
            setLoading(false)
        }
        AllPlaylists()


    }, [])

    console.log('allPlaylists', allPlaylists);

    if (loading || error) {

        return (
            <View
                className='w-full h-full bg-black justify-center items-center text-center text-white'
            >
                <Text
                    className='text-3xl text-white'
                >
                    {error || " Loading..."}
                </Text>

            </View>
        )

    }

  

    return (
        <SafeAreaView className='bg-black text-white mt-6'>
            <ScrollView>
                {
                    allPlaylists.map((playlistId: any) => {
                        return (
                            <View
                                className='w-full h-max my-2 p-1 rounded-2xl flex flex-row justify-between items-center text-center border-2 border-white border-solid   text-white bg-slate-950 '
                                key={playlistId.$id}
                            >
                                <Image
                                    source={{
                                        uri:
                                            playlistId.musicPlayListAvatarUrl ?
                                                String(playlistId.musicPlayListAvatarUrl) :
                                                `https://cloud.appwrite.io/v1/storage/buckets/664cd55b001b38501973/files/${playlistId.musicPlayListAvatar}/preview?width=500&height=500&project=664cd46e0022294a4c81`
                                    }}
                                    style={{ width: 64, height: 64, backgroundColor: 'transparent' }}
                                    className='rounded-full '
                                />
                                <Text
                                    className='text-3xl text-white'
                                >
                                    {playlistId.name}
                                </Text>
                                <Text
                                    className='text-2xl text-slate-500 text-right'
                                >
                                    songs  {playlistId.musicContains.length}
                                </Text>


                            </View>
                        )
                    })
                }
                <Link href='/music/test' className='text-white' >test</Link>
                <LogOutBtn />
            </ScrollView>
        </SafeAreaView>
    )
}

export default All_playlist_page