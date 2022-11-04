import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import icons from '../../../../icons';

const { SportCup } = icons;

const Info = ({ circulationId, createdAt, closeBetsAt, timerCloseBetsAt, numberParticipants }) => {
	const [timer, setTimer] = useState(100);

	const getTime = deadline => {
		const time = Date.parse(deadline) - Date.now();

    const hoursValue = Math.floor((time / (1000 * 60 * 60)) % 24);
		const hours = hoursValue < 10 ? `0${hoursValue}` : hoursValue;
    const minutesValue = Math.floor((time / 1000 / 60) % 60);
		const minutes = minutesValue < 10 ? `0${minutesValue}` : minutesValue;
    const secondsValue = Math.floor((time / 1000) % 60);
		const seconds = secondsValue < 10 ? `0${secondsValue}` : secondsValue;

		return `${hours}:${minutes}:${seconds}`
	}

	const isTimerEnd = (Date.parse(timerCloseBetsAt) - Date.now()) < 0;
	
	useEffect(() => {
		const intervalId = setInterval(() => setTimer(getTime(timerCloseBetsAt)), 1000);
	
		return () => clearInterval(intervalId);
	}, [])
	

  return (
    <View style={styles.info}>
        <View style={styles.top}>
            {/* <SportCup /> */}
            <View style={styles.block}>
                <Text style={styles.title}>Джекпот</Text>
                <Text style={styles.value}>10 000р</Text>
            </View>
        </View>
        <View style={styles.bottom}>
            <View style={styles.row}>
                <View style={styles.block}>
                    <Text style={styles.title}>Тираж</Text>
                    <Text style={styles.value}>№ {circulationId}</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{...styles.title, ...styles.right}}>Прием голосов до</Text>
                    <Text style={{...styles.value, ...styles.right}}>{closeBetsAt}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.block}>
                    <Text style={styles.title}>Голоса от {createdAt}</Text>
                    <Text style={styles.value}>{numberParticipants + 1} голсоса(ов)</Text>
                </View>
                {!isTimerEnd && <View style={styles.block}>
                    <Text style={{...styles.title, ...styles.right}}>До конца тиража</Text>
                    <Text style={{...styles.value, ...styles.right}}>{timer}</Text>
                </View>}
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    info: {
        borderRadius: 8,
        overflow: 'hidden',
				marginBottom: 20,
    },
    top: {
        padding: 10,
        backgroundColor: '#2F2F2F',
        marginBottom: 3,
				
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottom: {
        padding: 10,
        backgroundColor: '#2F2F2F',
    },
    block: {
        // display: 'flex',
    },
    title: {
        color: '#acacac',
        fontSize: 16,
				marginBottom: 5,
    },
    value: {
        color: '#fff',
        fontSize: 18,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
		right: {
			textAlign: 'right',
		}
    // info: {},
})

export default Info