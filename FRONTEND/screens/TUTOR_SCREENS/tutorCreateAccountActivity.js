import React, {useState} from 'react'
import {View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from "react-native"
import styles from '../../styles/main'
import * as Animatable from "react-native-animatable"
import TextField from '../../components/textField'
import BigText from "../../components/bigText"
import Entypo from "react-native-vector-icons/Entypo"
import URLS from '../../components/URLS'
import SelectDropdown from 'react-native-select-dropdown';
import SelectSubs from '../../components/selectSubs';
import SUBJECTS from '../../components/SUBJECTS'
import uuid from "react-native-uuid"
import AntDesign from "react-native-vector-icons/AntDesign"
import Alert_ from '../../components/alert'
let { height, width } = Dimensions.get("screen")


export default function TutorCreateAccountActivity({navigation}) {

  let [fullname , setFullname] = useState("")
  let [username, setUsername] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [confirmedPass, setConfirmedPass] = useState("")
  let [bio, setBio] = useState("")
  let [fetchErr, setFetchERR] = useState(false)
  let [qualification, setQualification] = useState("")
  let [qualifications, setQualifications] = useState([])
  let [loc, setLoc] = useState("")
  let [price, setPrice] = useState("")
  let [DWM, setDWM] = useState("")
  let [subs, setSubs] =  useState([])

  let [fullname_val, setFullname_val] = useState(true)
  let [username_val, setUsername_val] = useState(true)
  let [email_val, setEmail_val] = useState(true)
  let [bio_val, setBio_val] = useState(true)
  let [qualification_val, setQualification_val] = useState(true)
  let [loc_val, setLoc_val] = useState(true)
  let [price_val, setPrice_val] = useState(true)
  let [DWM_val, setDWM_val] = useState(true)
  let [accountExist, setAccountExist] = useState(false)
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
  function onBio (e){
    setBio(e)    
  }
  function onQualication(e){
    setQualification(e)
  }
  function onLoc(e){
    setLoc(e)
  }
  function onPrice(e){
    setPrice(e)
  }
  function onDWM(e){
    setDWM(e)
  }

  function onAddQualification(){
    if (qualification.length != 0){
      setQualifications((state)=> [...state, qualification])
      setQualification(qualification = "")
    }
    else{
      ToastAndroid.show("Enter a qualification",ToastAndroid.SHORT )
    }
  }

  function postInformation(){
    fetch(URLS.CREATE_TUTOR_NODE, {
      method : "POST",
      headers:{
          "Accept":"application/json, text/plain, */*",
          "Content-type":"application/json"
      },
      body:JSON.stringify({
          fullname,
          username,
          email,
          password,
          bio,
          prices :[price, DWM],
          subs,
          qualifications,
          loc
      })

  })
  .then(res=> res.json())
  .then(res =>{
    if (!res.con){
      setAccountExist(false)
      if(res.insert_success == true){
          setFetchERR(false)
          navigation.navigate("Sign In", {
              mode : "TUTOR"
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
  function onRemoveSub(sub){
    setSubs(prev => prev.filter(s => s !== sub))
 }
 function onRemoveArch(elem){
  setQualifications(prev => prev.filter(s => s !== elem))
}
  let validateRows = ()=>{
    if(fullname.length === 0){
        setFullname_val(fullname_val =  false)
        setAllval(allValid = false)
    }

    else if (fullname.length > 0){
        setFullname_val(fullname_val =  true)
        setAllval(allValid = true)
    }


    if(username.length === 0){
        setUsername_val(username_val =  false)
        setAllval(allValid = false)
    }
    else if (username.length > 0){
        setUsername_val(username_val =  true)
        setAllval(allValid = true)

    }
    /*EMIAL */
    if(email.length === 0){
        setEmail_val(email_val =  false)
        setAllval(allValid = false)
    }
    else if (email.length > 0){
        setEmail_val(email_val =  true)
        setAllval(allValid = true)
        
    }
    /* PASSWORD 1*/
    if(password.length === 0){
        setPassword_val(password_val =  false)
        setAllval(allValid = false)
    }
    else if (password.length > 0){
        setPassword_val(password_val =  true)
        setAllval(allValid = true)

    }
    /* PASSWWORD 2 */
    if(confirmedPass.length === 0){
        setConfirmedPass_val(confirmedPass_val =  false)
        setAllval(allValid = false)
    }
    else if (confirmedPass.length > 0){
        setConfirmedPass_val(confirmedPass_val =  true)
        setAllval(allValid = true)
    }

    if (password != confirmedPass){
        setMatchErr(matchErr = true)
        setAllval(allValid = false)
    }
    else if (password === confirmedPass  && password.length > 0){
        setAllval(allValid = true)
        setMatchErr(matchErr = false)
    }

    /* BIO */
    if(bio.length === 0){
      setBio_val(bio_val =  false)
      setAllval(allValid = false)
  }

    else if (bio.length > 0){
        setBio_val(bio_val =  true)
        setAllval(allValid = true)
    }
    
    /* QUALIFICATION  */
    if(qualifications.length === 0){
      setQualification_val(qualification_val =  false)
      setAllval(allValid = false)
    }

    else if (qualifications.length > 0){
        setQualification_val(qualification_val =  true)
        setAllval(allValid = true)
    }
      /* LOCATION  */
      if(loc.length === 0){
        setLoc_val(loc_val =  false)
        setAllval(allValid = false)
      }
  
      else if (loc.length > 0){
          setLoc_val(loc_val =  true)
          setAllval(allValid = true)
      }

       /* PRICE  */
       if(price.length === 0){
        setPrice_val(price_val =  false)
        setAllval(allValid = false)
      }
  
        else if (price.length > 0){
          setPrice_val(price_val  =  true)
          setAllval(allValid = true)
      }
      
       /* DWM  */
       if(DWM.length === 0){
        setDWM_val(DWM_val =  false)
        setAllval(allValid = false)
      }
  
        else if (DWM.length > 0){
          setDWM_val(DWM_val  =  true)
          setAllval(allValid = true)
      }
       /* SUBJECT  */
      if(subs.length === 0){
        setAllval(allValid = false)
        alert("Select at least Subject")
      }

      else if (subs.length > 0){
        setAllval(allValid = true)
      }
      if (allValid){
        postInformation()
      }
  }
  
  return (
    <View style = {styles.Screen}>
      <View style={inAppStyles.billboard}>
        <Animatable.Text 
        style = {[styles.h1, {color:"#101f36"}]}
        animation="fadeInRight"
        duration={1500}>
          CREATE ACCOUNT
        </Animatable.Text>
      </View>
      <KeyboardAvoidingView behavior = "height" style = {inAppStyles.body} animation={"fadeInUpBig"} duration={1500}>
        <ScrollView >
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
          placeholder = "Username"
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
          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12, fontWeight:"bold"}]}>Bio</Text>
          <BigText
             onTextChange = {onBio}
             inputValid = {bio_val}
          />
          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12},styles.mTop15, styles.font_bold]}>Qualifications</Text>
          <View style = {[styles.row, styles.rowBtn]}>
            <TextInput
              style = {[styles.ordinaryTextInput, qualification_val  ? styles.textFieldValid : styles.textFieldInvalid]}
              onChangeText = {onQualication}
              placeholder = {"Enter your Qualifications"}
              value = {qualification}
            />
            <TouchableOpacity style = {styles.bg_icon} onPress = {onAddQualification}>
              <Entypo
                name ="plus" 
                color="#fff" 
                size={18}
                style = {styles.icon}
              />
          </TouchableOpacity>
          </View>
          <ScrollView horizontal>
            {
              qualifications.map(elem=>{
                return(
                  <SelectSubs key = {uuid.v4()} sub = {elem} onremove ={onRemoveArch} />
                  
                )
              })
            }
          </ScrollView>

          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12},styles.mTop15, styles.font_bold]}>Provincial Location</Text>
          <TextField 
          iconName = "map-marker"
          placeholder = "Your Provincial Location"
          inputType = "regular"
          onTextChange = {onLoc}
          inputValid = {loc_val}
          />
          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12},styles.mTop15, styles.font_bold]}>Price</Text>
          <TextField 
          iconName = "usd"
          placeholder = "Price"
          inputType = "regular"
          onTextChange = {onPrice}
          inputValid = {price_val}
          />
          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12},styles.mTop15, styles.font_bold]}>Dayly-Weekly-Monthly</Text>
          <TextField 
          iconName = "money"
          placeholder = "Paid Dayly/Weekly/Monthly"
          inputType = "regular"
          onTextChange = {onDWM}
          inputValid = {DWM_val}
          />

          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12},styles.mTop15, styles.font_bold]}>Subjects</Text>
          <SelectDropdown
            style = {styles.dropdown}
            search = {true}
            searchInputStyle = {styles.searchInputStyle}
            data={SUBJECTS}
            buttonStyle ={styles.selector_row}
            buttonTextStyle = {styles.h3}
            renderDropdownIcon = {()=>{return <AntDesign name='caretdown' size={18}/>}}
            defaultButtonText = {"Select Modules"}
            onSelect={(sub, index) => {
                if(subs.length ===0){
                    setSubs([...subs, sub])
                }
                else if(subs.length > 0 && !subs.includes(sub)){
                    setSubs([...subs, sub])
                }
            }}
            
          />
            <ScrollView horizontal>
              {
                subs.map(ele=>{
                      return (
                      <SelectSubs key = {uuid.v4()} sub = {ele} onremove ={onRemoveSub} />
                      )
                  })
              }
            </ScrollView>
          <Text style = {[styles.h3, {marginLeft:0, marginBottom:12},styles.mTop15, styles.font_bold]}>Password</Text>
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


          <TouchableOpacity style = {[styles.btn_primary, styles.mTop15]} onPress = {validateRows}>
            <Text style = {styles.h4_btn}>Sign Up</Text>
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
    borderTopRightRadius : 15,
    padding : 15
},
})
