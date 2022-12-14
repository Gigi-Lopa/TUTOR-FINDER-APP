import React, {useEffect, useState} from 'react'
import { View , StyleSheet,Text, ScrollView, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import styles from '../../styles/main'
import {StreamChat} from "stream-chat";
import Navbar from '../../components/navBar'
let { height, width } = Dimensions.get("screen")
import SearchBar from '../../components/searchBar'
import Tags from '../../components/tags'
import Tutor from '../../components/tutor'
import URLS from '../../components/URLS'



export default function StudentHomeActivity(props) {

  let [tutors, setTutors] = useState(null)
  let [search, setSearch] = useState(null)
  let [client, setClient] = useState(null)
  let [netWorkErr, setNetwork] = useState(false)
  let [API_KEY, setKEY] = useState("wheermx29ba2");
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
      
    }

   
  }

  useEffect(()=>{
    async function getTutors(){
      await fetch(URLS.GET_TUTORS)
          .then(res =>res.json())
          .then(res =>{
            try{
              if (res.tutorsArr.length > 0 ){
                setTutors(res.tutorsArr)
              }
              }
              catch (TypeError){
                setTutors(null)
              }
          })
      }
      getTutors()
      .then(()=>{
        let tryToConnect = () =>{
            connectUsers()
        }
        tryToConnect()
      })
    
    }, [])

let navToMoreInfor = (id) =>{
    props.navigation.navigate("More Infor", {
      tutor_id : id,
      nodeID : props.route.params.nodeID
    })
}
  let findTutor = (sub)=>{
    setTutors(null)
    fetch(URLS.FIND_TUTOR, {
      method : "POST",
      headers:{
          "Accept":"application/json, text/plain, */* ",
          "Content-type":"application/json"
      },
      body:JSON.stringify({
          sub
      })

    })
    .then(res=> res.json())
    .then(res =>{
      setTutors(res.tutorsArr)
    })  
    .catch(err =>{
        console.log(err)
    })
    }
  function onSearch(e){
    setSearch(e)
  }

  function FIND(){
    findTutor(search)
  }

  return (
    client != null ?(
    <View style= {styles.Screen}>
      <Navbar network = {netWorkErr} username = {props.route.params.account.id} client = {client} nodeID = {props.route.params.nodeID} navigation ={props.navigation} navTo = {"Student Chats"}/>
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
      <SearchBar value = {search} onC ={onSearch} onFind ={FIND}/>  
      <Tags find = {findTutor}/>
      <View style = {styles.tutors}>
        {
          tutors ? (
            <ScrollView>
                {
                tutors.map((item) => {
                return(
                  <Tutor 
                    key = {item.key}
                    tutor_id = {item.tutor_id}
                    nav = {navToMoreInfor}
                    fullname = {item.fullname}
                    qualifications = {item.qualifications}
                    subjects = {item.subjects}
                    location = {item.location}
                    price = {item.price}
                  />
                )
                })
              }
            </ScrollView>
          ) 
          :(
            <Text style= {[styles.textCenter, styles.font_bold, {color: "#333"}]}>No Tutors Yet</Text> 
          )
        }
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
