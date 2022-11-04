import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import useSWR from 'swr';
import dayjs from 'dayjs';
import kyFetch from '../../api';
import BaseButton from '../../components/BaseButton';
import Card from '../CirculationScreen/components/Card';

function CirculationItemHistoryScreen({ route }) {
    const { circulationId } = route.params;
    // console.log(circulationId);
    const [outcomes, setOutcomes] = useState({});
    const [message, setMessage] = useState('');
    const { data: circulation = {}, error } = useSWR(`circulation/${circulationId}`, async () => {
        const resp = await kyFetch.get(`circulation/${circulationId}`).json();
        const { success, result } = resp || {};

        if (success) {
            const events = result.events.map((event, index) => ({
                ...event,
                dateTime: dayjs(event.dateTime).format('DD.MM.YYYY HH:mm'),
                outcome: result.userEventsResult[index].outcome,
            }))

            return { ...result, events }
        }
        
        return {};
    })
    
    const { events, id } = circulation || {};

    const isNotAllEventOutcomesChoosed = Object.keys(outcomes).length !== events?.length;
    const isCirculationsExist = events?.length;
    return (
        <View style={styles.container}>
            {/* <Text style={{ color: '#fff' }}>
                {JSON.stringify(circulation, null, '  ')}
            </Text> */}
            {isCirculationsExist ? (
                <ScrollView>
                    <Text style={styles.title}>Тираж №{id}</Text>
                    {events?.map(({ command1, command2, dateTime, id, outcome }) => (
                        <View key={id} style={{ marginBottom: 24 }}>
                            <Card
                                disabled
                                value={outcome}
                                command1={command1}
                                command2={command2}
                                dateTime={dateTime}
                            />
                        </View>
                    ))}
                    <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center', marginBottom: 15 }}>{message}</Text>
                </ScrollView>
            ) : (
                <Text style={styles.noCirculation}>Тиражей ещё не было</Text>
            )}
        </View>
    );
}

export default CirculationItemHistoryScreen;

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