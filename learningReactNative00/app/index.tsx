import { View, Text } from 'react-native'
import React from 'react'
import {
    Button,
    ButtonText,
} from '@/components/ui/button';
import { router} from 'expo-router';

const index = () => {


    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 34
                }}
            >l</Text>

            {/* visit fetch screen ./fetchUser */}

            <Button
                size="md"
                variant="outline"
                action="primary"
                onPress={() => {
                    router.push('./fetchUser')
                }}
            >
                <ButtonText>Visit fetch screen</ButtonText>
            </Button>


        </View>
    )
}

export default index
