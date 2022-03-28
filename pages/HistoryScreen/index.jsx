import dayjs from 'dayjs';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
                endAt: circulation.endAt ? dayjs(circulation.createdAt).format('DD.MM.YYYY HH:mm') : 'Ещё не закончился',
            }))
            return preparedCirculations
        }
        
        return {};
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>История</Text>
                {circulations.map(({ id, createdAt, endAt }) => (
                    <View key={id} style={[styles.card, false ? styles.cardActive : '']}>
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
                            <Text style={styles.cardRowValue}>0 из 7</Text>
                        </View>
                    </View>
                ))}
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
});