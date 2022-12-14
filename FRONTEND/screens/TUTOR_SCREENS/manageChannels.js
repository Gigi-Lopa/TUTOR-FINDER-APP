import React, {useState} from 'react'
import {View, Text} from "react-native"
import {StreamChat} from "stream-chat";
import { StatusBar } from 'expo-status-bar';
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput
} from "stream-chat-expo";
import AntDesign from "react-native-vector-icons/AntDesign"
import styles from '../../styles/main';


export default function ManageChannels({route}) {

    let [selectedChannel, setSelectedChannel] = useState(null)

    console.log(route.params.myStreamID)

    let filters ={
      type : "messaging",
      members  : {
        $in : [route.params.username]
      }
    }

    let onSelectChannel = (channel) =>{
        setSelectedChannel(channel)
    }

  return (

      <OverlayProvider style = {[styles.Screen]}>
        <StatusBar hidden/>
        <Chat client= {route.params.client} >
          {
          selectedChannel  ? (
          <Channel channel={selectedChannel}>
            <Text style = {[styles.mTop20,styles.h4, styles.row,styles.textCenter]} onPress={()=>{setSelectedChannel(null)}}>
                <AntDesign
                  name='arrowleft'
                  size={18}
                  color ={"#101f36"}
                />
                Go Back
            </Text>

            <MessageList/>
            <MessageInput/>
          </Channel>
        ) : (    
          
          <ChannelList onSelect={onSelectChannel} filters = {filters}/>
        )
      }
        </Chat>
      </OverlayProvider>

      
  )
}
