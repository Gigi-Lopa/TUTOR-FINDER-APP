import React from 'react'
import { TextInput } from 'react-native'
import styles from '../styles/main'


export default function BigText(props) {
  return (
    <TextInput style  = {[styles.bigText, props.inputValid ? styles.textFieldValid : {borderColor:"red"}]}
        onChangeText = {props.onTextChange}
        multiline = {true} numberOfLine = {7}
    >

    </TextInput>
  )
}
