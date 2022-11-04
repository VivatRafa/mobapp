import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import useSWR from 'swr';
import dayjs from 'dayjs';
import kyFetch from '../../api';
import BaseButton from '../../components/BaseButton';
import Card from './components/Card';
import Info from './components/Info';

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
            const createdAt = dayjs(result.createdAt).format('DD.MM.YYYY HH:mm')
            const closeBetsAt = dayjs(result.closeBetsAt).format('DD.MM.YYYY HH:mm')

            
            return { ...result, events, createdAt, closeBetsAt, timerCloseBetsAt: result.closeBetsAt }
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
            const { success, error } = resp || {};
            const errorMessage = error || 'Что-то пошло не так, попробуйте ещё раз чуть позже';
            const message = success ? 'Результаты сохранены' : errorMessage;
            setMessage(message);
            setTimeout(() => setMessage(''), 3000);
        } catch (e) {
            setMessage('Что-то пошло не так, попробуйте ещё раз чуть позже');
            setTimeout(() => setMessage(''), 3000);
        }
    }
    
    const { events, id, createdAt, closeBetsAt, timerCloseBetsAt, numberParticipants } = circulation || {};

    const isNotAllEventOutcomesChoosed = Object.keys(outcomes).length !== events?.length;
    const isCirculationsExist = events?.length;

    return (
        <View style={styles.container}>
            {isCirculationsExist ? (
                <ScrollView>
                    <Info
                        circulationId={id}
                        createdAt={createdAt}
                        closeBetsAt={closeBetsAt}
                        timerCloseBetsAt={timerCloseBetsAt}
                        numberParticipants={numberParticipants}
                    />
                    {/* <Text style={{ color: '#fff' }}>
                        {JSON.stringify(circulation, null, 2)}
                    </Text> */}
                    {/* <Text style={styles.title}>Тираж №{id}</Text> */}
                    {events?.map(({ command1, command2, dateTime, id, title }) => (
                        <View key={id} style={{ marginBottom: 24 }}>
                            <Card
                                onPress={outcome => setOutcomes({ ...outcomes, [id]: outcome })}
                                title={title}
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
            ) : (
                <Text style={styles.noCirculation}>Тиражей ещё не было</Text>
            )}
        </View>
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
    jackpot: {
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
    noCirculation: {
        color: '#fff',
        textAlign: 'center',
    },
});