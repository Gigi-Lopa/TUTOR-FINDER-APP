import React from 'react'
import {View, Text, TouchableOpacity} from "react-native"
import styles from '../styles/main'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function Navbar({username, navigation, client, navTo, network}) {

    function openChats(){
        navigation.navigate(navTo, {
            username  : username,
            client: client
        })
    }

    return (
    <View style = {[styles.navbar]}>
        <View style= {styles.account_infor}>
            <Text style = {[styles.h3, styles.font_bold]}>
                Welcome 
                <FontAwesome5
                    name ="hand-sparkles" 
                    color="gold" 
                    size={18}
                    style = {styles.icon}
                />
            
            </Text>
            <Text style = {styles.h2}>{username}</Text>
        </View>
        {
            !network && 
            <TouchableOpacity style = {styles.bg_icon} onPress = {openChats}>
                <FontAwesome5
                    name ="comments" 
                    color="#fff" 
                    size={18}
                    style = {styles.icon}
                />
            </TouchableOpacity>
        }
        
    </View>
  )
}
