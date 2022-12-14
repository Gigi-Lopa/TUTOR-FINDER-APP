let IPADDRESS = "192.168.43.228"
let URLS ={
    IPADDRESS,
    CREATE_STUDENT_NODE :`http://${IPADDRESS}:4000/create/student/node/`,
    GET_TUTORS  : `http://${IPADDRESS}:4000/get/tutors/`,
    GET_TUTOR_INFOR : `http://${IPADDRESS}:4000/get/tutor/infor/`,
    CREATE_TUTOR_NODE : `http://${IPADDRESS}:4000/create/tutor/node/`,
    SIGN_IN_URL : `http://${IPADDRESS}:4000/signin/for/`,
    POST_SUBS : `http://${IPADDRESS}:4000/request/tutor/`,
    GET_REQUEST  : `http://${IPADDRESS}:4000/get/request/`,
    ACCEPT_REQUEST  : `http://${IPADDRESS}:4000/create/accepted_Rel/`,
    DELETE_REQUEST_NODE  : `http://${IPADDRESS}:4000/delete/request/node/`,
    FIND_TUTOR : `http://${IPADDRESS}:4000/find/tutor/`,
    
}
export default URLS