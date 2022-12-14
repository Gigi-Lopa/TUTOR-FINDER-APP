import React from 'react'
import {
    View,
    Text, 
    TouchableOpacity,
    Image
} from "react-native"
import styles from '../styles/main'

export default function Chat({
  image, name, nav
}) {
  return (
    <TouchableOpacity style= {styles.chat} onPress ={nav}>
        <View style ={styles.image}>
            <Image source={image} style={styles.image_}/>
        </View>
        <View style = {[styles.chatName]}>
          <Text style = {styles.name}>
            {name}
          </Text>
        </View>
    </TouchableOpacity>
  )
}
