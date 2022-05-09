import React, { useContext } from 'react';
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from 'react-native';
import kyFetch, { setAccessToken } from '../../../../api';
import BaseButton from '../../../../components/BaseButton';
import BaseInput from '../../../../components/BaseInput';
import AuthContext from '../../../../context/AuthProvider';

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors }, getValues, clearErrors, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async data => {
    clearErrors();

    try {
      const resp = await kyFetch.post('login', { json: data }).json()

      const { accessToken } = resp || {};
      console.log(resp);
      if (accessToken) {
        setAccessToken(accessToken);
        setIsLoggedIn(true);
      }
    } catch (e) {
      const error = await e?.response?.json();

      const { message } = error || {};
      setError('password', { type: 'serverError', message: message })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Авторизация</Text>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле"
          },
        }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            label="Эл. почта"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.form}
            icon="Mail"
            error={errors?.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле"
          },
        }}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            label="Пароль"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.form}
            icon="Password"
            error={errors?.password?.message}
            secureTextEntry
          />
        )}
      />
      <BaseButton
        title="Войти"
        // onPress={() => navigation.navigate('Circulation')}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#ACACAC',
    fontSize: 14,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
  },
})