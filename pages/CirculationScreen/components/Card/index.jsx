import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BaseButton from '../../../../components/BaseButton';
import { Outcomes } from '../../../../config';

const buttonsDefaultValue = {
    c1: {
        label: 'П1',
        value: Outcomes.command1,
    },
    x: {
        label: 'x',
        value: Outcomes.draw,
    },
    c2: {
        label: 'П2',
        value:Outcomes.command2,
    },
};

const Card = ({ onPress, command1, command2, dateTime }) => {
    const [buttons, setButtons] = useState(buttonsDefaultValue)
    const [currentActiveButton, setCurrentActiveButton] = useState(null);
    const onPressLocal = (outcome) => {

        onPress(outcome);
        setCurrentActiveButton(outcome);
    }

    return (
        <View style={styles.card}>
            <Text style={styles.dateTime}>{dateTime}</Text>
            <Text style={styles.commands}>{command1} — {command2}</Text>
            <View style={styles.buttons}>
                {Object.keys(buttons).map(outcome => {
                    const { label, value } = buttons[outcome];
                    const isActive = value === currentActiveButton;
                    return (
                        <BaseButton
                            key={label}
                            title={label}
                            onPress={() => onPressLocal(value)}
                            type={isActive ? 'default' : 'bordered'}
                            style={{ width: '25%', padding: 8 }}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        padding: 12,
        backgroundColor: '#2F2F2F',
        borderRadius: 8,
    },
    dateTime: {
        fontSize: 14,
        color: '#acacac',
        marginBottom: 6,
        textAlign: 'center',
    },
    commands: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})