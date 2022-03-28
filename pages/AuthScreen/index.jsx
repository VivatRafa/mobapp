import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BaseButton, { typesNames } from '../../components/BaseButton';
import BaseModal from '../../components/BaseModal';
import Logo from '../../icons/logo';
import { images } from '../../styles/global';
import Login from './components/Login';
import Registration from './components/Registration';


function AuthScreen({ navigation }) {
    const [isRegModalVisible, setIsRegModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    const toggleRegModal = () => setIsRegModalVisible(!isRegModalVisible);
    const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);

    return (
        <View style={styles.container}>

            <Logo style={styles.logo} />
            {/* <Text style={styles.title}>Бесплатные лотереи</Text> */}
            <View style={styles.buttonsContainer}>
                <BaseButton
                    title="Регистрация"
                    onPress={toggleRegModal}
                    style={{ width: '50%' }}
                />
                <BaseButton
                    title="Войти"
                    onPress={toggleLoginModal}
                    type={typesNames.transparent}
                    style={{ width: '50%' }}
                />
            </View>
            <BaseModal isVisible={isRegModalVisible} onClose={toggleRegModal}>
                <Registration navigation={navigation} />
            </BaseModal>
            <BaseModal isVisible={isLoginModalVisible} onClose={toggleLoginModal}>
                <Login navigation={navigation} />
            </BaseModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#292929',
      height: '100%',
      paddingTop: 64,
      paddingHorizontal: 16,
      display: 'flex',
      overflow: 'hidden',
    },
    logo: {
        width: 328,
        height: 220,
        marginBottom: 36,
        alignSelf: 'center',
    },
    title: {
        fontSize: 34,
        lineHeight: 45,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 24,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export default AuthScreen;
