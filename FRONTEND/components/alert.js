import React from "react"
import { View, Text} from "react-native"
import styles from "../styles/main"

export default function Alert_(props){
    return (
        <View style = {[styles.alert, styles.mTop15,props.status_color==="GREEN"?(styles.success)  : (styles.danger)]}>
            <Text style = {styles.h4_btn}>{props.status}</Text>
        </View>
    ) 
}