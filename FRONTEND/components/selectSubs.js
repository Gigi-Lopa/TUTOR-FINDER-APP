import React, {useState} from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles/main'


export default function SelectSubs(props) {


  return (
    <TouchableOpacity style ={[styles.card_tag ,
        
            {
                backgroundColor:"green"
            }
          
    ]} onPress = {()=>
        {   
            props.onremove(props.sub)

        }}>
            <Text style ={styles.h4_btn}>{props.sub}</Text>
    </TouchableOpacity>
  )
}
