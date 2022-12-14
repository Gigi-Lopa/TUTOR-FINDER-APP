import { StyleSheet, Dimensions } from 'react-native'
import { color } from 'react-native-reanimated'
let { height, width } = Dimensions.get("screen")

let styles = StyleSheet.create({
    Screen:{
        width:"100%",
        flex:1,
        height :height,
        backgroundColor:"#eaeaeaea",
        flexDirection:"column"
    },  
    container_ic:{
        width:"100%",
        height:"100%",
        padding: 25
    },
    container:{
        padding : 15
    },
    h1:{
        fontSize:30,
        color:"#101f36",
        fontWeight : "bold"
    },
    h2:{
        fontSize:20,
        color : "#101f36"
    },
    h3:{
        fontSize: 18,
        color:"#101f36",
    },
    selector_h3:{
        fontSize: 18,
        color :"#fff"
    },
    h4:{
        fontSize: 15,
        color:"#101f36",
    },
    h4_btn:{
        color:  "#fff"
    },
    row:{
        flexDirection:"row"
    },
    rowBtn  :{
        width : "100%",
        justifyContent  : "space-between"
    },
    ordinaryTextInput  :{
        width  : "80%",
        paddingBottom:5,
        color:"#101f36",
        borderBottomWidth:1,
    },
    mLeft25: {
        marginLeft :25
    },
    btn_primary:{
        paddingTop: 23,
        paddingBottom  : 23,
        backgroundColor:"#101f36",
        width: "100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
    },
    selector_row:{
        paddingTop: 23,
        paddingBottom  : 23,
        borderColor:"#101f36",
        borderWidth : 2,
        width: "100%",
        borderRadius:10,
        color: "#101f36"
    },
    form_row:{
        width:"100%",
        flexDirection:"row",
        marginBottom: 25,
        alignItems:"flex-start",
        justifyContent:"center"

    },
    textField:{
        width:"80%",
        marginLeft: 15,
        paddingBottom:5,
        color:"#101f36",
        borderBottomWidth:1,
        
    },
    textFieldValid:{
        borderBottomColor :"#101f36"
    },
    textFieldInvalid:{
        borderBottomColor : "red"
    },
    font_bold:{
        fontWeight:"bold"
    },
    navbar:{
        width: "100%",
        backgroundColor: "transparent",
        height: "8%",
        marginTop : height * 0.075,
        flexDirection :"row",
        paddingLeft: 25,
        paddingRight:25,
        justifyContent : "space-between"
    },
    bg_icon:{
        backgroundColor  :"#101f36",
        width:50,
        height:50,
        borderRadius : 15,
        justifyContent : "center",
        alignItems  :"center",
        marginRight  : 15
    },
    search_bar:{
        width :"100%",
        flexDirection :"row",
        padding: 25,
       
    },
    search_field:{
       borderWidth :2,
       borderColor :"#101f36",
       borderRadius :5,
       padding: 10,
       width: width * 0.7,
       height  : 50
    },
    tags:{
        flexDirection : "row",
        width : width,
        paddingLeft : 25,
        paddingRight: 25
    },
    tag:{
        padding : 10,
        width : 100,
        marginLeft: 15,
        borderWidth : 2,
        backgroundColor : "#101f36",
        justifyContent:"center",
        alignItems : "center",
        borderRadius : 15
    },
    abImage:{
        position: "absolute"
    },
    textCenter:{
        textAlign : "center"
    },
    tutors:{
        height : height *0.575,
        marginTop : 10,
        marginLeft:20,
        marginRight: 20,
        padding: 10,
        borderRadius : 15
    },
    tutors_extra : {
        height: height * 0.6
    },
    tutor_card:{
        width:"100%",
        flexDirection:"row",
        backgroundColor :"#fff",
        padding:10,
        marginTop: 15,
        borderRadius :15
    },
    request_card:{
        width:"100%",
        flexDirection:"row",
        backgroundColor :"#fff",
        padding:10,
        marginTop: 15,
        borderRadius :15
    },
    tutor_init:{
        marginRight : 15
    },
    init:{
        textAlign: "center",
        backgroundColor:"#101f36",
        padding : 15,
        color:"#fff",
        borderRadius : 15,
        fontWeight :"bold",
        marginBottom: 5
    },
    archievement:{
        marginRight :5
    },
    card_tag:{
        backgroundColor : "#101f36",
        padding : 7,
        marginRight: 10,
        borderRadius :10,
        marginTop: 7,
        justifyContent :"center",
        alignItems :"center"
    },
    tutor_btm:{
        paddingTop : 15,
        flexDirection : "row"
    },
    price:{
        fontSize : 25
       
    },
    period : {
        marginLeft :5
    },
    tutorHeader:{
        width :"100%",
        padding : 25,
        height  : height *.2,
        justifyContent :"center",
        alignItems : "center"
    },
    tutorInfor:{
        margin : 15,
        backgroundColor : "transparent"
    },
    tutorTag :{
        width: "100%"
    },
    mTop15:{
        marginTop: 15
    },
    mTop20:{
        marginTop: 20
    },
    mBot50:{
        marginBottom: 50
    },
    requestView :{
        padding:10,
        backgroundColor :"#e1ecfe",
        borderRadius :25
    },
    rqtBtn :{
        marginBottom: 25
    },
    bigText:{
        width : "100%",
        borderWidth  : 1,
        textAlignVertical  :"top",
        padding  : 7,
        borderRadius : 7
  },
  accept_btn:{
    backgroundColor  : "green",
    padding : 7,
    borderRadius : 5,

  },
  decline_btn:{
    backgroundColor : "red",
    padding : 7,
    borderRadius :7,
    width:"40 %",
    marginLeft:10
},

  success : {
    backgroundColor : "green"
  },
  danger : {
    backgroundColor  :"red"
  },
  alert:{
    padding : 15,
    borderRadius : 7
},
    chatsHeader:{
        backgroundColor : "#101f36",
        width:  "100%",
        height  : height *0.13,
        alignItems : "baseline",
        justifyContent : "flex-end"
    },
    chatsHeaderText :{
        color: "#Fff",
        fontSize : 20,
        marginLeft : 25
    },
    chat :{
      width : "100%",

    },
    CHATS :{
        width: "100%",
        height :height - (height * 0.13),
        paddingLeft :25,
        paddingTop: 15 
    },
    chat:{
        width : "100%",
        flexDirection : "row",
        height : 50
        
    },
    image: {
        width: width * 0.15,
        height : "100%",
        borderRadius : 100
    },
    image_:{
        borderRadius : 100,
        width : "100%",
        height : "100%"
    },
    chatName:{
        width :"75%",
        height: "100%",
        justifyContent : "center",
        marginLeft : 15,
        borderBottomWidth: 2,
        borderBottomColor :"#ddd"
    },
    name : {
        fontSize : 20,
        fontWeight :"bold"
    },
    lottie:{
        width,
        height 
    },
    dropdown:{
        width : "100%"
    },
    searchInputStyle:{
        backgroundColor : "#fff",
        width  : "100%"
    },
    go_back:{
        backgroundColor : "green",
        width : width *0.3,
        borderRadius : 15,
        paddingVertical : 5,
        paddingHorizontal : 10
    }
})

export default styles