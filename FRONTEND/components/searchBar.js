import React from 'react'
import {View, TouchableOpacity, TextInput} from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import styles from '../styles/main'

export default function SearchBar(props) {
  return (
    <View style= {[styles.search_bar]}>
    <TouchableOpacity style = {styles.bg_icon} onPress = {props.onFind}>
        <FontAwesome
        name ="search" 
        color="#fff" 
        size={18}
        />
    </TouchableOpacity>
    <View>
        <TextInput
            placeholder = "Search by subject"
            style = {styles.search_field}
            value = {props.value}
            onChangeText ={props.onC}
        />
    </View>
    
</View>
  )
}
