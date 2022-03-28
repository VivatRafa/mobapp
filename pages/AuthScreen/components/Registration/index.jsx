import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConfirmCode from './components/ConfirmCode';
import RegistrationForm from './components/RegistrationForm';

const STEPS = [RegistrationForm, ConfirmCode];

const Registration = () => {
  const [step, setStep] = useState(1);

  const stepIndex = step - 1;
  const StepComponent = STEPS[stepIndex] || RegistrationForm;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <StepComponent onNextStep={() => setStep(step + 1)} />
    </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
})