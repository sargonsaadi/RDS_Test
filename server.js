var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var mysql = require('mysql')
var session = require('express-session');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SESSION
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { maxAge: 600000 }
cookie: {  }

}))

var connection = mysql.createConnection({
    host: 'sargon-dbs.cbmodg8sfvkj.us-east-2.rds.amazonaws.com',
    user: 'sargonUsername',
    password: 'wq4t9hsaadi',
    port: '3306',
    database: 'syriaNamesDB'
})

// connection.connect(function(err) {
//     if (err) {
//         console.log("error is ", err)
//     }else{
//         console.log('You are now connected...')
        
//         connection.query("SELECT * FROM name4;", function(err, result) {
//             if (err) {
//                 console.log("error is ", err)
//             } else{
//                 console.log('results are', result)
//             }
//         })
//     }
// })
app.use(express.static(path.join(__dirname, './static')));

app.get('/', (req,res)=>{
    res.sendFile('index.html')
})
app.get('/about', (req,res)=>{
    res.send('This is ABOUT')
})
app.get('/names', (req,res)=>{
    connection.connect(function(err) {
        var context ={result: ''};
        if (err) {
            console.log("error connecting to DB is ", err)
            
        }else{
            console.log('You are now connected...')
            
            connection.query("SELECT * FROM name4;", function(err, result) {
                if (err) {
                    console.log("error is ", err)
                } else{
                    console.log('results are', result)
                    // context.result = result[0].eng_word;
                }
            })
        }
    })
    res.send('This is Names')
})

app.listen(8000,()=>{
    console.log("listening to port 8000")
});