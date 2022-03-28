import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from 'react-native';
import BaseButton from '../../../../../../components/BaseButton';
import BaseInput from '../../../../../../components/BaseInput';

const ConfirmCode = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    }
  });

  const onSubmit = data => {
    
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
        name="code"
        render={({ field: { onChange, onBlur, value } }) => (
          <BaseInput
            label="Введите проверочный код"
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
        title="Зарегистрироваться"
        onPress={() => navigation.navigate('Circulation')}
        // onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export default ConfirmCode

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
})