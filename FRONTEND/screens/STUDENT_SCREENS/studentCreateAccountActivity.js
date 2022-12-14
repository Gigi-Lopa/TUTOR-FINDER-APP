import React, {useState} from 'react'
import { View,
    Text,
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native'
import TextField from '../../components/textField'
import styles from '../../styles/main'
import * as Animatable from "react-native-animatable"
import URLS from '../../components/URLS'
import Alert_ from '../../components/alert'
const  {height, width} = Dimensions.get("screen")

export default function StudentCreateAccountActivity({navigation}) {
    let [fullname , setFullname] = useState("")
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [confirmedPass, setConfirmedPass] = useState("")
    let [fetchErr, setFetchERR] = useState(false)
    
    let [accountExist, setAccountExist] = useState(false)
    let [fullname_val, setFullname_val] = useState(true)
    let [username_val, setUsername_val] = useState(true)
    let [email_val, setEmail_val] = useState(true)
    let [password_val, setPassword_val] = useState(true)
    let [confirmedPass_val, setConfirmedPass_val] = useState(true)
    let [matchErr, setMatchErr] = useState(false)
    let [allValid, setAllval] = useState(false)

    function onFullname(e){
        setFullname(e)
    }
    function onUsername(e){
        setUsername(e)
    }
    function onEmail(e){
        setEmail(e)
    }
    function onPass(e){
        setPassword(e)
    }
    function onConfirm(e){
        setConfirmedPass(e)
    }

    let validateRows = ()=>{
        if(fullname.length == 0){
            setFullname_val(fullname_val =  false)
            setAllval(allValid = false)
            
        }

        else if (fullname.length !=  0){
            setFullname_val(fullname_val =  true)
            setAllval(allValid = true)
        }

        if(username.length == 0){
            setUsername_val(username_val =  false)
            setAllval(allValid = false)
        }
        else if (username.length != 0){
            setUsername_val(username_val =  true)
            setAllval(allValid = true)

        }
        /*EMIAL */
        if(email.length == 0){
            setEmail_val(email_val =  false)
            setAllval(allValid = false)
        }
        else if (email.length != 0){
            setEmail_val(email_val =  true)
            setAllval(allValid = true)
            
        }
        /* PASSWORD 1*/
        if(password.length == 0){
            setPassword_val(password_val =  false)
            setAllval(allValid = false)
        }
        else if (password.length!= 0){
            setPassword_val(password_val =  true)
            setAllval(allValid = true)

        }
        /* PASSWWORD 2 */
        if(confirmedPass.length == 0){
            setConfirmedPass_val(confirmedPass_val =  false)
            setAllval(allValid = false)
        }
        else if (confirmedPass.length !=0){
            setConfirmedPass_val(confirmedPass_val =  true)
            setAllval(allValid = true)    
        }

        if (password != confirmedPass){
            setMatchErr(matchErr = true)
            setAllval(allValid = false)
            setTimeout(()=>{
                setMatchErr(false)
            }, 2000)
        }
        else if (password === confirmedPass && password.length > 0){
            setAllval(allValid = true)
            setMatchErr(matchErr = false)
        }

        if (allValid){
            fetch(URLS.CREATE_STUDENT_NODE, {
                method : "POST",
                headers:{
                    "Accept":"application/json, text/plain, */*",
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    fullname,
                    username,
                    email,
                    password
                })

            })
            .then(res=> res.json())
            .then(res =>{
                if (!res.con){
                    setAccountExist(false)
                    if(res.insert_success == true){
                        setFetchERR(false)
                        navigation.navigate("Sign In", {
                            mode : "STUDENT"
                        })
                    }
                    else{
                        setFetchERR(true)
                        setTimeout(()=>{
                            setFetchERR(false)
                        }, 2000)
                    }
                }
                else if (res.con){
                    setAccountExist(true)
                }
                
            })  
            .catch(err =>{
                setFetchERR(true)
                console.log(err)
            })
        }
    }
    return (
        <View style={styles.Screen}>
            <View style={inAppStyles.billboard}>
                <Animatable.Text 
                style = {[styles.h1, {color:"#101f36"}]}
                animation="fadeInRight"
                duration={1500}
                >
                    CREATE ACCOUNT
                </Animatable.Text>
            </View>
            <KeyboardAvoidingView behavior = "height" style = {inAppStyles.body} animation={"fadeInUpBig"} duration={1500} >
                <ScrollView style = {styles.container_ic}>
                <Text style = {[styles.h3, {
                        marginLeft:0,
                        marginBottom:12,
                        fontWeight:"bold"
                        }]}>
                        Fullname
                        </Text>
                    <TextField 
                    iconName = "user-o"
                    placeholder = "Full Name"
                    secureTextEntry = {false}
                    inputType = "regular"
                    onTextChange = {onFullname}
                    inputValid = {fullname_val}
                    />
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
                    onTextChange = {onUsername}
                    inputValid = {username_val}
                    />
                    <Text style = {[styles.h3, {marginLeft:0, marginBottom:12, fontWeight:"bold"}]}>E-mail</Text>
                    <TextField 
                    iconName = "envelope-o"
                    placeholder = "Enter your Email"
                    inputType = "regular"
                    onTextChange = {onEmail}
                    inputValid = {email_val}
                    />
                    <Text style = {[styles.h3, {marginLeft:0, marginBottom:12, fontWeight:"bold"}]}>Password</Text>
                    <TextField 
                    iconName = "lock"
                    placeholder = "* * * * "
                    secureTextEntry = {true}
                    inputType = "password"
                    onTextChange = {onPass}
                    inputValid = {password_val}
                    />
                    <Text style = {[styles.h3, {marginLeft:0, marginBottom:12, fontWeight:"bold"}]}>Confirm Password</Text>
                    <TextField 
                    iconName = "lock"
                    placeholder = "* * * * "
                    secureTextEntry = {true}
                    inputType = "password"
                    onTextChange = {onConfirm}
                    inputValid = {confirmedPass_val}
                    />
                    {
                        
                        matchErr && <Alert_ status = "Passwords Dont match" status_color = "red"/>
                    }
                    {
                        fetchErr && <Alert_ status ="Error [!] occured. Try again" status_color = "red"/>
                    }
                    {
                        accountExist && <Alert_ status = "Username already exists" status_color = "red"/>
                    }


                    <TouchableOpacity style = {[inAppStyles.sighIn, styles.mBot50]} onPress = {validateRows}>
                        <Text style = {styles.h4_btn}>Create Account</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

    </View>
)
}
let inAppStyles = StyleSheet.create({
billboard:{
    height: height * 0.2,
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
