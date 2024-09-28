import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface Props {
    style: string,
    title: string,
    placeholder: string,
    keyboardType: any,
    titleColor: string,
    onValueChange: any,
    border?: boolean

}
const InputComp: React.FC<Props> = (
    {
        style,
        title,
        placeholder,
        keyboardType,
        titleColor,
        onValueChange,
        border = true
    }
) => {
    return (
        <View className={`flex flex-col  bg-slate-950 rounded-xl p-2 justify-center items-center w-[90vw] m-3 ${style} ${border ? 'border-2 border-white border-solid ' : ''}`}>
            <Text
                className={` w-full text-xl `}
                style={{ color: titleColor || '#9e9e9e' }}
            >
                {title || `Title`}
            </Text>

            <TextInput
                className='w-full no-underline text-white border border-white border-solid h-12 rounded-full pl-3'
                placeholder={placeholder || 'Enter Here'}
                placeholderTextColor='#9e9e9e'
                keyboardType={keyboardType || 'default'}
                onChangeText={onValueChange}
                underlineColorAndroid={'transparent'}

            />

        </View>
    )
}

export default InputComp