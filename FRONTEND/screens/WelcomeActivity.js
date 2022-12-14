import React from 'react'
import { View, Text } from 'react-native'
import SplashScreen from '../components/splashScreen'
import styles from '../styles/main'

export default function WelcomeActivity({navigation}) {
    
    let onSignIn= (mode)=>{
        navigation.navigate("Sign In", {
            mode: mode
        })
    }
    return (
        <View style = {styles.Screen}>
            <SplashScreen onGETSTARTED={onSignIn}/>
        </View>
    )
}
