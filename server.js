const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var app = express()

var corOptions = {
    origin:'http://localhost:3000'
}
app.use(cors(corOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const db = require('./models')
db.sequelize.sync()

require('./routes/tasks.routes')(app);
require('./routes/users.routes')(app);

app.get('/',(req,res)=>{

    res.send('Welcome to Task Pro Server 1.0')

})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`Server Started at PORT ${PORT}`)
})

