import { View, Text, Button } from 'react-native'
import React from 'react'

const ButtonComp = ({
    onClick,
    title,
    color,
    isLoading
}: {
    onClick: () => void,
    title: string,
    color: string,
    isLoading: boolean
}
) => {

    return (
        <View
            className={`flex flex-col    w-min m-3 rounded-full `}
        >
            <Button
                title={isLoading ? 'Loading...' : title}
                color={color}
                disabled={isLoading ? true : false}
                onPress={onClick}

            />
        </View>
    )
}

export default ButtonComp