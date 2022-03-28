import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import icons from '../../icons';

const BaseInput = ({ label, value, onChange, secureTextEntry, style, icon, onBlur, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(secureTextEntry)
  const isTouchedOrFocused = value || isFocused;
  
  const Icon = icons[icon];
  return (
    <View style={style}>
      <View style={[styles.form, isFocused ? styles.formFocused : {}]}>
        {/* Icon */}
        <View style={styles.icon}>
          {Icon && <Icon />}
        </View>
        <View style={styles.wrap}>
            <Text pointerEvents="none" style={isTouchedOrFocused ? styles.labelFocused : styles.label}>{label}</Text>
            <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    onBlur()
                    setIsFocused(false)
                  }}
                  secureTextEntry={isPasswordInput && secureTextEntry}
                  {...props}
              />
        </View>
        {/* {secureTextEntry && <Pressable onPress={() => setIsPasswordInput(!isPasswordInput)}><Text>show password</Text></Pressable>} */}
      </View>
      {error && <Text style={styles.errorText}>{error || ''}</Text>}
    </View>
  )
}

export default BaseInput

const label = {
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: 16,
  position: 'absolute',
  top: 16,
}

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2F2F2F',
        height: 56,
    },
    formFocused: {
      borderBottomColor: '#03DAC5',
      borderBottomWidth: 1,
    },
    icon: {
      width: 52,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrap: {
      width: '50%',
      paddingTop: 22,
    },
    label,
    labelFocused: {
      ...label,
      top: 8,
      fontSize: 12,
      color: '#03DAC5',
    },
    input: {
      color: '#fff',
      textDecorationLine: 'none',
    },
    asd: {
      color: '#dc3545',
    },
    errorText: {
      marginTop: 4,
      color: '#dc3545',
      fontSize: 12,
    },
})