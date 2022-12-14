import React from 'react'
import {View, Text, TouchableOpacity} from "react-native"
import styles from '../styles/main'

export default function CardTag(props) {
  return (
        <View style = {styles.card_tag}>
            <Text style= {styles.h4_btn}>{props.sub}</Text>
        </View>

    )
}
