import React, {useState} from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import styles from '../styles/main'
import * as Animatable from "react-native-animatable"
import TextField from '../components/textField'
import URLS from '../components/URLS'
import Alert_ from '../components/alert'

const {height, width} = Dimensions.get("screen")

export default function SignInActivity({navigation, route}) {

    let [loginERROR, setloginError] = useState(false)
    let [username, setUsername] =  useState("")
    let [password, setPassword] = useState("")
    let [invalidAccount, setInvalidAccount]  = useState(false)

    let [username_val, setUsername_val] = useState(true)
    let [password_val, setPassword_val] = useState(true)

    let onUsername = (e)=>{
        setUsername(e)
       
    }
    let onPass = (e)=>{
        setPassword(e)
    }
 
    let onSignIn =() =>{
        
        if(username.length === 0){
            setUsername_val(username_val = false)
        }
        else if(username.length > 0){
            setUsername_val(username_val = true)
        }

        
        if(password.length === 0){
            setPassword_val(password_val = false)
        }
        else if(password.length > 0){
            setPassword_val(password_val = true)
        }

        if (username_val && password_val){
            
            fetch(URLS.SIGN_IN_URL + route.params.mode, {
                method : "POST",
                headers:{
                    "Accept":"application/json, text/plain, */* ",
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    username,
                    password
                })

            })
            .then(res=> res.json())
            .then(res =>{
                
                if(res.credentials_match == true){
                    navigation.navigate(`Home ${route.params.mode}`, {
                        name_ : username,
                        nodeID : res.nodeID,
                        account : res.stream_acc
                    })
                }
                else{
                    setInvalidAccount(true)
                }

            })  
            .catch(err =>{
                console.log(err)
            })
        }
    }

    let navToStudentCreateAccount= () =>{
        navigation.navigate("Student Create Account")
    }
    let navToTutorCreateAccount = ()=>{
        navigation.navigate("Tutor Create Account")
    }
    return (
        <View style={styles.Screen}>
            <View style={inAppStyles.billboard}>
                <Animatable.Text 
                style = {[styles.h1, {color:"#101f36"}]}
                animation="fadeInRight"
                duration={1500}
                >
                    {route.params.mode}
                </Animatable.Text>
            </View>
            <Animatable.View style = {inAppStyles.body} animation={"fadeInUpBig"} duration={1500}>
                <View style = {styles.container_ic}>
                    <Text style = {[styles.h3, {
                        marginLeft:0,
                        marginBottom:12,
                        fontWeight:"bold"
                        }]}>
                           Username
                        </Text>
                    <TextField 
                    iconName = "user-o"
                    placeholder = "Enter Username"
                    secureTextEntry = {false}
                    inputType = "regular"
                    inputValid  = {username_val}
                    onTextChange = {onUsername}
                     />
                    <Text style = {[styles.h3, {marginLeft:0, marginBottom:12, fontWeight:"bold"}]}>Password</Text>
                    <TextField 
                    iconName = "lock"
                    placeholder = "* * * * "
                    secureTextEntry = {true}
                    inputType = "password"
                    inputValid = {username_val}
                    onTextChange = {onPass}
                     />
                    {
                        invalidAccount &&  <Alert_ status ="Account not found" status_color = "red"/>                 
                    }
                    <TouchableOpacity style = {inAppStyles.sighIn} onPress ={onSignIn}>
                        <Text style = {[styles.h3,{color : "#Fff"}]}>Sign In</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {inAppStyles.logIn} onPress = {()=>{
                        route.params.mode ==="STUDENT" ? (navToStudentCreateAccount()) : (navToTutorCreateAccount())
                    }}>
                        <Text style = {[styles.h3, {color:"#101f36"}]}>Create account</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}
let inAppStyles = StyleSheet.create({
    billboard:{
        height: height * 0.25,
        width : "100%",
       justifyContent:"flex-end",
       paddingBottom:25,
       paddingLeft:25
    },
    body:{
        height:height * 0.75,
        width: width,
        backgroundColor:"#f6f6f6",
        borderTopLeftRadius : 15,
        borderTopRightRadius : 15
    },
    sighIn:{
        backgroundColor:"#101f36",
        borderWidth:1,
        padding:15,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
        marginVertical:15
    },
    option:{
        alignItems:"center",
        justifyContent:"center"
    },
    logIn:{
        backgroundColor:"transparent",
        borderColor:"#101f36",
        borderWidth:1,
        padding:15,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
        marginVertical:15
    }

})
