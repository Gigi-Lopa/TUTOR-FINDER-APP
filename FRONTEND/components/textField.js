import React from 'react'
import { View, Text, TextInput } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import styles from '../styles/main'
export default function TextField(props) {
    return (
        <View style = {styles.form_row}>
            
            <FontAwesome
            name ={props.iconName} 
            color="#101f36" 
            size={18}
            style = {styles.icon}
            />

            <TextInput
            placeholder={props.placeholder}
            autoCapitalize="none"
            secureTextEntry = {props.secureTextEntry}
            style = {[styles.textField, styles.font_bold, props.inputValid ? styles.textFieldValid : styles.textFieldInvalid]}
            onChangeText = {props.onTextChange}
            
            />
        </View>
    )
}
