import React, {useState,useEffect} from 'react'
import {View, Text, ScrollView, TouchableOpacity} from "react-native"
import {StreamChat} from "stream-chat";
import {
  Chat,
  OverlayProvider
} from "stream-chat-expo"
import Navbar from '../../components/navBar'
import SearchBar from '../../components/searchBar'
import StudentCard from '../../components/studentCard'
import URLS from '../../components/URLS'
import styles from '../../styles/main'
import AnimatedLoader from "react-native-animated-loader";
let image = require("../../assets/profile-img1.jpg")

export default function TutorHomeActivity(props) {
  
  let [results, setResults] = useState(null)
  let [tutor_infor, setTutor_infor] = useState(null)
  let [client, setClient] = useState(null)
  let [API_KEY, setKEY] = useState("wheermx29ba2");
  let [netWorkErr, setNetwork] = useState(false)
  let cli = StreamChat.getInstance(API_KEY); 

  let connectUsers = async () =>{
    try{
      await cli.connectUser(props.route.params.account,
        cli.devToken(
          props.route.params.account.id
        )) 
        setClient(cli)
    }
    catch (Error){
     
        setNetwork(true)
        setClient(true)
      
    }}

  useEffect(()=>{
    
    async function getRequests(){
      await fetch(URLS.GET_REQUEST + props.route.params.nodeID)
      .then(res =>res.json())
      .then(res=>{
        try{
          if(res.requests.length > 0){
            setResults(results =  res.requests)
            setTutor_infor(tutor_infor = res.tutor)
          }
        }
        catch (TypeError){
          setResults(null)
        }
        
      })
    }
    
    getRequests()
   .then(()=>{     
    let tryToConnect = () =>{
      connectUsers()
    }
    tryToConnect()
    })

    return ()=>{
      if (client){
        client.disconnectUser()
      }
    }

  },[])
  let acceptRequest=(id, request_id, username)=>{
    fetch(URLS.ACCEPT_REQUEST, {
      method : "POST",                              
      headers:{                                     
          "Accept":"application/json, text/plain, */* ",
          "Content-type":"application/json"
      },
      body : JSON.stringify({
        studentID : id,
        tutorID : props.route.params.nodeID,
        request_id
      })
    })
    .then(res=>res.json())
    .then(res=>{
        if (res.accepted_ == true){
          let createChannel  = () =>{
          let channel = client.channel("messaging", {
              members : [username, tutor_infor.id]
            })
            channel.watch()
          }
          try {
            createChannel()
          }
          catch {
            createChannel()
          }
        }
    })
  }  
  return (
      client != null ?(
        <View style = {styles.Screen}>
          <Navbar network = {netWorkErr} username={props.route.params.account.id} client = {client} nodeID = {props.route.params.nodeID} navigation ={props.navigation} navTo = {"Tutor Chats"}/>
          {
            netWorkErr && <TouchableOpacity style = {[styles.btn_primary, {
                backgroundColor:"red"
              }]} onPress = {()=>{
                setClient(null)
                setNetwork(false)
                connectUsers()
              }}>
                <Text style={[styles.h4_btn]}>Unable to connect to Chatting service. Click here and Try again</Text>
              </TouchableOpacity>
      }
            <SearchBar/>
            <Text style = {[styles.h3, {paddingLeft : 25}]}>REQUESTS</Text>
            <View style = {[styles.tutors, styles.tutors_extra]}>  
            <ScrollView>
              {
                results != null ?(
                  results.map(elem=>{
                    return (
                    <StudentCard 
                      key={elem.request_id}
                      request_id = {elem.request_id}
                      studentID = {elem.studentID}
                      fullname = {elem.fullname}
                      username = {elem.username}
                      subs =  {elem.subs}
                      accepted = {elem.accepted}
                      rejected = {elem.rejected}
                      created = {`Date ${elem.date.year.low}-${elem.date.month.low}-${elem.date.day.low} Time: ${elem.date.hour.low}:${elem.date.minute.low}`}
                      onAccept = {acceptRequest}
                      />
                      )
                  })
                ):(
                  <Text style= {[styles.textCenter, styles.font_bold, {color: "#333"}]}>
                    No Requests Yet
                  </Text>
                )          
              }      
              </ScrollView>
              </View>
          </View>
        ):(
            <AnimatedLoader
              visible={client == null ? (true)  : (false)}
              overlayColor="rgb(255,255,255)"
              source={require("../../components/loader.json")}
              animationStyle={styles.lottie}
              speed={1}
            />
          )
  )
}
/* 

}) */