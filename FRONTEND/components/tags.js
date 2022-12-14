import React from 'react'
import {ScrollView} from "react-native"
import styles from '../styles/main'
import Tag from './tag'
import SUBJECTS from './SUBJECTS'
import uuid from "react-native-uuid"


function Tags(props) {
  return (
    <ScrollView  horizontal styles = {styles.tags}>
      {
        SUBJECTS.map(sub=>{
          return(
            <Tag key ={uuid.v4} subject = {sub} find = {props.find}/>
          )
        })
      }
    </ScrollView>
  )
}

export default Tags