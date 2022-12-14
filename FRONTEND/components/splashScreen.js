import React from "react"
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, Dimensions } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import styles from "../styles/main"
import * as Animatable from "react-native-animatable" 

let { height, width } = Dimensions.get("screen")
let logo = require("../assets/bg.png")

let SplashScreen = ({onGETSTARTED, route}) => {
    let fadeIn ="fadeInUpBig"
    return(
        <View style={ styles.Screen }>
            <View style = {inComponentStyles.billboard}>
                <Image source = {logo} style = {inComponentStyles.BG_}/>
            
                <Animatable.View animation={fadeIn} duration={1500} style = {inComponentStyles.body}>
                    <View style = {styles.container_ic}>
                          <Text style = {[styles.h2, {textAlign:"center", marginTop:25, marginBottom :25}]}>GET STARTED</Text>
                        
                        <View style = {inComponentStyles.bottom}>
                            <TouchableOpacity style = {[styles.btn_primary, inComponentStyles.btn_primary]} onPress = {()=>{
                                onGETSTARTED("STUDENT")
                            }}>
                                <Text style = {styles.h4_btn}>STUDENT</Text>
                                <MaterialIcons name="navigate-next" color="#fff" size = {15} style = {{marginLeft : 10}}/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style = {[styles.btn_primary, inComponentStyles.btn_primary]} onPress = {()=>{
                                onGETSTARTED("TUTOR")
                            }}>
                                <Text style = {styles.h4_btn}>TUTOR</Text>
                                <MaterialIcons name="navigate-next" color="#fff" size = {15} style = {{marginLeft : 10}}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Animatable.View>
            </View>
        </View>
    )
}

let inComponentStyles = StyleSheet.create({
    billboard:{
        height: height * 0.4,
        width: "100%",
    },
    body:{
        height: height *0.5,
        position:"absolute",
        width: "100%",
        backgroundColor: "#f9f9f9",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: height * 0.55,
        color: "#101f36"
    },
    BG_:{
        width: "100%",
        height : height *0.8
    },
    h2:{
        textAlign:"center",
        fontWeight: "bold"
    },
    btn_primary:{
      marginBottom: 25  
    }

  
})

export default SplashScreen