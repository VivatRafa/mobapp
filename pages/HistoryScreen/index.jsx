import dayjs from 'dayjs';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import useSWR from 'swr';
import kyFetch from '../../api';

function HistoryScreen({ navigation }) {

    const { data: circulations = [], error } = useSWR('circulations', async () => {
        const resp = await kyFetch.get('circulation/personal').json();
        const { success, result } = resp || {};

        if (success) {
            const preparedCirculations = result.map(circulation => ({
                ...circulation,
                createdAt: dayjs(circulation.createdAt).format('DD.MM.YYYY HH:mm'),
                endAt: circulation.endAt ? dayjs(circulation.endAt).format('DD.MM.YYYY HH:mm') : 'Ещё не закончился',
                guessed: circulation.userEventsResult.filter(result => result.guess).length,
                count: circulation.userEventsResult.length,
            }))
            return preparedCirculations
        }
        
        return {};
    })

    const isCirculationsExist = circulations?.length;

    return (
        <View style={styles.container}>
            {/* <Text style={{ color: '#fff' }}>{JSON.stringify(circulations,null, 2)}</Text>
            <Text style={{ color: '#fff' }}>{JSON.stringify(error,null, 2)}</Text> */}
            <ScrollView>
                {/* <Text style={styles.title}>История</Text> */}
                {isCirculationsExist ? 
                    circulations.map(({ id, createdAt, endAt, count, guessed }) => (
                        <TouchableOpacity
                            key={id}
                            onPress={() => navigation.navigate('CirculationHistory', { circulationId: id })} 
                            style={[styles.card, false ? styles.cardActive : '']}
                        >
                            <View style={styles.cardRow}>
                                <Text style={styles.cardRowLabel}>Номер:</Text>
                                <Text style={styles.cardRowValue}>{id}</Text>
                            </View>
                            <View style={styles.cardRow}>
                                <Text style={styles.cardRowLabel}>Тираж от:</Text>
                                <Text style={styles.cardRowValue}>{createdAt}</Text>
                            </View>
                            <View style={styles.cardRow}>
                                <Text style={styles.cardRowLabel}>Закончился:</Text>
                                <Text style={styles.cardRowValue}>{endAt}</Text>
                            </View>
                            <View style={styles.cardRow}>
                                <Text style={styles.cardRowLabel}>Угадано::</Text>
                                <Text style={styles.cardRowValue}>{guessed} из {count}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                    : <Text style={styles.noCirculationText}>Вы не участвовали ни в одном тираже</Text>
                }
            </ScrollView>
        </View>
    );
}

export default HistoryScreen;

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
        marginBottom: 24,
    },
    card: {
        borderRadius: 8,
        backgroundColor: '#2F2F2F',
        padding: 12,
        marginBottom: 8,
    },
    cardActive: {
        borderWidth: 2,
        borderColor: '#03DAC5',
        padding: 8,
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    cardRowLabel: {
        width: '30%',
        color: '#ACACAC',
    },
    cardRowValue: {
        color: '#fff',
    },
    noCirculationText: {
        color: '#fff',
        textAlign: 'center',
    }
});