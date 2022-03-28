import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import useSWR from 'swr';
import dayjs from 'dayjs';
import kyFetch from '../../api';
import BaseButton from '../../components/BaseButton';
import Card from './components/Card';

function CirculationScreen() {
    const [outcomes, setOutcomes] = useState({});
    const [message, setMessage] = useState('');
    const { data: circulation, error } = useSWR('current-circulation', async () => {
        const resp = await kyFetch.get('circulation/current').json();
        const { success, result } = resp || {};

        if (success) {
            const events = result.events.map(event => ({
                ...event,
                dateTime: dayjs(event.dateTime).format('DD.MM.YYYY HH:mm')
            }))

            return { ...result, events }
        }
        
        return {};
    })

    const saveResult = async () => {
        const data = {
            circulationId: circulation.id,
            outcomes,
        }

        try {
            const resp = await kyFetch.post('circulation/save', { json: data }).json();
            const { success } = resp || {};
            const message = success ? 'Результаты сохранены' : 'Что-то пошло не так, попробуйте ещё раз чуть позже';
            setMessage(message);
            setTimeout(() => setMessage(''), 3000);
        } catch (e) {
            setMessage('Что-то пошло не так, попробуйте ещё раз чуть позже');
            setTimeout(() => setMessage(''), 3000);
        }
    }
    
    const { events } = circulation || {};

    const isNotAllEventOutcomesChoosed = Object.keys(outcomes).length !== events?.length;

    return (
        // <View style={{ height: '100%', display: 'flex' }}>
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Тираж №1</Text>
                <Text style={styles.title}>Джекпот: 10 000Р</Text>
                {events?.map(({ command1, command2, dateTime, id }) => (
                    <View key={id} style={{ marginBottom: 24 }}>
                        <Card
                            onPress={outcome => setOutcomes({ ...outcomes, [id]: outcome })}
                            command1={command1}
                            command2={command2}
                            dateTime={dateTime}
                        />
                    </View>
                ))}
                <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center', marginBottom: 15 }}>{message}</Text>
                <BaseButton
                    title="Сохранить"
                    onPress={saveResult}
                    disabled={isNotAllEventOutcomesChoosed}
                />
            </ScrollView>
        </View>
        // </View>
    );
}

export default CirculationScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#212121',
      height: '100%',
      paddingTop: 24,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    rewardText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
    },
});