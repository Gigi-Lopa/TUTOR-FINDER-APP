import React , {useState} from 'react'
import {View, Text, TouchableOpacity} from "react-native"
import styles from '../styles/main'
import CardTag from './cardTag'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { ScrollView } from 'react-native-gesture-handler'
import uuid from "react-native-uuid"

export default function Tutor(props) {
    
  return (
    <TouchableOpacity style ={styles.tutor_card} onPress = {()=>{props.nav(props.tutor_id)}}>
        <View style = {styles.tutor_init}>
            <Text style= {styles.init}>{
               props.fullname[0].toLocaleUpperCase()
            }</Text>
            <View style = {styles.physical_online}>
                <Text>Physical</Text>
            </View>
        </View>
        <View style = {styles.tutor_infor}>
            <Text style = {[styles.h3, styles.font_bold]}>{
                props.fullname
            }</Text>
            <ScrollView style = {[styles.archievements, styles.row]} horizontal>
                {
                    props.qualifications.map((qualification) =>{
                        return(
                            <Text style ={styles.archievement} key ={uuid.v4()}>{qualification}</Text>
                        )
                    })
                }
            </ScrollView>
            <ScrollView style = {[styles.CARD_tags]} horizontal>
                {
                    props.subjects.map((sub)=>{
                        return(
                            <CardTag sub = {sub} key= {uuid.v4()}/>
                        )
                    })
                }
            </ScrollView>
            <View style = {[styles.tutor_btm, {justifyContent:"space-between"}]}>
                <View style = {[styles.row,styles.tutor_price]}>
                    <FontAwesome
                        name="usd"
                        color = "red"
                        size = {25}
                    />
                    <Text style = {styles.price}>{
                        props.price[0]
                    }
                    </Text>
                    <Text style = {styles.period}>{
                        props.price[1]

                    }
                    </Text>        
                </View>
                <View style = {styles.location}>
                    <Text style ={styles.loc}>{
                        props.location
                    }</Text>
                </View>
                
            </View>
        </View>
  </TouchableOpacity>
  )
}
