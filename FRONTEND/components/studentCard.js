import React, {useState} from 'react'
import styles from '../styles/main'
import {View, Text, TouchableOpacity, ScrollView} from "react-native"
import CardTag from './cardTag'
import URLS from './URLS'
import uuid from "react-native-uuid"

export default function StudentCard(props) {

    
  let [accepted, setAccepted] = useState(props.accepted)


    return (
        <View style ={[styles.request_card, styles.row]}>
            <View style = {styles.tutor_init}>
                <Text style= {styles.init}>{
                    props.fullname[0].toUpperCase()
                }  </Text>
            </View>
            <View>
                <Text style = {[styles.h4, styles.font_bold]}>{
                   props.fullname
                }</Text>
                <Text style = {{color : "grey"}}>Requested Subjects</Text>
                <ScrollView horizontal>
                    {
                        props.subs.map((sub)=>{
                            return(
                                <CardTag sub = {sub} key={ uuid.v4() }/>
                            )
                        })
                    }
                </ScrollView>
                <View style = {styles.row}>
                    <Text style = {{
                        marginTop : 10,
                        color: "grey"
                    }}>
                        {
                            props.created
                        }
                    </Text>
                </View>
                <View style = {styles.tutor_btm}>
                    {
                        accepted  == false ? (
                            <TouchableOpacity style = {[styles.accept_btn , {width : "88%"}]}
                            onPress = {()=>{
                                props.onAccept(props.studentID,props.request_id, props.username)
                                setAccepted(true)
                                }}>
                            <Text style ={[styles.h4_btn, styles.textCenter]}>{
                                 "Accept"
                            }</Text>
                        </TouchableOpacity>
                        ):(
                            <Text style = {[styles.accept_btn, styles.h4_btn, styles.textCenter, {width : "88%"}]}>Accepted</Text>
                        )
                    }                   
                </View>
                    
                </View>
                </View>
    
  )
}
