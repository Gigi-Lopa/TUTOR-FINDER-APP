import React from 'react'
import {Text, TouchableOpacity} from "react-native"
import styles from '../styles/main'

export default function Tag(props) {
  return (
    <TouchableOpacity style ={styles.tag} onPress = {()=>props.find(props.subject)}>
        <Text style ={styles.h4_btn}>{props.subject}</Text>
    </TouchableOpacity>
  )
}
