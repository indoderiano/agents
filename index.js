const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const bearertoken=require('express-bearer-token')
const path=require('path')


// DB4FREE
const mysql=require('mysql')
const db=mysql.createConnection({
    host:'db4free.net',
    user:'mde50526shifu',
    password:'leathershoes',
    database:'shifu_database',
    port:'3306'
})


db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('connected to mysql etrainerdb')
})




const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(bearertoken())

// app.get('/',(req,res)=>{
//     return res.send('<h2>Api E-trainer</h2>')
// })

app.get('/agents',(req,res)=>{
    var sql='select * from agents'
    db.query(sql,(err,allagents)=>{
        if(err) return res.status(500).send(err)
        res.status(200).send(allagents)
    })
})

app.put('/agents/:id',(req,res)=>{

    console.log('updating agent')
    // const {update}=req.body
    const {id}=req.params

    // console.log(update)
    console.log(id)

    var sql=`update agents set ? where agents_id=${id}`
    db.query(sql,req.body,(err,updated)=>{
        if(err) return res.status(500).send(err)

        var sql='select * from agents'
        db.query(sql,(err,allagents)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(allagents)
        })
    })
})

app.put('/agents/delete/:id',(req,res)=>{

    console.log('deleting agent')
    const {id}=req.params

    var sql=`delete from agents where agents_id=${id}`
    db.query(sql,(err,updated)=>{
        if(err) return res.status(500).send(err)

        var sql='select * from agents'
        db.query(sql,(err,allagents)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(allagents)
        })
    })
})

app.post('/agents',(req,res)=>{

    console.log('Add agent')
    // const {update}=req.body

    var sql=`insert into agents set ?`
    db.query(sql,req.body,(err,added)=>{
        if(err) return res.status(500).send(err)

        var sql='select * from agents'
        db.query(sql,(err,allagents)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(allagents)
        })
    })
})

// const {AuthRouters,TrainerRouters,ScheduleRouters} = require('./routers')

// app.use('/users',AuthRouters)
// app.use('/trainers',TrainerRouters)
// app.use('/schedules',ScheduleRouters)

app.use(express.static(path.join(__dirname, '/web/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/web/build', 'index.html'));
});


// const PORT=5000
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log('server online in port 5000'))