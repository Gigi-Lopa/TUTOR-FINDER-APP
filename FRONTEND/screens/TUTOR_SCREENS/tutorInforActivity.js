import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
} from "react-native"
import styles from '../../styles/main'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AnimatedLoader from "react-native-animated-loader";
import URLS from '../../components/URLS';
import Alert_ from '../../components/alert';
import SelectSubs from '../../components/selectSubs';
import SelectDropdown from 'react-native-select-dropdown';
import uuid from "react-native-uuid"

export default function TutorInforActivity({route}) {
    
    let [tutorInfor, setTutorInfor] = useState(null)
    let [subs, setSubs] =  useState([])
    let [status, setStatus] = useState(false)
    let [valid, setValid] =  useState(true)

    let headerImage  = require("../../assets/footer-bg.png")

    useEffect(()=>{
        fetch(URLS.GET_TUTOR_INFOR + route.params.tutor_id)
        .then(res => res.json())
        .then(res =>{
            setTutorInfor(res.tutor_info)
        })  
        .catch(err =>{
            console.log(err)
        })
    },[])
    let postSubs =(tutor_id) =>{
        fetch(URLS.POST_SUBS, {
            method : "POST",
            headers:{
                "Accept":"application/json, text/plain, */* ",
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                tutorID : tutor_id,
                studentID: route.params.nodeID,
                subs
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.request_status == true){
                setStatus(true)
                setTimeout(()=>{
                    setStatus(false)
                },3000)
            }
        })

    }
    let onSubmit =(tutorId) =>{
        if (subs.length  === 0){
           setValid(valid = false)
            setTimeout(()=>
            {
                setValid(valid = true)
            },2000)
        }
        else{
            postSubs(tutorId)            
        }
    }
    function onRemoveSub(sub){
       setSubs(prev => prev.filter(s => s !== sub))
    }
    return (
        <View style = {[styles.Screen]}>
                <StatusBar style="dark" />
                <View style = {styles.abImage}>
                    <Image source = {headerImage} style = {{position: "absolute"}} resizemode = "stretch" />
                </View>
            {
                tutorInfor ? (                    
                    <ScrollView style = {styles.tutorInfor}>  
                            <View style = {styles.tutorHeader}>
                                <Text style = {[styles.h1]}>{
                                    tutorInfor._fields[0].properties.fullname[0].toUpperCase()
                                    }
                                </Text>
                                <Text style = {styles.h4}>{
                                    tutorInfor._fields[0].properties.fullname.toUpperCase()
                                }</Text>
                            </View>
                            {/* THIS IS JUST FOR DESCRIPTION AND STUFF */}
                            <Text style = {styles.h3}>
                                {
                                    tutorInfor._fields[0].properties.description
                                }
                            </Text>
                        
                            {/* AND  THIS IS FOR QUALIFACTIONS */}
                            <View style = {[styles.mTop15,styles.qualifications]}>
                                <Text style = {[styles.h3, styles.font_bold]}>Qualifications</Text>
                                <ScrollView horizontal>
                                    {
                                         tutorInfor._fields[0].properties.qualifications.map(elem =>{
                                            return(
                                                <Text style ={styles.h3} key={uuid.v4()}>{elem}</Text>
                                            )
                                         })
                                    }
                                </ScrollView>
                            </View>
                
                            {/* AND THIS IS FOR THE NUMBER OF SUBS */}
                            <View style = {styles.TutorSubs}>
                                <Text style = {[styles.h3, styles.font_bold, styles.mTop15]}>Modules</Text>
                            </View>
                            <SelectDropdown
                                style = {styles.dropdown}
                                search = {true}
                                buttonStyle = {styles.selector_row}
                                searchInputStyle = {styles.searchInputStyle}
                                data={tutorInfor._fields[0].properties.modules}
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
                            {/* PRICE && LOCATION */}
                            <View style ={
                                {
                                    width : "100%",
                                    flexDirection : "row",
                                    marginTop : 15
                                }
                                }>
                                {/* PRICE  */}
                                <View style = {[styles.row]}>
                                    <FontAwesome
                                        name="usd"
                                        color = "red"
                                        size = {25}
                                    />
                                    <Text style = {styles.price}>
                                        {
                                            tutorInfor._fields[0].properties.price[0]
                                        }
                                    </Text>
                                    <Text style = {styles.period}>
                                        {
                                            tutorInfor._fields[0].properties.price[1]
                                        }
                                    </Text>        
                                </View>
                
                                {/* LOCATION */}
                                <View style = {[styles.location, styles.mLeft25]}>
                                    <Text style ={styles.loc}>Harare</Text>
                                </View>
                            </View>
                            {
                                !valid && <Alert_ status_color = "RED" status = "No Subjects Selected"/>
                            }
                            
                            {
                                status && <Alert_ status_color = "GREEN" status = "Request was sent successfully"/>
                            }
                            <View style = {[styles.rqtBtn, styles.mTop15]}>
                                <TouchableOpacity style = {styles.btn_primary} onPress = {()=>onSubmit(tutorInfor._fields[0].identity.low)}>
                                    <Text style = {styles.h4_btn}>
                                        REQUEST
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </ScrollView>
                ):(
                    <AnimatedLoader
                    visible={tutorInfor ? (false)  : (true)}
                    overlayColor="rgb(255,255,255)"
                    source={require("../../components/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                  />
                )
            } 
            
        </View>
        )    
}
inCompStyles = StyleSheet.create({
    h1:{
        color : "#fff"
    }
})