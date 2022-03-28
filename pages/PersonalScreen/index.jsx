import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import kyFetch from '../../api';
import useSWR from 'swr';
import BaseButton, { typesNames } from '../../components/BaseButton';
import { images } from '../../styles/global';
import AuthContext from '../../context/AuthProvider';

function PersonalScreen() {
    const { logout } = useContext(AuthContext);

    const { data: userInfo, error } = useSWR('userInfo', async () => {
        const resp = await kyFetch.get('users/personal').json();
        const { success, result } = resp || {};

        return success ? result : {};
    })

    const { email = '', balance = 0, phone = 'Не указано' } = userInfo || {};
    return (
        <View style={styles.container}>
            <View style={styles.userBlock}>
                <Image source={images.avatar} />
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.infoRows}>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Баланс</Text>
                    <Text style={styles.rowValue}>{balance}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Эл. почта</Text>
                    <Text style={styles.rowValue}>{email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Номер телефона</Text>
                    <Text style={styles.rowValue}>{phone}</Text>
                </View>
            </View>
            <BaseButton
                title="Выйти"
                onPress={logout}
                type={typesNames.transparent}
            />
        </View>
    );
}

export default PersonalScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#212121',
      height: '100%',
      paddingTop: 24,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    userBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    email: {
        color: '#acacac',
        marginLeft: 24,
    },
    infoRows: {
       marginBottom: 48, 
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomColor: '#2f2f2f',
        borderBottomWidth: 1,
    },
    rowLabel: {
        color: '#fff',
    },
    rowValue: {
        color: '#acacac',
    }
});