let express = require("express")
let app = express()
let bordyParser = require("body-parser")
const neo4j = require("neo4j-driver")
let http = require("http")
let socketio = require("socket.io")(http)

let server = http.createServer(app)
socketio.listen(server)

socketio.sockets.on("connection", (socket)=>{
    console.log("New Socket.io connection")  
})

const urlenCoded = bordyParser.urlencoded({extended: true})
app.use(bordyParser.json());

/** CREATE DATABASE CONNECTION*/
let driver = neo4j.driver("bolt://localhost:7687",neo4j.auth.basic("neo4j","programmerslivelonger"))

function getSession(){
    
    let driver_session =driver.session(neo4j.session.READ)

    return driver_session
}

// Listen on port 
const port = process.env.PORT || 4000
server.listen(port, () => console.log('listening at  http://localhost:4000'));
/* 
*GET FUNCTIONS
*/
async function checkUser(username){
    let userConfirmed = false;
    let driver_session = getSession()
    await driver_session.run(`MATCH (n:STUDENT) WHERE n.username = '${username}' return n`)
    .then(results=>{
        if (results.records.length > 0){
            userConfirmed =  true
        }
    })
    driver_session.close()
    return userConfirmed
}
async function checkTutor(username){
    let userConfirmed = false;
    let driver_session = getSession()
    await driver_session.run(`MATCH (n:TUTOR) WHERE n.username = '${username}' return n`)
    .then(results=>{
        if (results.records.length > 0){
            userConfirmed =  true
        }
    })
    .catch(err=>{
        console.log("Error at checking Tutor > " + err)
    })
    driver_session.close()
    return userConfirmed
}

app.get("/get/tutors/", (req, res)=>{
    let tutors = []
    let driver_session =  getSession()
    driver_session
    .run(`MATCH (t:TUTOR) RETURN t ORDER BY id(t) DESC`)
    .then(results =>{
        results.records.forEach(t =>{
           let tutor = {
            key : t._fields[0].identity.low,
            tutor_id :  t._fields[0].identity.low,
            fullname :  t._fields[0].properties.fullname,
            qualifications : t._fields[0].properties.qualifications,
            subjects : t._fields[0].properties.modules,
            location : t._fields[0].properties.location,
            price : t._fields[0].properties.price
           }
           tutors.push(tutor)
        })
        driver_session.close()
        res.json({
            tutorsArr : tutors
        })
    })
})
app.get("/get/tutor/infor/:id", (req, res)=>{
    let driver_session =  getSession()
    driver_session
    .run(`MATCH (t:TUTOR) WHERE ID(t) =${parseInt(req.params.id)} RETURN t`)
    .then(results =>{
        if(results.records.length > 0){
            driver_session.close()
            res.json({
                tutor_info :  results.records[0]
            })
        }    
    })
})

app.get("/get/request/:id",(req, res)=>{
    let students = []
    let tutor;
    let driver_session= getSession()
    driver_session.run(`
    MATCH (n:REQUEST)-[r:REQUEST]->(t:TUTOR) WHERE ID(t) = ${req.params.id}
    RETURN n, t as TUTOR`)
    .then(results=>{
        try{
            tutor = {
                id  : results.records[0]._fields[1].properties.username,
                name : results.records[0]._fields[1].properties.fullname,
            }
            results.records.forEach(record=>{
                let rec = {
                    request_id  : record._fields[0].identity.low,
                    username : record._fields[0].properties.username,
                    fullname  : record._fields[0].properties.name,
                    studentID  : record._fields[0].properties.studentID.low,
                    subs  : record._fields[0].properties.subs,
                    date : record._fields[0].properties.created,
                    accepted :  record._fields[0].properties.accepted,
                    rejected  : record._fields[0].properties.rejected
                }
                students.push(rec)
            })
            if (students.length > 0){
                driver_session.close()
                res.json({
                    requests : students,
                    tutor
                })
            }
        }
        catch{
            res.json({
                requests : null,
                tutor  : null
            })
        }
        
    })
    .catch(err=>{
        console.log("Error at get requests .>" +  err)
    })
})
/* 
    POST FUNCTIONS 
*/
app.post("/signin/for/:mode", urlenCoded, (req, res)=>{
    let query = `MATCH (n:${req.params.mode}) 
    WHERE n.username = "${req.body.username}"
    and n.password = "${req.body.password}"
    RETURN n `
    let driver_session =  getSession()
    driver_session.run(query)
    .then(results=>{
        try{
            if (results.records[0].length > 0){
                driver_session.close()
                res.json({
                    nodeID : results.records[0]._fields[0].identity.low,
                    credentials_match:true,
                    stream_acc : {
                        id : results.records[0]._fields[0].properties.username,
                        name : results.records[0]._fields[0].properties.fullname
                    }
                })
            }
        }
        catch{
            res.json({
                credentials_match:false
            })
        }
        
        

            
    }).catch(err=>{
        console.log(err)
    })
})
app.post("/create/student/node/", urlenCoded, (req, res)=>{
    checkUser(req.body.username)
    .then((confirmation=>{
        if(!confirmation){
            let driver_session =  getSession()
            driver_session
            .run(`CREATE (s:STUDENT {
                    fullname  :"${req.body.fullname}",
                    username : "${req.body.username}",
                    email  : "${req.body.email}",
                    password : "${req.body.password}"
            }) RETURN ID(s) as ID`)
            .then(results=>{
                if(results.records[0].length > 0){
                    driver_session.close()
                    res.json({
                        nodeID :results.records[0]._fields[0].low,
                        insert_success : true,
                        con :false,
                    })
                } 
            })
            .catch(err=>{
                console.log(err)
                res.json({
                    con  : false,     
                    insert_success : false
                })
            })
        }
        else if(confirmation){
            res.json({
                con : true
            })
        }
    }))
})

app.post("/create/tutor/node/", urlenCoded, (req, res)=>{
    checkTutor(req.body.username)
    .then(confirmation =>{
        if(!confirmation){
            console.log("Inserting User")
            let driver_session =  getSession()
            driver_session
            .run(`CREATE (t:TUTOR {
                    fullname  :"${req.body.fullname}",
                    username : "${req.body.username}",
                    email  : "${req.body.email}",
                    password : "${req.body.password}",
                    description : "${req.body.bio}",
                    location  : "${req.body.loc}",
                    modules : $subjects,
                    price : $price,
                    qualifications  : $quali
             }) RETURN ID(t) as ID`,{
                subjects  : req.body.subs,
                price  : req.body.prices,
                quali  :req.body.qualifications
             })
            .then(results=>{
                if(results.records[0].length > 0){
                    driver_session.close()
                    console.log("User Inserted")
                    res.json({
                        nodeID :results.records[0]._fields[0].low,
                        insert_success : true,
                        con  : false
                    })
                } 
            })
            .catch(err=>{
                console.log(err)
                res.json({
                    insert_success : false,
                    con : false
                })
            })
        }
        else{
            res.json({
                con  : true
            })
        }
    })
   

})

app.post("/request/tutor/", urlenCoded, (req, res)=>{
    let driver_session =  getSession()
    let query = `
    MATCH (s:STUDENT) WHERE ID(s) = ${req.body.studentID}
    CREATE(r:REQUEST {
        studentID  : ID(s),
        username : s.username,
        name: s.fullname,
        subs  : $subjects,
        created  : datetime(),
        accepted  : FALSE,
        rejected  : FALSE,
        chats : [] 
    })
    WITH r
    MATCH (t:TUTOR) WHERE ID(t) = ${req.body.tutorID}
    MERGE (r)-[m:REQUEST]->(t)
    RETURN m
    `
    driver_session.run(query, {
        subjects : req.body.subs
    })
    .then(results=>{
        if(results.records[0].length > 0){
            driver_session.close()
            res.json({
                request_status : true
            })
        } 
    })
    .catch(err=>{
        console.log(err)
    })
})
app.post("/create/accepted_Rel/", urlenCoded, (req, res)=>{
    let driver_session = getSession()
    driver_session
    .run(`
    MATCH (t:REQUEST) WHERE ID(t) = ${req.body.request_id}
    set t.accepted = TRUE
    RETURN t
    `)
    .then(results =>{
        if (results.records[0].length > 0){
            driver_session.close
            res.json({
                accepted_ :true
            })
        }
    })
    .catch(err=>{
        driver_session.close();
        console.log("Error at accepting request .> " + err)
    })
})
app.post("/find/tutor/", urlenCoded, (req, res)=>{

    let tutors = []
    driver_session = getSession()
    let query = `MATCH (n:TUTOR) WHERE (n.modules) IS NOT NULL 
        RETURN  n as student, n.modules AS modules  `
    driver_session.run(query)
    .then(results=>{
        results.records.forEach(record=>{
            if(record._fields[1].includes(req.body.sub)){
                let tutor = {
                    key : record._fields[0].identity.low,
                    tutor_id :  record._fields[0].identity.low,
                    fullname :  record._fields[0].properties.fullname,
                    qualifications : record._fields[0].properties.qualifications,
                    subjects : record._fields[0].properties.modules,
                    location : record._fields[0].properties.location,
                    price : record._fields[0].properties.price
                }
                tutors.push(tutor)
            }
        })
        driver_session.close()
        res.json({
            tutorsArr : tutors
        })
    
    })
    .catch(err=>{
        console.log(err)
    })
   


})

function et(){
   
}et()