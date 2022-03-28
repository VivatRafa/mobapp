import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import CheckBox from '@react-native-community/checkbox';
import BaseButton from '../../../../../../components/BaseButton'
import BaseInput from '../../../../../../components/BaseInput'
import kyFetch, { setAccessToken } from '../../../../../../api';
import AuthContext from '../../../../../../context/AuthProvider';

const RegistrationForm = ({ onNextStep }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors }, getValues, setError, clearErrors } = useForm({
    defaultValues: {
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
      isAdult: false,
    }
  });

  const onSubmit = async data => {
    clearErrors();
    const { email, phone, password } = data;

    const regData = { email, phone, password };
    try {
      const resp = await kyFetch.post('registration', { json: regData }).json()

      const { accessToken } = resp;
      if (accessToken) {
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        // onNextStep();
      }
    } catch (e) {
      const error = await e?.response?.json();
      const { message } = error;
      setError('repeatPassword', { type: 'serverError', message: message })
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Регистрация</Text> */}
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле"
          },
        }}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            label="Номер телефона"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.form}
            icon="Phone"
            error={errors?.phone?.message}
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
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле"
          },
          validate: value =>
            value === getValues('password') || "Пароли не совпадают"
        }}
        name="repeatPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            label="Повторите пароль"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.form}
            icon="Password"
            error={errors?.repeatPassword?.message}
            secureTextEntry
          />
        )}
      />        
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле",
          },
        }}
        name="isAdult"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 26 }}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={value}
                onValueChange={onChange}
                tintColors={{ false: '#ACACAC' }}
              />
              <Text style={styles.checkboxLabel}>Подтверждаю, что мне есть 18 лет</Text>
            </View>
            {errors?.isAdult?.message && <Text style={styles.errorText}>{errors?.isAdult?.message || ''}</Text>}
          </View>
        )}
      /> 
      <BaseButton
        title="Продолжить"
        // onPress={onNextStep}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export default RegistrationForm

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