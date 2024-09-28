import { View, Text } from 'react-native'
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
            className={`flex flex-col w-min m-3 rounded-full `}
        >
            {/* <Button
                title={isLoading ? 'Loading...' : title}
                color={color}
                disabled={isLoading ? true : false}
                onPress={onClick}

            /> */}
            <Text
                onPress={onClick}
                className={`  text-white text-center w-max border-2 border-white border-solid px-3 py-2  rounded-xl transition-all duration-300`}
                style={{ backgroundColor: color ? color : '#212121' }}
            >
                {isLoading ? 'Loading.....' : title}
            </Text>
        </View>
    )
}

export default ButtonComp