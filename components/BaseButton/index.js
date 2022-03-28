import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export const typesNames = {
    default: 'default',
    transparent: 'transparent',
    bordered: 'bordered',
}

const types = {
    button: {
        [typesNames.default]: {
            backgroundColor: '#03DAC5',
            shadowColor: "#000",
            shadowOffset:{
                width: 0,
                height: 4,
            },
            shadowRadius: 4,
            shadowOpacity: 0.36,
            elevation: 5,
        },
        [typesNames.transparent]: {
            color: '#03DAC5',
            // borderColor: '#03DAC5',
            // borderWidth: 1,
        },
        [typesNames.bordered]: {
            borderColor: '#ACACAC',
            borderWidth: 1,
        }
    },
    text: {
        [typesNames.default]: {
            color: '#212121',
        },
        [typesNames.transparent]: {
            color: '#03DAC5',
        },
        [typesNames.bordered]: {
            color: '#ACACAC',
        }
    }
}

function BaseButton({ type = typesNames.default, onPress, title, style, disabled }) {
    const disabledStyles = disabled ? styles.disabled : '';
    return (
        <TouchableOpacity
            style={[styles.button, types.button[type], style, disabledStyles]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, types.text[type]]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 100,
        textTransform: 'uppercase',
        width: '100%',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    disabled: {
        backgroundColor: '#808080',
    }
});


export default BaseButton;